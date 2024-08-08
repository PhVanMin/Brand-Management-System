'use client'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { MoreHorizontal, Search } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import CreateSheet from './createSheet'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function VoucherList({ className }) {
    const { data: session } = useSession()
    const [vouchers, setVouchers] = useState([])
    useEffect(() => {
        async function GetVouchers() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Brands/${session.user.id}/Vouchers`
            )

            if (res.ok) {
                const vouchers = await res.json()
                setVouchers(vouchers)
            }
        }

        if (session.user.id) GetVouchers()
    }, [session])

    return (
        <div className={className}>
            <Card x-chunk="event-01-chunk-0">
                <CardHeader className="px-7">
                    <CardTitle>Vouchers</CardTitle>
                    <CardDescription>Vouchers for your events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex justify-between gap-2">
                        <CreateSheet
                            id={session.user.id}
                            className="h-8"
                            title="Add Voucher"
                            icon
                        />
                        <div className="relative ml-auto h-8 flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-[250px] h-8 rounded-md bg-background pl-8"
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Expire Date</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vouchers.map((voucher, index) => (
                                <TableRow key={index} className="bg-accent">
                                    <TableCell>{voucher.id}</TableCell>
                                    <TableCell>
                                        <Image
                                            alt="Voucher"
                                            className="rounded-md object-cover"
                                            width="100"
                                            height="50"
                                            src="/voucher-1.jpg"
                                        />
                                    </TableCell>
                                    <TableCell>${voucher.value}</TableCell>
                                    <TableCell>
                                        <div className="w-44 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                            {voucher.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>{voucher.expireDate}</TableCell>
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
                                                <DropdownMenuItem>
                                                    Edit
                                                </DropdownMenuItem>
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
                </CardContent>
            </Card>
        </div>
    )
}
