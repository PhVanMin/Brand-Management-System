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

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-5">
            <Heading className="flex justify-between font-bold text-3xl" />
            <Summary className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview />
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
                        <TopEvents />
                    </CardContent>
                </Card>
            </div>{' '}
        </div>
    )
}
