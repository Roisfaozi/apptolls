import startDb from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth-options'
import { LicenseModel } from '@/models/licenseModels'
import { ProductModel } from '@/models/productModels'
import generateLicenseKey from '@/utils/generateLicense'
import { NextResponse } from 'next/server'

export interface NewLicenseRequest {
  licenseKey: string
  product_id: string
  purchasedAt: Date
  lastChecked: Date
  user_id: string
}

export interface NewLicenseResponse {
  id: string
  licenseKey: string
  product_id: string
  purchasedAt: Date
  lastChecked: Date
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
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    const newLicenseData: NewLicenseRequest = {
      licenseKey: licenseCode,
      product_id: product._id,
      purchasedAt: new Date(),
      lastChecked: new Date(),
      user_id: id,
    }

    const newLicense = await LicenseModel.create({ ...newLicenseData })
    product.license_id.push(newLicense._id)
    await product.save()

    return NextResponse.json({
      message: 'Kode lisensi berhasil dibuat. Anda sudah bisa memakai aplikasi',
      license: {
        id: newLicense._id,
        licenseKey: newLicense.licenseKey,
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
