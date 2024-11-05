'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AddMoneyCard from "./add-money-card"
import { Withdraw } from './withdraw'
import { useState } from "react"
import { offRampCreateTxn } from "@/actions/off-ramp/index";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export function WithdrawCreditTabs() {

    const [amount, setAmount] = useState<number>(0);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || '');

    const handleBankChange = (value: string) => {
        const selectedBank = SUPPORTED_BANKS[parseInt(value)];
        setProvider(selectedBank?.name || '');
        setRedirectUrl(selectedBank?.redirectUrl);
    };

    const handleAmountChange = (value: number) => {
        setAmount(value);
    }

    return (
        <Tabs defaultValue="add-money" className="w-80 lg:w-96 bg-slate-900 border-none rounded-md">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900 border-none">
                <TabsTrigger value="add-money">
                    Add Money
                </TabsTrigger>
                <TabsTrigger value="withdraw">
                    Withdraw
                </TabsTrigger>
            </TabsList>
            <TabsContent value="add-money">
                <AddMoneyCard />
            </TabsContent>
            <TabsContent value="withdraw">
                <Withdraw clickHandler={async () => {
                    await offRampCreateTxn(amount * 100, provider)
                    window.location.href = redirectUrl || "";
                }} handleAmountChange={handleAmountChange} handleBankChange={handleBankChange} SUPPORTED_BANKS={SUPPORTED_BANKS} children={'Withdraw'} />
            </TabsContent>
        </Tabs>
    )
}