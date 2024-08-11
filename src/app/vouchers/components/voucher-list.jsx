'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
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
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import CreateSheet from './createSheet'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'

function EditDialog({ open, setOpen, voucher, getVouchers }) {
    const [data, setData] = useState(voucher)
    const { toast } = useToast()

    async function handleSubmit() {
        const { id, ...info } = data
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Vouchers/${voucher.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            }
        )

        if (res.ok) {
            toast({
                variant: 'success',
                title: 'Update voucher successfully.',
                duration: 3000,
                description: 'Voucher is updated.',
            })
            setOpen(false)
            getVouchers()
        } else {
            toast({
                variant: 'destructive',
                title: 'Update voucher failed.',
                duration: 3000,
                description: 'Voucher is not updated. Please try again.',
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Voucher</DialogTitle>
                    <DialogDescription>
                        Edit your brand voucher. Click Save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center border-dashed border rounded aspect-video">
                        <p>Image</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="">
                                Image
                            </Label>
                            <Input
                                onChange={(e) =>
                                    setData((info) => ({
                                        ...info,
                                        image: e.target.files[0],
                                    }))
                                }
                                type="file"
                                id="image"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="value" className="">
                                Value ($)
                            </Label>
                            <Input
                                onChange={(e) =>
                                    setData((info) => ({
                                        ...info,
                                        value: e.target.value,
                                    }))
                                }
                                min="0"
                                defaultValue={voucher.value}
                                type="number"
                                id="value"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="">
                                Description
                            </Label>
                            <Textarea
                                onChange={(e) =>
                                    setData((info) => ({
                                        ...info,
                                        description: e.target.value,
                                    }))
                                }
                                defaultValue={voucher.description}
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expire_date" className="">
                                Expire date
                            </Label>
                            <Input
                                onChange={(e) =>
                                    setData((info) => ({
                                        ...info,
                                        expireDate: e.target.value,
                                    }))
                                }
                                defaultValue={voucher.expireDate}
                                min="0"
                                type="number"
                                id="expire_date"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="justify-end">
                    <Button onClick={handleSubmit} type="button">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function VoucherList({ className }) {
    const { data: session } = useSession()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [vouchers, setVouchers] = useState([])
    const [selectedVoucher, selectVoucher] = useState(null)
    useEffect(() => {
        if (session.user.id) GetVouchers()
    }, [session])

    async function GetVouchers() {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Brands/${session.user.id}/Vouchers`
        )

        if (res.ok) {
            const vouchers = await res.json()
            setVouchers(vouchers)
        }
    }

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
                            getVouchers={GetVouchers}
                            id={session.user.id}
                            className="h-8"
                            title="Add Voucher"
                            icon
                        />
                    </div>
                    <ScrollArea className="h-[768px]">
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
                                    <TableRow key={index}>
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
                                        <TableCell>
                                            {voucher.expireDate}
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
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setDialogOpen(true)
                                                            selectVoucher(
                                                                voucher
                                                            )
                                                        }}
                                                    >
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
                    </ScrollArea>
                </CardContent>
            </Card>
            {selectedVoucher && (
                <EditDialog
                    getVouchers={GetVouchers}
                    open={dialogOpen}
                    voucher={selectedVoucher}
                    setOpen={setDialogOpen}
                />
            )}
        </div>
    )
}
