'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FilePenLine } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

function VoucherCheckbox({ className, cKey, voucher, onChange, checked }) {
    return (
        <div className={className} key={cKey}>
            <Checkbox
                checked={checked}
                onCheckedChange={(checked) =>
                    onChange(function (state) {
                        if (!checked)
                            return state.filter((v) => v.id !== voucher.id)
                        return [...state, voucher]
                    })
                }
                id={voucher.id}
            />
            <Label htmlFor={voucher.id}>Voucher {voucher.id}</Label>
        </div>
    )
}

export default function VoucherPopover({
    className,
    chosenVouchers,
    onChange,
    iconClassname,
    id,
}) {
    const [vouchers, setVouchers] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        async function GetVouchers() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Brands/${id}/Vouchers`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            )

            if (res.ok) {
                const vouchers = await res.json()
                setVouchers(vouchers)
            }
        }

        if (session.user.token && id) GetVouchers()
    }, [session])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={className}>
                    <FilePenLine className={iconClassname} />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Voucher</DialogTitle>
                    <DialogDescription>
                        Choose voucher for your event. Click Done when you are
                        done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[150px] rounded-md border p-4">
                    <div className="grid grid-cols-2 gap-2">
                        {vouchers.map((voucher, index) => (
                            <VoucherCheckbox
                                checked={
                                    chosenVouchers.find(
                                        (v) => v.id === voucher.id
                                    )
                                        ? true
                                        : false
                                }
                                className="flex items-center gap-2"
                                key={index}
                                voucher={voucher}
                                onChange={onChange}
                            />
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter className="justify-between">
                    <div className="flex gap-2">
                        <Button onClick={() => onChange(vouchers)}>
                            Add all
                        </Button>
                        <Button
                            onClick={() => onChange([])}
                            variant="destructive"
                        >
                            Clear
                        </Button>
                    </div>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Done
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
