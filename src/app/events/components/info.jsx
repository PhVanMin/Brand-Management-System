'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Info({ className, selectedEvent }) {
    if (selectedEvent == null) {
        return (
            <div className={className}>
                <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-05-chunk-4"
                >
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Select an event to view detail
                            </CardTitle>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const { data: session } = useSession()
    const [detail, setDetail] = useState(null)
    useEffect(() => {
        async function GetEventDetails() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Events/${selectedEvent.id}/Statistics`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            )

            if (res.ok) {
                const statistics = await res.json()
                console.log(statistics)
                setDetail(statistics)
            }
        }
        if (selectedEvent) GetEventDetails()
    }, [selectedEvent])

    return (
        <div className={className}>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {selectedEvent.name}
                        </CardTitle>
                        <CardDescription>
                            Date:{' '}
                            {new Date(selectedEvent.startDate).toUTCString()} -{' '}
                            {new Date(selectedEvent.endDate).toUTCString()}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Event Details</div>
                        {detail && (
                            <>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Total Player
                                        </span>
                                        <span>
                                            {detail[0].playerData.count}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Current Players
                                        </span>
                                        <span>
                                            {detail[0].playerData.onlineCount}
                                        </span>
                                    </li>
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Total voucher
                                        </span>
                                        <span>
                                            {detail[0].redeemVoucherData.total}
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Redeem voucher
                                        </span>
                                        <span>
                                            {
                                                detail[0].redeemVoucherData
                                                    .redeemCount
                                            }
                                        </span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Total redeem value
                                        </span>
                                        <span>
                                            {
                                                detail[0].redeemVoucherData
                                                    .totalValue
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
