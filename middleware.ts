import { NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:3000',
  'https://reelsmaster.vercel.app',
]

export function middleware(req: { headers: { get: (arg0: string) => void } }) {
  const res = NextResponse.next()

  req.headers.get('origin')

  if (allowedOrigins.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin)
  }

  res.headers.append('Access-Control-Allow-Credentials', 'true')
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT'
  )
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

export const config = {
  matcher: '/api/:path*',
}
