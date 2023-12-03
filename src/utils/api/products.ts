import { cookies } from 'next/headers'

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? ''
}

const getProduct = async () => {
  const cookie = await getCookie('next-auth.session-token')
  const response = await fetch(`${process.env.NEXTAUTH_URL}api/product`, {
    cache: 'force-cache',
    headers: {
      Cookie: `__Secure-next-auth.session-token=${cookie}`,
    },
  })
  if (response.status === 200) {
    const data = await response.json()

    return data
  } else {
    console.log('failed to fetch data', response)
    return response
  }
}

export { getProduct }
