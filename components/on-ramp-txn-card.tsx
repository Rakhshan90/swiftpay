'use client';

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from './ui/label'

type onRampStatus = "Success" | "Failure" | "Processing"

const OnRampTxnsCard = ({ transactions }: { transactions: { time: Date, amount: number, status: onRampStatus, provider: string }[] }) => {
    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>
                    Add money transactions    
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className='h-24 w-full overflow-y-auto'>
                    <div className="flex flex-col gap-4 border-b pb-2 pr-2 border-slate-400">
                        {transactions?.map((item, index) => (
                            <div key={index} className='w-full flex justify-between'>
                                <div className="flex flex-col">
                                    <Label className='text-slate-50'>Recieved INR</Label>
                                    <div className="text-slate-400 text-xs font-medium">
                                        {item?.time?.toDateString()}
                                    </div>
                                </div>
                                <Label className='text-slate-50'>+Rs {item?.amount / 100} {item?.status}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OnRampTxnsCard