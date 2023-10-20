import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { LicenseModel } from '@/models/licenseModels'
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
    const license = await LicenseModel.findOne({ _id: id })
      .populate({ path: 'user_id', select: 'id name' })
      .populate({ path: 'product_id', select: 'id name' })
    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 })
    }

    return NextResponse.json({
      license,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new license' },
      { status: 500 }
    )
  }
}

export const POST = async (
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
    const license = await LicenseModel.findById(id)

    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 })
    }
    license.lastChecked = new Date()
    return NextResponse.json({
      license,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new license' },
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
    const license = await LicenseModel.findById(id)

    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 })
    }
    await license.deleteOne()
    return NextResponse.json({
      message: 'License already deleted',
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new license' },
      { status: 500 }
    )
  }
}
