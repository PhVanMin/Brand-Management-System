'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ListFilter } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CreateSheet from './createSheet'

export default function Overview({ className }) {
    return (
        <div className={cn('grid auto-rows-max items-start gap-4', className)}>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-3">
                        <CardTitle>Your Events</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Introducing Our Dynamic Event Management Page for
                            Seamless Management and Insightful Analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <CreateSheet />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>This Week</CardDescription>
                        <CardTitle className="text-4xl">$1,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +25% from last week
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>This Month</CardDescription>
                        <CardTitle className="text-4xl">$5,329</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +10% from last month
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={12} aria-label="12% increase" />
                    </CardFooter>
                </Card>
            </div>
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <div className="flex justify-between">
                        <CardTitle>Events</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Fulfilled
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Declined
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Refunded
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <CardDescription>
                        Recent events from your brand.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Type
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date
                                </TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="bg-accent">
                                <TableCell>
                                    <div className="font-medium">
                                        Liam Johnson
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        liam@example.com
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    Sale
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge
                                        className="text-xs"
                                        variant="secondary"
                                    >
                                        Fulfilled
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    2023-06-23
                                </TableCell>
                                <TableCell className="text-right">
                                    $250.00
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
