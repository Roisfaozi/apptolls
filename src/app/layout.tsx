import AuthProvider from '@/components/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../css/style.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <AuthProvider>

          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
