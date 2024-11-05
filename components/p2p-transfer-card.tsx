'use client';

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { p2pTransfer } from '@/actions/p2p/index';
import CircularRingLoader from './ring-loader';
import { useToast } from '@/hooks/use-toast';

const P2PTransferCard = () => {

    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<Boolean>(false);
    const {toast} = useToast();

    const clickHandler = async () => {
        try {
            setLoading(true);
            const res = await p2pTransfer(number, amount * 100)
            setLoading(false);
            toast({
                title: 'Response',
                description: res?.message
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to transfer, try again'
            })
        }
    }

    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>
                    Send money 
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Number</Label>
                    <Input
                        type='string'
                        placeholder='Enter phone number'
                        className='bg-slate-800 text-slate-50 border-none placeholder:text-slate-50'
                        onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Amount</Label>
                    <Input
                        type='number'
                        placeholder='Enter amount'
                        className='bg-slate-800 text-slate-50 border-none placeholder:text-slate-50'
                        onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
            </CardContent>
            <CardFooter className='flex items-center justify-center'>
                <Button onClick={clickHandler} className='bg-primary'>
                    {loading? 'Processing...' : 'Send money'}
                    {loading && <CircularRingLoader className='w-4 h-4 ml-2' />}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default P2PTransferCard