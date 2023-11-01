import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { CredentialsModel } from '@/models/credentialsModels'
import { NextResponse } from 'next/server'

export interface NewCredentialRequest {
  username: string
  password_cred: string
  user_id: string
}

export interface NewCredentialResponse {
  id: string
  username: string
  password_cred: string
  user_id: string
}

export type NewResponse = NextResponse<{
  page?: NewCredentialResponse
  error?: string
  message?: string
}>

export const POST = async (req: Request): Promise<Response> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    const credentialData = (await req.json()) as NewCredentialRequest
    await startDb()
    const id = session?.user?.id
    const oldCredential = await CredentialsModel.findOne({
      username: credentialData.username,
    })
    if (oldCredential) {
      return NextResponse.json(
        { error: 'credential is already added!' },
        { status: 422 }
      )
    }

    const newCredentialData: NewCredentialRequest = {
      username: credentialData.username,
      password_cred: credentialData.password_cred,
      user_id: id,
    }

    const newCredential = await CredentialsModel.create({
      ...newCredentialData,
    })
    return NextResponse.json({
      newCredential,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new credential' },
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

    const credentials = await CredentialsModel.find().populate({
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
