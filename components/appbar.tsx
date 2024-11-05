'use client';

import React from 'react'
import { Button } from '@/components/ui/button';


const Appbar = ({ signInHandler, signOutHandler, authenticated, navigateHandler, landingPage, wallet }: { signInHandler: () => void, signOutHandler: () => void, authenticated: boolean, navigateHandler: () => void, landingPage: () => void, wallet: React.ReactNode }) => {


    return (
        <div className='py-4 px-2 md:p-4 max-w-screen mx-auto border-b border-slate-400'>
            <div className="w-full flex justify-between items-center">
                <Button className='flex gap-1 items-center text-xl font-bold text-secondary-200 ml-12 xl:ml-0' 
                        onClick={landingPage}>
                    <span>
                        {wallet}
                    </span>
                    <span>Swift Pay</span>
                </Button>
                <div className="flex gap-2 md:gap-4 items-center">
                    {authenticated ? (
                        <Button className='bg-primary' onClick={navigateHandler}>Dashboard</Button>
                    ) : null}
                    <Button className='bg-primary' onClick={authenticated ? signOutHandler : signInHandler}>{authenticated ? "Sign Out" : "Sing In"}</Button>
                </div>
            </div>
        </div>
    )
}

export default Appbar