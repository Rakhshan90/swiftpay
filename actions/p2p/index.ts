'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from '@/db/index';


export const p2pTransfer = async (to: string, amount: number) => {

    const session = await getServerSession(authOptions);
    const sender = session?.user?.id;


    try {

        if (!sender) {
            return {
                message: "Sender is not found, try signing again",
            }
        }

        const recepient = await db.user.findFirst({
            where: { phone: to }
        });
        if (!recepient) {
            return {
                message: "Recipient is not found",
            }
        }

        const senderBalance = await db.balance.findUnique({
            where: { userId: Number(sender) }
        });

        if (!senderBalance || senderBalance.amount < amount) {
            return {
                message: "Insufficient balance"
            }
        }

        await db.$transaction(async (txn) => {

            // lock row for one transaction all other transactions wait until this transaction get committed
            // therefore, only one transaction can read and write to this row at a time.
            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;

            // debit process
            await txn.balance.update({
                where: { userId: Number(sender) },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            // credit process
            await txn.balance.update({
                where: { userId: recepient?.id },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            // make a p2p transaction entry
            await txn.p2pTransfer.create({
                data: {
                    amount,
                    timestamp: new Date(),
                    fromUserId: Number(sender),
                    toUserId: Number(recepient?.id)
                }
            })

        });
        
        return {
            message: `Rs.${amount / 100} has been sent to ${to}`
        }

    } catch (error) {
        return {
            message: "Failed to transfer money, try again"
        }
    }
}