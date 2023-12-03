import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ImageModel } from '@/models/imageModels'
import { LicenseModel } from '@/models/licenseModels'
import { ProductModel } from '@/models/productModels'
import { NextResponse } from 'next/server'
import { NewProductRequest, NewResponse } from '../route'

export const GET = async (
  req: Request,
  context: { params: { id: string } }
): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await startDb()

    const id = context.params.id
    const product = await ProductModel.findById(id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      product: {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        license_id: product.license_id.map((license) => license.toString()),
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

export const PUT = async (
  req: Request,
  context: {
    params: { id: string }
  }
): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    await startDb()

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const id = context.params.id
    const productData = (await req.json()) as NewProductRequest
    const product = await ProductModel.findById(id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    product.name = productData.name
    product.description = productData.description
    product.price = productData.price

    await product.save()

    return NextResponse.json({
      product: {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update the product' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
  req: Request,
  context: {
    params: { id: string }
  }
): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    await startDb()
    const id = context.params.id
    const product = await ProductModel.findById(id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const license = product.license_id
    license?.forEach(async (license_id) => {
      await LicenseModel.deleteOne({ license_id })
    })
    const image = product.image_id
    image?.forEach(async (image_id) => {
      await ImageModel.deleteOne({ image_id })
    })

    await product.deleteOne()

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete the product' },
      { status: 500 }
    )
  }
}
