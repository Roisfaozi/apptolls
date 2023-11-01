import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { CredentialsModel } from '@/models/credentialsModels'
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

    const credentials = await CredentialsModel.findOne({ _id: id }).populate({
      path: 'user_id',
      select: 'id name',
    })

    return NextResponse.json({
      credentials,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new credential' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
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

    const credentials = await CredentialsModel.findById(id)
    await credentials?.deleteOne()
    return NextResponse.json({ message: 'credentials deleted successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new credential' },
      { status: 500 }
    )
  }
}
