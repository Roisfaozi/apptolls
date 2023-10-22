import startDb from '@/lib/db'
import sendMail, { bodyEmail } from '@/lib/emailService'
import { getAuthSession } from '@/lib/nextauth-options'
import { LicenseModel } from '@/models/licenseModels'
import { ProductModel } from '@/models/productModels'
import generateLicenseKey from '@/utils/generateLicense'
import { NextResponse } from 'next/server'

export interface NewLicenseRequest {
  license_key: string
  product_id: string
  purchasedAt: string
  lastChecked: string
  user_id: string
}

export interface NewLicenseResponse {
  id: string
  license_key: string
  product_id: string
  purchasedAt: string
  lastChecked: string
  user_id: string
}

export type NewResponse = NextResponse<{
  license?: NewLicenseResponse
  error?: string
  message?: string
}>

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('unauthorised', { status: 401 })
    }
    await startDb()

    const licenseData = (await req.json()) as NewLicenseRequest
    const licenseCode = await generateLicenseKey(32, 8)

    const id = session?.user?.id
    const product = await ProductModel.findById(licenseData.product_id)

    if (!product) {
      return NextResponse.json({ error: 'content not found' }, { status: 404 })
    }
    const newLicenseData: NewLicenseRequest = {
      license_key: licenseCode,
      product_id: product._id.toString(),
      purchasedAt: new Date().toLocaleString(),
      lastChecked: new Date().toLocaleString(),
      user_id: id,
    }

    const newLicense = await LicenseModel.create({ ...newLicenseData })
    product.license_id.push(newLicense._id.tu)

    const textBody = await bodyEmail(product.name, newLicense.license_key)
    const mailSubject = `Your ${product.name} License Key is Here`
    const userEmail = session?.user?.email
    await sendMail(mailSubject, userEmail, textBody)
    await product.save()

    return NextResponse.json({
      message: 'License succesfully created. Now you can start our app',
      license: {
        id: newLicense._id,
        license_key: newLicense.license_key,
        product_id: newLicense.product_id.toString(),
        purchasedAt: newLicense.purchasedAt,
        lastChecked: newLicense.lastChecked,
        user_id: newLicense.user_id.toString(),
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Failed to create new license' },
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
    const license = await LicenseModel.find()
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
