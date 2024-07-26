import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
    const token = await getToken({ req, secret })
    if (!token && req.nextUrl.pathname === '/') return NextResponse.next()

    if (!token && !req.nextUrl.pathname.startsWith('/auth'))
        return NextResponse.redirect(new URL('/auth', req.url))

    if (token && req.nextUrl.pathname.startsWith('/auth'))
        return NextResponse.redirect(new URL('/dashboard', req.url))

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
