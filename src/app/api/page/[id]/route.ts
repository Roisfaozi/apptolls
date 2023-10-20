import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { PageModel } from '@/models/pageModels'
import { NextResponse } from 'next/server'

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
