import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ContentModel } from '@/models/contentModels'
import formatDate from '@/utils/formatTime'
import { NextResponse } from 'next/server'

export interface NewContentRequest {
  title: string
  description: string
  isScheduled: boolean
  publishTime: string
  publishDate: string
  page_id: string
  user_id: string
}
export interface NewContentResponse {
  id: string
  title: string
  description: string
  isScheduled: boolean
  publishTime: string
  publishDate: string
  page_id: string
  user_id: string
}

export type NewResponse = NextResponse<{
  page?: NewContentResponse
  error?: string
  message?: string
}>

export const POST = async (req: Request): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    const contentData = (await req.json()) as NewContentRequest
    await startDb()
    const id = session?.user?.id
    const oldContent = await ContentModel.findOne({ name: contentData.title })
    if (oldContent) {
      return NextResponse.json(
        { error: 'product is already added!' },
        { status: 422 }
      )
    }
    let schedule: boolean
    if (!contentData.publishDate && !contentData.publishTime) {
      schedule = false
    } else {
      schedule = true
    }
    let currentTime = new Date()

    let publishTimeData = contentData.publishTime
    let publishDateData = contentData.publishDate

    if (!contentData.publishTime) {
      const formatTime = formatDate(currentTime.toString())
      console.log(formatTime)
      publishTimeData = formatTime
    }
    if (!contentData.publishDate) {
      publishDateData = currentTime.toLocaleDateString()
    }
    const newContentData: NewContentRequest = {
      title: contentData.title,
      description: contentData.description,
      isScheduled: schedule,
      publishDate: publishDateData,
      publishTime: publishTimeData,
      page_id: contentData.page_id,
      user_id: id,
    }

    const newContent = await ContentModel.create({ ...newContentData })
    console.log(newContent)
    return NextResponse.json({
      newContent,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new content' },
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
    const page = await ContentModel.find()
      .populate({
        path: 'user_id',
        select: 'id name',
      })
      .populate({ path: 'page_id', select: 'id page_id' })
    console.log(page)
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
