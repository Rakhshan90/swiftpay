import React from 'react'
import dashboardImg from '@/assets/swiftpay-1.webp'
import Image from 'next/image'

const Landing = () => {
    return (
        <div className="w-full mx-auto px-4 min-h-screen mt-36 mb-8 md:mb-20">
            <div className="h-full flex flex-col justify-center">
                <div className="w-full flex justify-center">
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <h1 className="max-w-2xl py-2 text-center text-5xl font-extrabold tracking-tighter md:text-5xl xl:text-6xl">
                            <span className="w-fit bg-gradient-to-b from-secondary-200 to-primary bg-clip-text pr-1.5 text-center text-transparent md:mb-4">
                                Swiftpay,
                            </span>{' '}
                            <span className="bg-gradient-to-b from-slate-300 to-slate-500 bg-clip-text py-1 text-transparent">
                                A wallet for On-ramp, Off-ramp, and P2P transfer
                            </span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl text-slate-400">
                            This wallet let's you add money from your bank account, withdraw money to your bank account and send money to your friends.
                        </p>
                        <div className="mt-8 md:mt-20 p-4 rounded-md bg-slate-900">
                            <Image src={dashboardImg} alt='dashboard.webp' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing