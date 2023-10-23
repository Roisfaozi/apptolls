import NextAuth from 'next-auth/next'

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Here, you would check the credentials in your database
        // Replace this with your logic for user sign-in
        const user = {
          id: 1,
          name: credentials.username,
          email: credentials.username, // You can use the provided email as well
        }
        return Promise.resolve(user)
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    jwt: true,
  },
})
