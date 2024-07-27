'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser, Package2 } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'

export function Navbar() {
    const { data: session } = useSession()
    return (
        <header className="sticky backdrop-blur top-0 flex h-16 items-center gap-4 border-b bg-background/80 px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href={session?.user ? '/dashboard' : '/'}
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                </Link>
                {session?.user ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/events"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Events
                        </Link>
                        <Link
                            href="/vouchers"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Vouchers
                        </Link>
                    </>
                ) : (
                    <></>
                )}
            </nav>
            <div className="flex flex-1 w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                {session?.user ? (
                    <DropdownMenu className="ml-auto flex-1 sm:flex-initial">
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Brand</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    signOut({ callbackUrl: '/auth' })
                                }
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild>
                        <Link href="/auth">Log in</Link>
                    </Button>
                )}
                <ThemeToggle />
            </div>
        </header>
    )
}
