import React from 'react'
import BalanceCard from '@/components/balance-card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/db/index';
import { redirect } from 'next/navigation'
import { WithdrawCreditTabs } from '@/components/withdraw-credit-tabs'

const getBalance = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user?.id) {
        return {
            message: "User is not logged in"
        }
    }
    const balance = await db.balance.findFirst({
        where: { userId: Number(session?.user?.id) }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

const Transfer = async () => {

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/signin');
    }
    const balance = await getBalance();

    return (
        <div className='px-8 max-w-7xl mx-auto xl:mx-0'>
            <div className="pt-8">
                <h1 className="title">Transfer</h1>
            </div>
            <div className="flex flex-wrap gap-4 py-12 justify-center items-center xl:justify-start xl:items-start md:flex-row">
                <WithdrawCreditTabs />
                <BalanceCard amount={balance.amount ?? 0} locked={balance.locked ?? 0} />
            </div>
        </div>
    )
}

export default Transfer