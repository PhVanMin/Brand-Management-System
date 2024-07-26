'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

const signInData = {
    schema: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
    fields: [
        {
            name: 'email',
            placeholder: 'Email',
            label: 'Email',
            type: 'email',
        },
        {
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            type: 'password',
        },
    ],
}

const signUpData = {
    schema: z.object({
        email: z.string().email({
            message: 'Invalid email address.',
        }),
        password: z.string().min(6, {
            message: 'Password must be at least 6 character.',
        }),
        name: z.string({
            required_error: 'Name is required.',
        }),
        field: z.string({
            required_error: 'Field is required.',
        }),
        address: z.string({
            required_error: 'Address is required.',
        }),
    }),
    fields: [
        {
            name: 'email',
            placeholder: 'Email',
            label: 'Email',
            haha: 'haha',
        },
        {
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            type: 'text',
        },
        {
            name: 'name',
            placeholder: 'Name',
            label: 'Brand Name',
            type: 'text',
        },
        {
            name: 'field',
            placeholder: 'Field',
            label: 'Field',
            type: 'Text',
        },
        {
            name: 'address',
            placeholder: 'Address',
            label: 'Address',
            type: 'text',
        },
    ],
}

export default function AuthForm({ isSignIn = true }) {
    const data = isSignIn ? signInData : signUpData
    const { toast } = useToast()
    const route = useRouter()

    const form = useForm({
        resolver: zodResolver(data.schema),
        defaultValues: data.defaultValues,
    })

    const handleSignUp = async (values) => {
        const res = await signIn('credentials', {
            email: values.email,
            name: values.name,
            field: values.field,
            address: values.address,
            gps: values.gps,
            password: values.password,
            signin: false,
            redirect: false,
        })

        if (res.ok) {
            route.push('/dashboard')
            return
        }

        toast({
            variant: 'destructive',
            title: 'Sign Up Failed',
            duration: 3000,
            description:
                'Email already in use. Please register with another email.',
        })
    }

    const handleSignIn = async (values) => {
        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            signin: true,
            redirect: false,
        })

        if (res.ok) {
            route.push('/dashboard')
            return
        }

        toast({
            variant: 'destructive',
            title: 'Log In Failed',
            duration: 3000,
            description:
                'Your provided email or password may not be correct. Please try again.',
        })
    }

    return (
        <Card>
            <CardContent className="mt-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            isSignIn ? handleSignIn : handleSignUp
                        )}
                        className="max-w-md w-full flex flex-col gap-4"
                    >
                        {data.fields.map((dataField, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={dataField.name}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                {dataField.placeholder}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        dataField.label
                                                    }
                                                    type={dataField.type}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <Button type="submit" className="w-full">
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
