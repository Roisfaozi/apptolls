import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (session) redirect('/profile')
  return (
    <div>

      {children}

    </div>
  )
}