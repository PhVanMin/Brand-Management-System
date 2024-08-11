'use client'
import { useState } from 'react'
import Settings from './components/settings'
import EditEvent from './components/edit'
import { cn } from '@/lib/utils'

export default function EventPage({ params }) {
    const [isEditPage, setEditPage] = useState(true)

    return (
        <main className="flex flex-1 flex-col gap-4 p-8 md:gap-8">
            <div className="grid w-full gap-2">
                <h1 className="text-3xl font-semibold">Edit Event</h1>
            </div>
            <div className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <div
                        className={cn(
                            'cursor-pointer',
                            isEditPage
                                ? 'text-primary font-semibold dark:text-primary-foreground'
                                : ''
                        )}
                        onClick={() => setEditPage(true)}
                    >
                        Event Info
                    </div>
                    <div
                        className={cn(
                            'cursor-pointer',
                            !isEditPage
                                ? 'text-primary font-semibold dark:text-primary-foreground'
                                : ''
                        )}
                        onClick={() => setEditPage(false)}
                    >
                        Game Settings
                    </div>
                </nav>
                <div className="grid place-self-center max-w-screen-2xl gap-6">
                    {isEditPage ? (
                        <EditEvent id={params.id} />
                    ) : (
                        <Settings id={params.id} />
                    )}
                </div>
            </div>
        </main>
    )
}
