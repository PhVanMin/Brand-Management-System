'use client'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const chartConfig = {
    player: {
        label: 'Player',
        color: 'hsl(var(--chart-1))',
    },
    voucher: {
        label: 'Voucher',
        color: 'hsl(var(--chart-2))',
    },
}

export default function Overview({ className, data }) {
    const chartData = [
        {
            month: 'Event 1',
            player: Math.floor(Math.random() * 5000) + 1000,
            voucher: Math.floor(Math.random() * 5000) + 1000,
        },
        {
            month: 'Event 2',
            player: Math.floor(Math.random() * 5000) + 1000,
            voucher: Math.floor(Math.random() * 5000) + 1000,
        },
        {
            month: 'Event 3',
            player: Math.floor(Math.random() * 5000) + 1000,
            voucher: Math.floor(Math.random() * 5000) + 1000,
        },
    ]

    return (
        <ChartContainer
            config={chartConfig}
            className={cn('min-h-[250px] w-full', className)}
        >
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <CartesianGrid vertical={false} />
                <Bar dataKey="player" fill="var(--color-player)" radius={4}>
                    <LabelList
                        position="top"
                        offset={2}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
                <Bar dataKey="voucher" fill="var(--color-voucher)" radius={4}>
                    <LabelList
                        position="top"
                        offset={2}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
