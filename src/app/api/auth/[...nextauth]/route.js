import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.API_URL}/Brands/1`)

                    if (res.ok) {
                        const user = await res.json()
                        return user
                    }

                    return null
                } catch (error) {
                    console.log(error)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user.id = token.id
            return session
        },
    },
})

export { handler as GET, handler as POST }
