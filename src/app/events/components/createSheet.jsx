import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
function DateSelect({ id, className, date, setDate }) {
    return (
        <div className={className}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        id={id}
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default function CreateSheet({ className }) {
    const [date, setDate] = useState({
        from: Date.now(),
        to: Date.now(),
    })
    const [info, setInfo] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)
    }

    return (
        <Sheet className={className}>
            <SheetTrigger asChild>
                <Button>Create New Event</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Event</SheetTitle>
                    <SheetDescription>
                        Input your event information. Click Add when you are
                        done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            autoComplete="true"
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    name: e.target.value,
                                }))
                            }
                            id="name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    image: e.target.value,
                                }))
                            }
                            type="file"
                            id="image"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vouchers" className="text-right">
                            Number of vouchers
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    vouchers: e.target.value,
                                }))
                            }
                            min="0"
                            type="number"
                            id="vouchers"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <p className="text-right">Game</p>
                        <div className="col-span-3">
                            <Select
                                onValueChange={(e) =>
                                    setInfo((info) => ({
                                        ...info,
                                        game: e,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a game" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Quiz">
                                            Quiz
                                        </SelectItem>
                                        <SelectItem value="Roll">
                                            Rolling in the Deep
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date range
                        </Label>
                        <DateSelect
                            id="date"
                            date={date}
                            setDate={setDate}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleSubmit}>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
