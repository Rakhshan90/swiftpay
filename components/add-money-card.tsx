'use client';

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from './ui/button'
import { onRampCreateTxn } from '@/actions/on-ramp/index';


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

const AddMoneyCard = () => {

    const [amount, setAmount] = useState<number>(0);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '');

    const handleBankChange = (value: string) => {
        const selectedBank = SUPPORTED_BANKS[parseInt(value)];
        setProvider(selectedBank?.name || '');
        setRedirectUrl(selectedBank?.redirectUrl);
    };

    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>
                    Add Money
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Amount</Label>
                    <Input
                        type='number'
                        className='bg-slate-800 text-slate-50 border-none placeholder:text-slate-50'
                        placeholder='Enter amount'
                        onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Bank</Label>
                    <Select onValueChange={handleBankChange}>
                        <SelectTrigger className="bg-slate-800 text-slate-50 border-none placeholder:text-slate-50">
                            <SelectValue className='text-slate-50' placeholder="HDFC Bank" />
                        </SelectTrigger>
                        <SelectContent className='bg-slate-800 border-none text-slate-50'>
                            {SUPPORTED_BANKS?.map((item, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    {item?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className='flex items-center justify-center'>
                <Button onClick={async () => {
                    await onRampCreateTxn(amount * 100, provider)
                    window.location.href = redirectUrl || "";
                }} className='bg-primary'>Add money</Button>
            </CardFooter>
        </Card>
    )
}

export default AddMoneyCard