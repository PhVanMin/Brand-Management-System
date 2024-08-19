'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { ListFilter, MoreHorizontal, Search } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import EventSheet from './createSheet'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Overview({ className }) {
    const [events, setEvents] = useState([])
    const initEvents = useRef(null)
    const { data: session } = useSession()
    console.log(session)

    const GetEvents = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Brands/${session.user.id}/Events`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.token}`,
                },
            }
        )

        if (res.ok) {
            const events = await res.json()
            initEvents.current = events
            setEvents(events)
        }
    }

    useEffect(() => {
        if (session.user.id) GetEvents()
    }, [session])

    return (
        <div className={cn('grid auto-rows-max items-start gap-4', className)}>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <CardTitle>Your Events</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Introducing Our Dynamic Event Management Page for
                            Seamless Management and Insightful Analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <EventSheet loadEvents={GetEvents} />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>This Week</CardDescription>
                        <CardTitle className="text-4xl">$1,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +25% from last week
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>This Month</CardDescription>
                        <CardTitle className="text-4xl">$5,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +10% from last month
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={12} aria-label="12% increase" />
                    </CardFooter>
                </Card>
            </div>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Events</CardTitle>
                    <CardDescription>
                        Recent events from your brand.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex justify-between gap-2">
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                onChange={(e) =>
                                    setEvents(
                                        initEvents.current.filter((event) =>
                                            event.name.includes(e.target.value)
                                        )
                                    )
                                }
                                type="search"
                                placeholder="Search..."
                                className="w-[250px] h-8 rounded-md bg-background pl-8"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Fulfilled
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Declined
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Refunded
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <ScrollArea className="h-[768px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Game</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Voucher Number
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Start Date
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        End Date
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>
                                            <Image
                                                alt="Event"
                                                className="rounded-md object-cover"
                                                width="100"
                                                height="50"
                                                src="/voucher-1.jpg"
                                            />
                                        </TableCell>
                                        <TableCell>{event.gameId}</TableCell>
                                        <TableCell>{event.noVoucher}</TableCell>
                                        <TableCell>
                                            {format(
                                                event.startDate,
                                                'dd/MM/yyyy HH:mm:ss'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                event.endDate,
                                                'dd/MM/yyyy HH:mm:ss'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <Link
                                                        href={`/events/${event.id}`}
                                                    >
                                                        <DropdownMenuItem>
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
