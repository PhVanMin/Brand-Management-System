import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function RedeemList({ className }) {
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
                    <div className="flex justify-between p-3 items-center rounded-lg">
                        <div>
                            <p>Name</p>
                            <p className="text-muted-foreground">Email</p>
                        </div>
                        <p>Voucher</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
