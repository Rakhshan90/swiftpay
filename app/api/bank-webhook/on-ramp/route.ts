import { NextRequest } from "next/server";
import db from '@/db/index';


export async function POST(req: NextRequest) {
    // Todo: Zod validation
    // Ideally: HDFC or any other bank should ideally send us a secret so we know this is sent by the bank

    const paymentInformation: { token: string, userId: number, amount: number } = await req.json();

    try {

        const onRampTransection = await db.onRampTransaction.findFirst({
            where: { token: paymentInformation?.token }
        });

        if (!onRampTransection) {
            return new Response('Transaction record not found', { status: 404 });
        }

        if (onRampTransection?.status === 'Success') {
            return new Response('On ramp transaction is already completed', { status: 403 });
        }

        const balance = await db.balance.findFirst({
            where: {
                userId: paymentInformation.userId,
            }
        });

        if (!balance) {
            return new Response('Balance record not found', { status: 404 });
        }

        await db.$transaction(async (txn) => {

            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(paymentInformation.userId)} FOR UPDATE`;

            await txn.balance.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),

            await txn.$queryRaw`SELECT * FROM "OnRampTransaction" WHERE "userId" = ${Number(paymentInformation.userId)} FOR UPDATE`;

            await txn.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: 'Success'
                }
            })
        });


        return new Response('Captured', { status: 200 });


    } catch (error) {
        return new Response(`{Error while processing webhook, Unable to captured payment information into our database ${error}}`, { status: 500 });
    }
}