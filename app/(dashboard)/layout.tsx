import { ArrowLeftRight, Clock3, MoveUpRight } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


const navigations = [
    // {
    //     icon: <House className="text-slate-500 group-hover:text-violet-600" />,
    //     name: "Dashboard",
    //     path: "/dashboard"
    // },
    {
        icon: <ArrowLeftRight className="text-slate-500 group-hover:text-violet-600" />,
        name: "Transfer",
        path: "/transfer"
    },
    {
        icon: <Clock3 className="text-slate-500 group-hover:text-violet-600" />,
        name: "Transactions",
        path: "/transactions"
    },
    {
        icon: <MoveUpRight className="text-slate-500 group-hover:text-violet-600" />,
        name: "P2P Transfer",
        path: "/p2p-transfer"
    },
]


export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/signin');
    }

    return (
        <div className="flex">
            <Sidebar navigations={navigations} />
            {children}
        </div>
    )
}