'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import VoucherPopover from './add-voucher'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DateSelect } from './dateSelect'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

export default function EventSheet({ loadEvents, className }) {
    const { toast } = useToast()
    const [isOpen, setOpen] = useState(false)
    const { data: session } = useSession()
    const [info, setInfo] = useState({
        name: '',
        image: null,
        noVoucher: 0,
        gameId: 1,
    })
    const [vouchers, setVouchers] = useState([])
    const [date, setDate] = useState({
        from: Date.now(),
        to: Date.now(),
    })

    const handleSubmit = async () => {
        const data = {
            brandId: session.user.id,
            name: info.name,
            image: info.image,
            noVoucher: parseInt(info.noVoucher),
            start: new Date(date.from).toJSON(),
            end: new Date(date.to).toJSON(),
        }

        try {
            const formData = new FormData()
            Object.keys(data).forEach((key) => formData.append(key, data[key]))
            vouchers.forEach((v) => formData.append('voucherIds', v.id))

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Events`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${session.user.token}`,
                    },
                    body: formData,
                }
            )

            if (!res.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Create Event Failed',
                    duration: 3000,
                    description: `Event ${info.name} failed to create.`,
                })
            } else {
                toast({
                    variant: 'success',
                    title: 'Create Event Successfully',
                    description: `Event '${info.name}' is created. Updating event list.`,
                    duration: 3000,
                })
                setOpen(false)
                loadEvents()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className={className}>Create New Event</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Event</SheetTitle>
                    <SheetDescription>
                        Create a new event for your brand. Click Save Changes
                        when finish.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            autoComplete="true"
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    name: e.target.value,
                                }))
                            }
                            id="name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    image: e.target.files[0],
                                }))
                            }
                            type="file"
                            accept="image/*"
                            id="image"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vouchers" className="text-right">
                            Number of vouchers
                        </Label>
                        <div className="flex col-span-3 gap-2">
                            <Input
                                onChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        noVoucher: e.target.value,
                                    }))
                                }
                                min="0"
                                defaultValue="0"
                                type="number"
                                id="vouchers"
                                className="flex-1"
                            />
                            <VoucherPopover
                                className="p-3 flex justify-center items-center bg-primary cursor-pointer text-white rounded-md"
                                iconClassname="h-3.5 w-3.5"
                                chosenVouchers={vouchers}
                                onChange={setVouchers}
                                id={session.user.id}
                            />
                        </div>
                    </div>
                    {vouchers.length > 0 ? (
                        <div className="grid grid-cols-4 gap-4">
                            <ScrollArea className="col-start-2 pr-3 col-span-3 max-h-[110px]">
                                <div className="grid gap-2">
                                    {vouchers.map((voucher, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between hover:bg-primary/20 px-2 py-0.5 rounded border border-primary"
                                        >
                                            <p className="font-semibold">
                                                Voucher {voucher.id}
                                            </p>
                                            <p>{voucher.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Game</Label>
                        <div className="col-span-3">
                            <Select
                                defaultValue="1"
                                onValueChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        gameId: e,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a game" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="1">Quiz</SelectItem>
                                        <SelectItem value="2">
                                            Rolling in the Deep
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date range
                        </Label>
                        <DateSelect
                            id="date"
                            date={date}
                            setDate={setDate}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
