'use client';

import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from './ui/label'


const BalanceCard = ({ amount, locked }: { amount: number, locked: number }) => {
    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none rounded-md'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>
                    Balance
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className='w-full'>
                    <div className="w-full flex justify-between border-b pb-2 border-slate-400">
                        <Label className='text-slate-50'>Unlocked balance</Label>
                        <Label className='text-slate-50'>{amount / 100} INR</Label>
                    </div>
                    <div className="mt-2 w-full flex justify-between border-b pb-2 border-slate-400">
                        <Label className='text-slate-50'>Total locked balance</Label>
                        <Label className='text-slate-50'>{locked / 100} INR</Label>
                    </div>
                    <div className="mt-2 w-full flex justify-between border-b pb-2 border-slate-400">
                        <Label className='text-slate-50'>Total balance</Label>
                        <Label className='text-slate-50'>{(amount + locked) / 100} INR</Label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BalanceCard