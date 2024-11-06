'use client';

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'



const SendTransactionsCard = ({ sendTxns }: { sendTxns: { amount: number, timestamp: Date }[] }) => {

    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>
                    Sent Transactions
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className='h-24 w-full overflow-y-auto'>
                    <div className="flex flex-col gap-4 border-b pb-2 pr-4 border-slate-400">
                        {sendTxns?.map((item, index) => (
                            <div key={index} className='w-full flex justify-between'>
                                <div className="flex flex-col">
                                    <Label className='text-slate-50'>Debited INR</Label>
                                    <div className="text-slate-400 text-xs font-medium">
                                        {item?.timestamp?.toDateString()}
                                    </div>
                                </div>
                                <Label className='text-slate-50'>-Rs {item?.amount / 100}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SendTransactionsCard