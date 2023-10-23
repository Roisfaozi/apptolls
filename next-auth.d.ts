import 'next-auth'

declare module 'next-auth' {
  interface User {
    name: string
  }

  interface Session {
    user: {
      id: string
      role: string
    }
  }
}
