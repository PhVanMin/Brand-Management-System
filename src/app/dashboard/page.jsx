import {
    Activity,
    CreditCard,
    DollarSign,
    MoreHorizontal,
    Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function DashboardTable({ className }) {
    return (
        <div className={className}>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>My Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Game
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    No. Voucher
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Total players
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Start Date
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    End Date
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    Laser Lemonade Machine
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">Ongoing</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    Mario
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    10000
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    25
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    2023-07-12 10:42 AM
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    2023-07-12 10:42 AM
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

function Summary({ className }) {
    return (
        <div className={className}>
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Players
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last day
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Vouchers Used
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+23</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last day
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Now
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                        +201 since last hour
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

function DashboardTabs({ className }) {
    return (
        <Tabs className={className} defaultValue="day">
            <div>
                <TabsList>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent className="gap-3 flex-1 grid grid-rows-4" value="day">
                <Summary className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" />
                <DashboardTable className="row-span-3 grid" />
            </TabsContent>
            <TabsContent value="month">Month content</TabsContent>
            <TabsContent value="year">Year content</TabsContent>
        </Tabs>
    )
}

export default function Dashboard() {
    return (
        <div className="flex min-h-screen w-full flex-col gap-4 p-5">
            <div className="font-bold text-3xl">Dashboard</div>
            <DashboardTabs className="flex flex-col flex-1" />
        </div>
    )
}
