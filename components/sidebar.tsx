"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface Navigation {
    name: string
    path: string
    icon: React.ReactNode
}

interface ToggleSidebarProps {
    navigations: Navigation[]
}

export default function Sidebar({ navigations }: ToggleSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const SidebarContent = () => (
        <div className="w-64 min-h-screen pt-28 px-8 border-r border-slate-400">
            <div className="flex flex-col gap-4 justify-start">
                {navigations?.map((item, index) => (
                    <Link href={item?.path} key={index} className="flex gap-2 group">
                        {item?.icon}
                        <div className="font-bold text-slate-500 group-hover:text-secondary-200">{item?.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    )

    return (
        <>
            {/* Large screens: Always visible sidebar */}
            <div className="hidden xl:block">
                <SidebarContent />
            </div>

            {/* Medium to mobile screens: Toggle sidebar */}
            <div className="xl:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle sidebar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}