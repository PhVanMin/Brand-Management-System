import { LoaderIcon } from 'lucide-react'

function TopEventsCard({ event, keyProp }) {
    return (
        <div
            key={keyProp}
            className="dark:bg-primary bg-muted p-3 rounded flex items-center"
        >
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{event.name}</p>
                <p className="text-sm text-muted-foreground">
                    Redeemed Voucher: {event.voucher}
                </p>
            </div>
            <div className="ml-auto font-medium">{event.player} players</div>
        </div>
    )
}

export default function TopEvents({ topEvents }) {
    if (!topEvents || topEvents == null)
        return (
            <div>
                <LoaderIcon />
                <p>Loading</p>
            </div>
        )

    const events = topEvents.map((data) => ({
        name: data.name,
        player: data.playerData.count,
        voucher: data.redeemVoucherData.redeemCount,
    }))

    return (
        <div className="space-y-3">
            {events.map((item, key) => (
                <TopEventsCard key={key} event={item} />
            ))}
        </div>
    )
}
