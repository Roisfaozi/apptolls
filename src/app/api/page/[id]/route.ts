import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ContentModel } from '@/models/contentModels'
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
      return NextResponse.json({ error: 'page not found' }, { status: 404 })
    }

    page.page_id = pageData.page_id
    return NextResponse.json({
      page: {
        id: page._id.toString(),
        name: page.name,
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
    const page = await PageModel.findById(id)
    if (!page) {
      return NextResponse.json({ error: 'page not found' }, { status: 404 })
    }
    const content_ids = page.content_id
    content_ids?.forEach(async (content_id) => {
      await ContentModel.deleteOne({ content_id })
    })
    await page.deleteOne()

    return NextResponse.json({ message: 'Page deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete the page' },
      { status: 500 }
    )
  }
}
