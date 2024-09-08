import { Copy, MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Info({ className, selectedEvent }) {
    console.log(selectedEvent)
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
                        <div className="font-semibold">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Glimmer Lamps x <span>2</span>
                                </span>
                                <span>$250.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Aqua Filters x <span>1</span>
                                </span>
                                <span>$49.00</span>
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>$299.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Shipping
                                </span>
                                <span>$5.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>$25.00</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">
                                    Total
                                </span>
                                <span>$329.00</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        Updated{' '}
                        <time dateTime="2023-11-23">November 23, 2023</time>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
