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
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import CreateSheet from './createSheet'

export default function VoucherList({ className }) {
    return (
        <div className={className}>
            <Card x-chunk="event-01-chunk-0">
                <CardHeader className="px-7">
                    <CardTitle>Vouchers</CardTitle>
                    <CardDescription>Vouchers for your events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex justify-between gap-2">
                        <CreateSheet className="h-8" title="Add Voucher" icon />
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
                            <TableRow className="bg-accent">
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <Image
                                        alt="Voucher"
                                        className="rounded-md object-cover"
                                        width="100"
                                        height="50"
                                        src="/voucher-1.jpg"
                                    />
                                </TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell>
                                    <div className="w-44 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                        Vouchers for your events. This is a
                                        voucher.
                                    </div>
                                </TableCell>
                                <TableCell>20</TableCell>
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
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
