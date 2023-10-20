import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { PageModel } from '@/models/pageModels'
import { NextResponse } from 'next/server'
import { NewPageRequest, NewResponse } from '../route'

export const GET = async (
  req: Request,
  context: { params: { id: string } }
): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    await startDb()
    const id = context.params.id
    const page = await PageModel.findById(id)
      .populate({
        path: 'user_id',
        select: 'id name',
      })
      .populate({
        path: 'content_id',
        select: 'id title',
      })

    return NextResponse.json({
      page,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to find new pages' },
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
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    const pageData = (await req.json()) as NewPageRequest
    await startDb()
    const id = context.params.id
    const page = await PageModel.findById(id)

    if (!page) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    page.page_id = pageData.page_id
    return NextResponse.json({
      page: {
        id: page._id.toString(),
        page_id: page.page_id,
        user_id: page.user_id.toString(),
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new page' },
      { status: 500 }
    )
  }
}
