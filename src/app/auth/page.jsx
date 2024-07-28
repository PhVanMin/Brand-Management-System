import AuthForm from './components/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

export default function AuthPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex min-h-screen items-center w-full p-5">
                <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="dark:invert -z-10 blur-[150px] absolute rounded-full h-1/3 w-1/3 bg-gradient-to-r from-[#FC5C7D] to-[#6A82FB]" />
                    <Image
                        src={`/login-pic.png`}
                        width={400}
                        height={200}
                        alt="Auth-image"
                        priority
                    />
                    <p className="text-4xl text-center font-bold text-wrap w-1/2">
                        Welcome to VOU Brand Management System
                    </p>
                </div>
                <Tabs defaultValue="signin" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <AuthForm isSignIn={true} />
                    </TabsContent>
                    <TabsContent value="signup">
                        <AuthForm isSignIn={false} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
