import PanelLayout from '@/components/dasboard/layouts/DashboardLayout'
import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/signin')
  return <PanelLayout>{children}</PanelLayout>
}

export default DashboardLayout