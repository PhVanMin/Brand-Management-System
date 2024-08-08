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
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import VoucherPopover from '../../components/add-voucher'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function EditEvent({ id }) {
    const [currentState, setState] = useState(null)
    const [vouchers, setVouchers] = useState([])
    const [date, setDate] = useState(null)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        async function GetEventInfo() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/Events/${id}`
                )
                if (res.ok) {
                    const eventInfo = await res.json()
                    setState(eventInfo)
                    setInfo(eventInfo)
                    setVouchers(eventInfo.vouchers)
                    setDate({
                        from: eventInfo.startDate,
                        to: eventInfo.endDate,
                    })
                }
            } catch (error) {}
        }

        GetEventInfo()
    }, [])

    function handleReset() {
        setInfo(currentState)
        setVouchers(currentState.vouchers)
        setDate({
            from: currentState.startDate,
            to: currentState.endDate,
        })
    }

    if (info === null) return <div>Loading...</div>

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Event Infomation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                autoComplete="true"
                                value={info.name}
                                onChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        name: e.target.value,
                                    }))
                                }
                                id="name"
                            />
                        </div>
                        <div>
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
                        <div>
                            <Label htmlFor="vouchers">Number of vouchers</Label>
                            <Input
                                onChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        noVoucher: e.target.value,
                                    }))
                                }
                                value={info.noVoucher}
                                min="0"
                                type="number"
                                id="vouchers"
                            />
                        </div>
                        <div>
                            <Label>Game</Label>
                            <div>
                                <Select
                                    value={`${info.gameId}`}
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
                                            <SelectItem value="0">
                                                Quiz
                                            </SelectItem>
                                            <SelectItem value="1">
                                                Rolling in the Deep
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="date">Date range</Label>
                            <DateSelect
                                id="date"
                                date={date}
                                setDate={setDate}
                            />
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Image</Label>
                            <div className="rounded flex justify-center items-center flex-1 overflow-hidden border">
                                {!info.image ? (
                                    <img
                                        className="object-fill aspect-video"
                                        src={URL.createObjectURL(info.image)}
                                        alt="image"
                                    />
                                ) : (
                                    <p>No Image</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center gap-2">
                                <Label>Registered vouchers</Label>
                                <VoucherPopover
                                    id={id}
                                    className="p-1.5 bg-primary cursor-pointer text-white rounded-md"
                                    iconClassname="h-3 w-3"
                                    onChange={setVouchers}
                                    chosenVouchers={vouchers}
                                />
                            </div>
                            <ScrollArea className="h-44 rounded-md border">
                                <div className="grid-cols-2 grid p-4 gap-2">
                                    {vouchers.map((voucher, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between hover:bg-primary/5 p-1 rounded border border-primary"
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
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                <Button onClick={handleReset} variant="secondary">
                    Cancel
                </Button>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
