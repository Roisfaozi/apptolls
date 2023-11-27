import { getAuthSession } from '@/lib/nextauth-options'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export const POST = async (req: Request): Promise<Response> => {
  const formData = await req.formData()
  const session = await getAuthSession()

  if (!session?.user) {
    return new NextResponse('unauthorised', { status: 401 })
  }
  const file = formData.get('imageUrl')
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: 'No valid file received.' },
      { status: 400 }
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(' ', '_')
  console.log(file)
  try {
    await writeFile(
      path.join(process.cwd(), 'public/uploads/' + filename),
      buffer
    )
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.log('Error occurred ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
