import UserModel from '@/models/userModel'
import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import startDb from './db'

// Merging the DefaultSession interface with additional propertiesimport NextAuth, { DefaultSession } from "next-auth"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        await startDb()

        const user = await UserModel.findOne({ email })
        if (!user) throw Error('email/password mismatch!')
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw Error('email/password mismatch!')

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        }
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role
        params.token.id = params.user.id
      }
      return params.token
    },
    session({ session, token }) {
      if (session.user) {
        ;(session.user as { id: string }).id = token.id as string
        ;(session.user as { role: string }).role = token.role as string
      }
      return session
    },
  },
}

export const getAuthSession = async () => {
  return getServerSession(authOptions)
}
