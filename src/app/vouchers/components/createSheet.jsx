'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateSheet({
    className,
    title = 'Create New Voucher',
    icon = false,
}) {
    const [info, setInfo] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(info)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {icon ? (
                    <Button className={className}>
                        <PlusCircle className="h-3.5 w-3.5 mr-1" />
                        <span>{title}</span>
                    </Button>
                ) : (
                    <Button className={className}>{title}</Button>
                )}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Voucher</SheetTitle>
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
