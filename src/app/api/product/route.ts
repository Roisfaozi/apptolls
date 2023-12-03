import { cloudinaryUpload } from '@/lib/cloudinary'
import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ImageModel } from '@/models/imageModels'
import { LicenseModel } from '@/models/licenseModels'
import { ProductModel } from '@/models/productModels'
import { NextResponse } from 'next/server'
export interface NewProductRequest {
  name: string
  description: string
  price: number
  image_id: string
}
export interface NewProductResponse {
  id: string
  name: string
  description: string
  price: number
  purchasedCount?: number
  license_id?: string[]
  image_id?: string[]
}

export type NewResponse = NextResponse<{
  product?: NewProductResponse
  error?: string
  message?: string
}>

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new NextResponse('unauthorized', { status: 401 })
    }
    const productData = await req.formData()

    await startDb()

    const file = productData.get('imageUrl')
    const name = productData.get('name')
    const description = productData.get('description')
    const price = productData.get('price')

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No valid file received.' },
        { status: 400 }
      )
    }

    const oldProduct = await ProductModel.findOne({ name: name })
    if (oldProduct) {
      return NextResponse.json(
        { error: 'product is already added!' },
        { status: 422 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const photoUrl: any = await cloudinaryUpload(buffer)

    const imageSave = await ImageModel.create({
      imageUrl: photoUrl.result.secure_url,
    })

    const newProduct = await ProductModel.create({
      name: name,
      description: description,
      price: price,
    })

    newProduct.image_id.push(imageSave._id)
    await newProduct.save()
    return NextResponse.json({
      product: {
        id: newProduct._id.toString(),
        description: newProduct.description,
        price: newProduct.price,
        name: newProduct.name,
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new product' },
      { status: 500 }
    )
  }
}

export const GET = async (): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorized', { status: 401 })
    }
    await startDb()
    const products = await ProductModel.find()
      .populate({
        path: 'license_id',
        select: 'id license_id',
      })
      .populate({
        path: 'image_id',
        select: 'id image_id',
      })
    const license = await LicenseModel.find()
    const image = await ImageModel.find()
    return NextResponse.json({
      products: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        license_id: license,
        image_id: image,
      })),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
