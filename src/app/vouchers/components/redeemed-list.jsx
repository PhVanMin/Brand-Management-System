'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function RedeemList({ className }) {
    const { data: session } = useSession()
    const [redeem, setRedeem] = useState([])

    useEffect(() => {
        async function GetData() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Brands/${session.user.id}/Redeem`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            )

            if (res.ok) {
                const vouchers = await res.json()
                console.log(vouchers)
                setRedeem(vouchers)
            }
        }

        if (session?.user?.id) GetData()
    }, [session])

    return (
        <div>
            <Card className={className} x-chunk="event-01-chunk-1">
                <CardHeader className="px-7">
                    <div className="flex justify-between">
                        <CardTitle>Recently Redeemed</CardTitle>
                    </div>
                    <CardDescription>
                        Recent redeemed vouchers from your events.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {redeem.map((v, i) => (
                        <div
                            key={i}
                            className="flex justify-between p-3 items-center rounded-lg"
                        >
                            <div>
                                <p className="font-bold">Voucher ID: {v.id}</p>
                                <p className="text-muted-foreground">
                                    Redeem date:{' '}
                                    {new Date(v.createdDate).toDateString()}
                                </p>
                            </div>
                            <p>Value: {v.value}$</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
