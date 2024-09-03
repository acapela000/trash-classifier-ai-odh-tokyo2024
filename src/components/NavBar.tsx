'use client'
import { BellAlertIcon, HomeIcon, MapIcon } from '@heroicons/react/20/solid';
import { CogIcon } from '@heroicons/react/16/solid';
import { Badge } from "@nextui-org/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';


export default function NavBar() {
    const n = useTranslations('NavBar');

    return (
        <header className="w-full bg-white shadow-xs shadow-emerald-100 rounded-large fixed bottom-0 lef-0 right-0 z-50">
            <div className="container flex justify-evenly py-1 ">
                <Link href="/" className="flex flex-col items-center text-green-500" prefetch={false}>
                    <HomeIcon className="w-8 h-8 text-green-500 hover:text-green-300" />
                    <span className="text-sm">{n('home')}</span>
                </Link>
                <Badge
                    isOneChar
                    content={<BellAlertIcon className="size-3" />}
                    color="danger"
                    shape="circle"
                    placement="top-right"
                >
                    <Link href="/calendar" className="flex flex-col items-center text-yellow-500" prefetch={false}>
                        <CalendarDaysIcon className="w-8 h-8 text-yellow-500 hover:text-yellow-300" />
                        <span className="text-sm">{n('calendar')}</span>
                    </Link>
                </Badge>
                <Link href="/map" className="flex flex-col items-center text-blue-500" prefetch={false}>
                    <MapIcon className="w-8 h-8 text-blue-500 hover:text-blue-300" />
                    <span className="text-sm">{n('map')}</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center text-gray-500" prefetch={false}>
                    <CogIcon className="w-8 h-8 text-amber-700 hover:text-amber-500" />
                    <span className="text-sm text-amber-700">{n('setting')}</span>
                </Link>
            </div>
        </header>
    );
}