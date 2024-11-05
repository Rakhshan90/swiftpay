import React from 'react'
import P2PTransferCard from '@/components/p2p-transfer-card'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const P2PTransfer = async() => {

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/signin');
    }
    return (
        <div className='px-8 max-w-7xl mx-auto xl:mx-0'>
            <div className="pt-8">
                <h1 className="title">P2P Transfer</h1>
            </div>
            <div className="flex gap-4 py-12 items-start">
                <P2PTransferCard />
            </div>
        </div>
    )
}

export default P2PTransfer