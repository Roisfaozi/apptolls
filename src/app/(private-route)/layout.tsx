import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log(session?.user)
  if (!session?.user) redirect('/signin')
  return <>{children}</>
}

export default PrivateLayout