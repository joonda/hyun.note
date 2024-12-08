'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Header() {

    const navList = [
        { name: "Posts", href: '/' },
        { name: 'About', href: '/about' }
    ]

    return (
        <nav className="flex justify-center w-full items-center bg-gray-50 border-b shadow-sm">
            <div className="flex max-w-5xl justify-between p-4 w-full items-center">
                <div className='flex'>
                    <Link
                        className="text-lg font-bold"
                        href={'/'}
                    >
                        Hyun.note
                    </Link>
                </div>
                <div className="flex space-x-4 items-center">
                    {navList.map((navItem) => {
                        return (
                            <Link
                                href={navItem.href}
                                key={navItem.name}
                                className='text-slate-500 hover:text-slate-800 text-sm'
                            >
                                {navItem.name}
                            </Link>
                        )
                    })}
                    <Button
                        variant="ghost" size="icon" asChild
                        className="size-5"
                    >
                        <Link href='https://github.com/joonda' target="_blank">
                            <Github />
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

