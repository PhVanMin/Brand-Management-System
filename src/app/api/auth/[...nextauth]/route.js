import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                try {
                    if (credentials.signin === 'true') {
                        const res = await fetch(
                            `${process.env.API_URL}/Brands/ByName/${credentials.username}`
                        )

                        if (res.ok) {
                            const brand = await res.json()
                            console.log(brand)
                            return {
                                username: credentials.username,
                                id: brand.id,
                            }
                        }

                        return null
                    } else {
                        const data = {
                            name: credentials.username,
                            field: credentials.field,
                            address: credentials.address,
                            gps: credentials.gps,
                        }

                        const res = await fetch(
                            `${process.env.API_URL}/Brands`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            }
                        )

                        if (res.ok) {
                            const id = await res.text()
                            console.log(id)
                            return {
                                username: credentials.username,
                                id: id,
                            }
                        }
                    }
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
            session.user.username = token.username
            session.user.token = token.token
            return session
        },
    },
})

export { handler as GET, handler as POST }
