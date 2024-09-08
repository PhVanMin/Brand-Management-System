'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sheet,
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
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

export default function CreateSheet({
    className,
    title = 'Create New Voucher',
    icon = false,
    getVouchers,
}) {
    const { toast } = useToast()
    const { data: session } = useSession()
    const [info, setInfo] = useState({
        description: '',
    })
    const [open, setOpen] = useState(false)
    const handleSubmit = async () => {
        const data = {
            brandId: session.user.id,
            Status: 0,
            ...info,
        }

        const formData = new FormData()
        Object.keys(data).forEach((key) => formData.append(key, data[key]))
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Vouchers`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
            body: formData,
        })

        if (res.ok) {
            toast({
                variant: 'success',
                title: 'Update voucher successful.',
                duration: 3000,
                description: 'Voucher is added to your brand.',
            })
            getVouchers()
            setOpen(false)
        } else {
            toast({
                variant: 'destructive',
                title: 'Add voucher failed.',
                duration: 3000,
                description: 'Cannot add voucher. Please try again.',
            })
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                        Input your voucher information. Click Add when you are
                        done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    Image: e.target.files[0],
                                }))
                            }
                            type="file"
                            accept="image/*"
                            id="image"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="code" className="text-right">
                            Code
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    Code: e.target.value,
                                }))
                            }
                            id="code"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="value" className="text-right">
                            Value ($)
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    Value: e.target.value,
                                }))
                            }
                            min="0"
                            defaultValue="0"
                            type="number"
                            id="value"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    Description: e.target.value,
                                }))
                            }
                            id="description"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expire_date" className="text-right">
                            Expire date
                        </Label>
                        <Input
                            onChange={(e) =>
                                setInfo((info) => ({
                                    ...info,
                                    ExpireDate: e.target.value,
                                }))
                            }
                            defaultValue="0"
                            min="0"
                            type="number"
                            id="expire_date"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={handleSubmit}>Save changes</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
