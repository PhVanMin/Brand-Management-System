function TopEventsCard({ event, keyProp }) {
    return (
        <div
            key={keyProp}
            className="dark:bg-primary bg-muted p-3 rounded flex items-center"
        >
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{event.name}</p>
                <p className="text-sm text-muted-foreground">{event.game}</p>
            </div>
            <div className="ml-auto font-medium">{event.players} players</div>
        </div>
    )
}

export default function TopEvents() {
    const events = [
        { name: 'Ev 1', game: 'Ga 1', players: 1000 },
        { name: 'Ev 2', game: 'Ga 2', players: 2000 },
        { name: 'Ev 3', game: 'Ga 3', players: 3000 },
    ]
    return (
        <div className="space-y-3">
            {events.map((item, key) => (
                <TopEventsCard key={key} event={item} />
            ))}
        </div>
    )
}
