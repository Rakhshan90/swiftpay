import { Github, Twitter, User } from "lucide-react";
import Link from "next/link";


const socialLinks = [
    {
        href: 'https://github.com/Rakhshan90',
        icon: <Github className="text-secondary-200" />
    },
    {
        href: 'https://x.com/Rakhshan__ahmad',
        icon: <Twitter className="text-secondary-200" />
    },
    {
        href: 'https://portfolio.rakhshan.online/',
        icon: <User className="text-secondary-200" />
    },
]

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 py-6 max-w-screen items-center justify-center px-4 md:px-6 border-t lg:flex-row lg:justify-between mt-12">
            <p className="text-xs text-slate-50">
                © 2024 Swift Pay end-to-end Wallet.
            </p>
            <nav className="flex gap-4">
                {socialLinks?.map((item, index) => (
                    <Link href={item?.href} key={index} className="p-2 rounded-md bg-slate-900">
                        {item?.icon}
                    </Link>
                ))}
            </nav>
        </footer>
    );
};