'use server';


import { authOptions } from '@/lib/auth';
import db from '@/db/index';
import { getServerSession } from 'next-auth';

export const offRampCreateTxn = async (amount: number, provider: string)=>{

    const token = Math.random().toString();

    const session = await getServerSession(authOptions);
    if(!session?.user?.id){
        return {
            message: 'User is not logged in',
        }
    }

    try {
        await db.offRampTransaction.create({
            data: {
                token,
                amount,
                provider,
                status: 'Processing',
                startTime: new Date(),
                userId: Number(session?.user?.id),
            }
        });

        return {
            message: 'withdrawal request is in progress',
        }
    } catch (error) {
        return {
            message: 'Something went wrong in withdrawal request'
        }
    }
}