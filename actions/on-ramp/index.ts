'use server';

import { authOptions } from '@/lib/auth';
import db from '@/db/index';
import { getServerSession } from 'next-auth';


export const onRampCreateTxn = async (amount: number, provider: string) => {

    const token = Math.random().toString();

    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return {
            message: "User is not logged in"
        }
    }

    try {
        await db.onRampTransaction.create({
            data: {
                userId: Number(session?.user?.id),
                amount,
                startTime: new Date(),
                provider,
                status: 'Processing',
                token      
            }
        })
    } catch (error) {
        return {
            message: "Failed to initiate transaction"
        }
    }
}