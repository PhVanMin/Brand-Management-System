import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import SessionProvider from '@/components/session-provider'
import { getServerSession } from 'next-auth'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata = {
    title: 'VOU Management System',
    description: 'Event Management System for Brands',
}

export default async function RootLayout({ children }) {
    const session = await getServerSession()
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SessionProvider session={session}>
                        <Navbar />
                        {children}
                        <Toaster />
                    </SessionProvider>
                </ThemeProvider>{' '}
            </body>
        </html>
    )
}
