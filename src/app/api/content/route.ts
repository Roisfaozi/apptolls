import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { ContentModel } from '@/models/contentModels'
import { PageModel } from '@/models/pageModels'
import formatDate from '@/utils/formatTime'
import { NextResponse } from 'next/server'

export interface NewContentRequest {
  title: string
  description: string
  isScheduled: boolean
  publishTime: string
  publishDate: string
  page_id: string | undefined
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
  content?: NewContentResponse
  error?: string
  message?: string
}>

export const POST = async (req: Request): Promise<Response> => {
  try {
    const contentData = (await req.json()) as NewContentRequest
    await startDb()
    const oldContent = await ContentModel.findOne({ title: contentData.title })
    if (oldContent) {
      return NextResponse.json(
        { error: 'content is already added!' },
        { status: 422 }
      )
    }

    const page = await PageModel.findOne({
      page_id: contentData.page_id,
    })

    const pageData = {
      page_id: contentData.page_id,
      user_id: contentData.user_id,
    }
    if (!page) {
      await PageModel.create({ ...pageData })
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
      page_id: page?._id?.toString(),
      user_id: contentData.user_id.toString(),
    }
    const newContent = await ContentModel.create({ ...newContentData })
    page?.content_id?.push(newContent._id)
    page?.save()
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
    const content = await ContentModel.find().populate({
      path: 'user_id',
      select: 'id name',
    })

    return NextResponse.json({
      content,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to find new contents' },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: Request): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    await startDb()

    const content = await ContentModel.deleteMany()
    const pages = await PageModel.find()

    for (const page of pages) {
      page.content_id = []
      await page.save()
    }

    return NextResponse.json({ message: 'All contents deleted successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to find new contents' },
      { status: 500 }
    )
  }
}
