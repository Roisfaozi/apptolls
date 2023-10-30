import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <main>
      {children}
    </main>
  )
}