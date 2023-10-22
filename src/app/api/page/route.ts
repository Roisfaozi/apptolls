import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { PageModel } from '@/models/pageModels'
import { NextResponse } from 'next/server'

export interface NewPageRequest {
  page_id: string
  content_id?: string[]
  user_id: string
}
export interface NewPageResponse {
  id: string
  page_id: string
  content_id?: string[]
  user_id?: string
}

export type NewResponse = NextResponse<{
  page?: NewPageResponse
  error?: string
  message?: string
}>
// create Page user
export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    const pageData = (await req.json()) as NewPageRequest
    await startDb()
    const id = session?.user?.id
    const oldPage = await PageModel.findOne({ name: pageData.page_id })
    if (oldPage) {
      return NextResponse.json(
        { error: 'page is already added!' },
        { status: 422 }
      )
    }
    const newPageData: NewPageRequest = {
      page_id: pageData.page_id,
      user_id: id,
    }

    const newPage = await PageModel.create({ ...newPageData })
    return NextResponse.json({
      page: {
        id: newPage._id.toString(),
        page_id: newPage.page_id,
        user_id: newPage.user_id.toString(),
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

export const GET = async (req: Request): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    await startDb()
    const page = await PageModel.find()
      .populate({
        path: 'user_id',
        select: 'id name',
      })
      .populate({ path: 'content_id', select: 'id title' })
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
