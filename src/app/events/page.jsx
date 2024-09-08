'use client'
import { useState } from 'react'
import Info from './components/info'
import Overview from './components/overview'

export default function Events() {
    const [selectedEvent, setSelectEvent] = useState(null)
    return (
        <div className="p-4 grid gap-4 lg:grid-cols-3">
            <Overview className="col-span-2" setSelectEvent={setSelectEvent} />
            <Info
                selectedEvent={selectedEvent}
                className="lg:col-span-1 col-span-3"
            />
        </div>
    )
}
