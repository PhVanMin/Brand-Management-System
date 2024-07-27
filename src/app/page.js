import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import image from '../../public/home.png'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex flex-col items-center p-5">
            <div className="flex gap-2">
                <div className="gap-2">
                    <div className="text-5xl font-bold text-primary">
                        Event Management System
                    </div>
                    <p className="text-lg flex-grow py-5">
                        Organizing an event can be complex, but our Event
                        Management System streamlines the entire process,
                        ensuring everything runs smoothly from start to finish.
                        Whether you're planning a small gathering or a large
                        conference, our platform provides all the tools you need
                        for successful event execution.
                    </p>
                    <Button asChild>
                        <Link href="/auth">Get Started</Link>
                    </Button>
                </div>
                <Image
                    src={image}
                    sizes="30vw"
                    className="w-full h-auto p-4"
                    alt="Homepage"
                />
            </div>
            <div className="pt-4 h-100">
                <div className="font-bold text-3xl mb-3 text-primary">
                    Features
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Dashboard</CardTitle>
                            <CardDescription>Event tracking</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Get an overview of all your events in one place.
                                Track progress, manage tasks, and stay on top of
                                deadlines effortlessly
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Management</CardTitle>
                            <CardDescription>
                                Event Creation and Management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Allocate and manage resources such as venues,
                                equipment, and personnel efficiently. Avoid
                                double bookings and ensure everything is where
                                it needs to be.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Insights and Reports</CardTitle>
                            <CardDescription>
                                Event analytics with charts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Gain valuable insights with detailed analytics
                                and reports. Track attendance, monitor
                                engagement, and measure the success of your
                                events.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Real-time Notifications</CardTitle>
                            <CardDescription>Notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Receive immediate alerts on important updates
                                and changes. Automated reminders for upcoming
                                events and tasks.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
