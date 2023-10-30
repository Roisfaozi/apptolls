import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

      {children}
    </div >

  )
}