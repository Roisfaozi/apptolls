import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ProductModel } from '@/models/productModels'
import { NextResponse } from 'next/server'

interface NewProductRequest {
  name: string
  description: string
  price: number
}
interface NewProductResponse {
  id: string
  name: string
  description: string
  price: number
}

type NewResponse = NextResponse<{
  product?: NewProductResponse
  error?: string
}>

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    const productData = (await req.json()) as NewProductRequest
    await startDb()
    console.log(productData)
    const oldProduct = await ProductModel.findOne({ name: productData.name })
    if (oldProduct) {
      return NextResponse.json(
        { error: 'product is already added!' },
        { status: 422 }
      )
    }

    const newProduct = await ProductModel.create({ ...productData })

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
      return new NextResponse('unauthorised', { status: 401 })
    }
    await startDb()
    const products = await ProductModel.find()

    return NextResponse.json({
      products: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
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
