import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                try {
                    const data = {
                        username: credentials.username,
                        password: credentials.password,
                    }

                    const res = await fetch(
                        `${process.env.IDENTITY_API_URL}/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                    )

                    if (res.ok) {
                        const user = await res.json()
                        console.log(user)
                        return { ...user, id: 1 }
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
            session.user.username = token.userName
            session.user.token = token.token
            return session
        },
    },
})

export { handler as GET, handler as POST }
