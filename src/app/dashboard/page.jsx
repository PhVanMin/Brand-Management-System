'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Overview from './components/overview'
import TopEvents from './components/top-events'
import Heading from './components/heading'
import Summary from './components/summary'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { addDays } from 'date-fns'

export default function Dashboard() {
    const [data, setData] = useState(null)
    const { data: session } = useSession()
    const [date, setDate] = useState({
        from: addDays(new Date(), -7),
        to: new Date(),
    })

    useEffect(() => {
        async function GetData() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/Brands/${session.user.id}/Statistics?all=true&start=${date.from.toJSON()}&end=${date.to.toJSON()}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.user.token}`,
                    },
                }
            )

            if (res.ok) {
                const statistics = await res.json()
                setData(statistics)
            }
        }

        if (session?.user?.id && date?.from && date?.to) GetData()
    }, [session, date])

    return (
        <div className="flex flex-col gap-4 p-5">
            <Heading
                className="flex justify-between font-bold text-3xl"
                date={date}
                setDate={setDate}
            />
            <Summary
                className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
                data={data}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview topEvents={data?.topEvents} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Events</CardTitle>
                        <CardDescription>
                            Top 5 most played events
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TopEvents topEvents={data?.topEvents} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
