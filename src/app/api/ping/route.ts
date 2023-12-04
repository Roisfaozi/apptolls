import { NextResponse } from 'next/server'

export const GET = async (req: Request): Promise<Response> => {
  return NextResponse.json({
    message: 'Server aktif',
  })
}
