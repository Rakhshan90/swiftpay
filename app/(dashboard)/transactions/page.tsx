import React from 'react';
import db from '@/db/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SendTransactionsCard from '@/components/send-txn-card';
import RecievedTxnsCard from '@/components/received-txn-card';
import { redirect } from 'next/navigation';
import OnRampTxnsCard from '@/components/on-ramp-txn-card';
import OffRampTxnsCard from '@/components/off-ramp-txn-card';


const getSendTxns = async () => {
    const session = await getServerSession(authOptions);
    const sendTxns = await db.p2pTransfer.findMany({
        where: { fromUserId: Number(session?.user?.id) },
        select: {
            amount: true,
            timestamp: true,
        }
    });

    return sendTxns;
}

const getRecievedTxns = async () => {
    const session = await getServerSession(authOptions);
    const recievedTxns = await db.p2pTransfer.findMany({
        where: { toUserId: Number(session?.user?.id) },
        select: {
            amount: true,
            timestamp: true,
        }
    });

    return recievedTxns;
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user?.id) {
        return {
            message: "User is not logged in"
        }
    }
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getOffRampTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user?.id) {
        return {
            message: "User is not logged in"
        }
    }
    const txns = await db.offRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

const Transactions = async () => {

    const sendTxns = await getSendTxns();
    const recievedTxns = await getRecievedTxns();
    const onRamptransactions = await getOnRampTransactions();
    const offRamptransactions = await getOffRampTransactions();

    // Check if transactions contain a message
    if ('message' in onRamptransactions) {
        // Handle the case where the user is not logged in
        return <div>{onRamptransactions.message}</div>;
    }

    // Check if transactions contain a message
    if ('message' in offRamptransactions) {
        // Handle the case where the user is not logged in
        return <div>{offRamptransactions.message}</div>;
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/signin');
    }

    return (
        <div className='px-8 max-w-7xl mx-auto xl:mx-0'>
            <div className="pt-8">
                <h1 className="title">Transactions</h1>
            </div>
            <div className="flex flex-wrap gap-4 py-12 justify-center items-center xl:justify-start xl:items-start md:flex-row">
                <SendTransactionsCard sendTxns={sendTxns} />
                <RecievedTxnsCard recievedTxns={recievedTxns} />
                <OnRampTxnsCard transactions={onRamptransactions} />
                <OffRampTxnsCard transactions={offRamptransactions} />
            </div>


        </div>
    )
}

export default Transactions