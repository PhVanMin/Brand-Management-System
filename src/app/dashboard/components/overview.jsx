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
import { LoaderIcon } from 'lucide-react'

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

export default function Overview({ className, topEvents }) {
    if (!topEvents) {
        return (
            <div>
                <LoaderIcon />
                <p>Loading</p>
            </div>
        )
    }

    var chartData = topEvents.map((data) => ({
        name: data.name,
        player: data.playerData.count,
        voucher: data.redeemVoucherData.redeemCount,
    }))

    return (
        <ChartContainer
            config={chartConfig}
            className={cn('min-h-[250px] w-full', className)}
        >
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="name"
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
