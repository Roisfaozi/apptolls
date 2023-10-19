import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ProductModel } from '@/models/productModels'
import { NextResponse } from 'next/server'
import { NewResponse } from '../route'

export const GET = async (context: {
  params: { id: string }
}): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    await startDb()

    const id = context.params.id
    const product = await ProductModel.findById(id)

    console.log(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

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
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
