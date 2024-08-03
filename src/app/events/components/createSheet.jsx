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

export default function EventSheet({ className }) {
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState({})
    const [vouchers, setVouchers] = useState([])
    const [date, setDate] = useState({
        from: Date.now(),
        to: Date.now(),
    })

    const handleSubmit = async () => {
        console.log(info)
        await new Promise((r) => setTimeout(r, 2000))
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                                    image: e.target.value,
                                }))
                            }
                            type="file"
                            id="image"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vouchers" className="text-right">
                            Number of vouchers
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    vouchers: e.target.value,
                                }))
                            }
                            min="0"
                            type="number"
                            id="vouchers"
                            className="col-span-2"
                        />
                        <VoucherPopover
                            chosenVouchers={vouchers}
                            onChange={setVouchers}
                        />
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
                                                {voucher.name}
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
                                onValueChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        game: e,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a game" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Quiz">
                                            Quiz
                                        </SelectItem>
                                        <SelectItem value="Roll">
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
