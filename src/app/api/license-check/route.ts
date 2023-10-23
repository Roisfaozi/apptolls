import startDb from '@/lib/db'
import { LicenseModel } from '@/models/licenseModels'
import { NextResponse } from 'next/server'

export const PUT = async (req: Request): Promise<Response> => {
  try {
    const { license_key } = await req.json()
    await startDb()
    const license = await LicenseModel.findOne({ license_key }).populate({
      path: 'user_id',
      select: 'id name',
    })
    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 })
    }

    license.lastChecked = new Date().toLocaleString()
    await license.save()

    return NextResponse.json({
      license,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to check new license' },
      { status: 500 }
    )
  }
}
