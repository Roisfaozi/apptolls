import 'next-auth'

declare module 'next-auth' {
  interface User {
    name: string
  }

  interface Session {
    user: {
      email: string
      id: string
      role: string
    }
  }
}
