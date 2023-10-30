'use client'

import { useEffect } from 'react'

import Footer from '@/components/UI/Footer'
import Header from '@/components/UI/Header'
import AOS from 'aos'
import 'aos/dist/aos.css'



export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      < Header />
      <main className="grow">

        {children}

      </main>

      <Footer />
    </>
  )
}