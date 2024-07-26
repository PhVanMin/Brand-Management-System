import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                let user = {
                    reqToken: 'mytoken',
                }

                if (credentials.signin) {
                    // TODO: handle sign in
                } else {
                    // TODO: handle sign up
                }

                return user ? user : null
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.reqToken = user.reqToken
            return token
        },
        async session({ session, token }) {
            if (token) session.user.reqToken = token.reqToken
            return session
        },
    },
})

export { handler as GET, handler as POST }
