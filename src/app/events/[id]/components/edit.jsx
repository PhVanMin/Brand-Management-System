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
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import VoucherPopover from '../../components/add-voucher'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Ticket } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function EditEvent({ eventId }) {
    const { data: session } = useSession()
    const [currentState, setState] = useState(null)
    const { toast } = useToast()
    const [vouchers, setVouchers] = useState(null)
    const [date, setDate] = useState(null)
    const [info, setInfo] = useState(null)
    const [image, setImage] = useState()
    const imageInputRef = useRef(null)
    const [games, setGames] = useState(null)

    useEffect(() => {
        async function GetEventInfo() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/Events/${eventId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session.user.token}`,
                        },
                    }
                )
                if (res.ok) {
                    const eventInfo = await res.json()
                    setState(eventInfo)
                    setInfo({
                        id: eventInfo.id,
                        name: eventInfo.name,
                        gameId: eventInfo.gameId,
                        noVoucher: eventInfo.noVoucher,
                    })
                    setVouchers(eventInfo.vouchers)
                    console.log(eventInfo.vouchers)
                    setDate({
                        from: eventInfo.startDate,
                        to: eventInfo.endDate,
                    })
                    setImage(eventInfo.image)
                }
            } catch (error) {}
        }

        async function GetGames() {
            const res = await fetch(
                `https://localhost:6060/games?PageNumber=1&PageSize=5`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            )

            const games = await res.json()
            setGames(games.games)
        }

        if (session?.user?.id) {
            GetEventInfo()
            GetGames()
        }
    }, [session])

    function handleReset() {
        setInfo({
            id: currentState.id,
            name: currentState.name,
            gameId: currentState.gameId,
            noVoucher: currentState.noVoucher,
        })
        setVouchers(currentState.vouchers)
        setDate({
            from: currentState.startDate,
            to: currentState.endDate,
        })
        setImage(currentState.image)
        imageInputRef.current.value = ''
    }

    async function handleSubmit() {
        const data = {
            ...info,
            brandId: session.user.id,
            start: new Date(date.from).toJSON(),
            end: new Date(date.to).toJSON(),
        }

        try {
            const formData = new FormData()
            Object.keys(data).forEach((key) => {
                if (data[key]) formData.append(key, data[key])
            })
            vouchers.forEach((v) => formData.append('voucherIds', v.id))
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Events/${eventId}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${session.user.token}`,
                    },
                    body: formData,
                }
            )

            if (!res.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Edit Event Failed',
                    duration: 3000,
                    description: `Failed to edit event '${info.name}'. Please try again.`,
                })
            } else {
                toast({
                    variant: 'success',
                    title: 'Edit Event Successfully',
                    description: `Event '${info.name}' is updated.`,
                    duration: 3000,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (info == null && games == null && vouchers == null)
        return <div>Loading...</div>

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
                            {info?.name && (
                                <Input
                                    autoComplete="true"
                                    value={info?.name}
                                    onChange={(e) =>
                                        setInfo((info) => ({
                                            ...info,
                                            name: e.target.value,
                                        }))
                                    }
                                    id="name"
                                />
                            )}
                        </div>
                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input
                                ref={imageInputRef}
                                onChange={(e) => {
                                    setInfo((info) => ({
                                        ...info,
                                        image: e.target.files[0],
                                    }))
                                    setImage(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }}
                                type="file"
                                accept="image/*"
                                id="image"
                            />
                        </div>
                        <div>
                            <Label htmlFor="vouchers">Number of vouchers</Label>
                            {info?.noVoucher && (
                                <Input
                                    onChange={(e) =>
                                        setInfo((info) => ({
                                            ...info,
                                            noVoucher: e.target.value,
                                        }))
                                    }
                                    value={info?.noVoucher}
                                    min="0"
                                    type="number"
                                    id="vouchers"
                                />
                            )}
                        </div>
                        <div>
                            <Label>Game</Label>
                            <div>
                                {games && (
                                    <Select
                                        value={info?.gameId}
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
                                                <SelectItem value={games[0].id}>
                                                    {games[0].gameName}
                                                </SelectItem>
                                                <SelectItem value={games[1].id}>
                                                    {games[1].gameName}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="date">Date range</Label>
                            {date && (
                                <DateSelect
                                    id="date"
                                    date={date}
                                    setDate={setDate}
                                />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Image</Label>
                            <div className="rounded relative items-center flex-1 overflow-hidden border">
                                {image && (
                                    <Image
                                        src={image}
                                        priority
                                        alt="Event image"
                                        className="h-auto"
                                        sizes="300px"
                                        fill
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center gap-2">
                                <Label>Registered vouchers</Label>
                                {vouchers && (
                                    <VoucherPopover
                                        id={session.user.id}
                                        className="p-1.5 bg-primary cursor-pointer text-white rounded-md"
                                        iconClassname="h-3 w-3"
                                        onChange={setVouchers}
                                        chosenVouchers={vouchers}
                                    />
                                )}
                            </div>
                            <ScrollArea className="h-44 rounded-md border">
                                <div className="grid-cols-2 grid p-4 gap-2">
                                    {vouchers?.map((voucher, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-muted rounded justify-center p-1"
                                        >
                                            <Ticket className="mr-2" />
                                            <span className="font-semibold">
                                                Voucher {voucher.id}
                                            </span>
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
                <Button onClick={handleSubmit}>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
