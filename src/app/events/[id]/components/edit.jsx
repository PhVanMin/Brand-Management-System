'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DateSelect } from '../../components/dateSelect'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import VoucherPopover from '../../components/add-voucher'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function EditEvent() {
    const [vouchers, setVouchers] = useState([])
    const [date, setDate] = useState({
        from: Date.now(),
        to: Date.now(),
    })
    const [info, setInfo] = useState({})

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Event Infomation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="grid grid-rows-2 items-center">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                autoComplete="true"
                                onChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        name: e.target.value,
                                    }))
                                }
                                id="name"
                            />
                        </div>
                        <div className="grid grid-rows-2 items-center">
                            <Label htmlFor="image">Image</Label>
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
                            />
                        </div>
                        <div className="grid grid-rows-2 items-center">
                            <Label htmlFor="vouchers">Number of vouchers</Label>
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
                            />
                        </div>
                        <div className="grid grid-rows-2 items-center">
                            <Label>Game</Label>
                            <div>
                                <Select
                                    onValueChange={(e) =>
                                        setInfo((info) => ({
                                            ...info,
                                            game: e,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
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
                        <div className="grid grid-rows-2 items-center">
                            <Label htmlFor="date">Date range</Label>
                            <DateSelect
                                id="date"
                                date={date}
                                setDate={setDate}
                            />
                        </div>
                    </div>
                    <div className="gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Registered vouchers</Label>
                            <ScrollArea className="flex-1 border rounded">
                                <div className="p-3 h-[150px] grid grid-cols-2 gap-2">
                                    {vouchers.map((voucher, index) => (
                                        <div
                                            key={index}
                                            className="flex group items-center justify-between hover:bg-primary/5 p-1 rounded border border-primary"
                                        >
                                            <p className="font-semibold">
                                                {voucher.name}
                                            </p>
                                            <p className="group-hover:hidden">
                                                {voucher.value}
                                            </p>
                                            <div
                                                className="group-hover:block hidden"
                                                onClick={() =>
                                                    setVouchers((vouchers) =>
                                                        vouchers.filter(
                                                            (v) =>
                                                                v.name !==
                                                                voucher.name
                                                        )
                                                    )
                                                }
                                            >
                                                <X className="hover:bg-rose-500 p-0.5 hover:rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => setVouchers([])}
                                    className="h-8"
                                >
                                    Clear
                                </Button>
                                <VoucherPopover
                                    className="h-8"
                                    onChange={setVouchers}
                                    chosenVouchers={vouchers}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Image</Label>
                            {info.image && (
                                <div className="rounded overflow-hidden border">
                                    <img
                                        className="object-fill aspect-video"
                                        src={URL.createObjectURL(info.image)}
                                        alt="image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <Button variant="secondary">Cancel</Button>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
