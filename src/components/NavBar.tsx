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
        <header className="w-full bg-gradient-to-t from-amber-50 to-white shadow-xs shadow-emerald-100 rounded-t-xl fixed bottom-0 lef-0 right-0 z-50">
            <div className="container flex justify-evenly py-1 ">
                <Link href="/" className="flex flex-col items-center text-green-500" prefetch={false}>
                    <HomeIcon className="w-8 h-8 text-green-500 md:hover:text-green-300 md:transition md:duration-350 md:hover:scale-150 md:hover:-translate-none" />
                    <span className="text-sm ">{n('home')}</span>
                </Link>
                <Badge
                    isOneChar
                    content={<BellAlertIcon className="size-3 md:transition md:duration-350 md:hover:scale-150 md:hover:rotate-45" />}
                    color="danger"
                    shape="circle"
                    placement="top-right"
                >
                    <Link href="/calendar-noti" className="flex flex-col items-center text-yellow-500" prefetch={false}>
                        <CalendarDaysIcon className="w-8 h-8 text-yellow-500 md:hover:text-yellow-300 md:transition md:duration-350 md:hover:scale-150 md:hover:-translate-none" />
                        <span className="text-sm text-yellow-500">{n('calendar-noti')}</span>
                    </Link>
                </Badge>
                <Link href="/map" className="flex flex-col items-center text-blue-500" prefetch={false}>
                    <MapIcon className="w-8 h-8 text-blue-500 hover:text-blue-300 md:transition md:duration-350 md:hover:scale-150 md:hover:-translate-none" />
                    <span className="text-sm">{n('map')}</span>
                </Link>
                <Link href="/settings" className="flex flex-col items-center text-gray-500" prefetch={false}>
                    <CogIcon className="w-8 h-8 text-amber-700 md:hover:text-amber-500 md:transition md:duration-350 md:hover:scale-150 md:hover:-translate-none" />
                    <span className="text-sm text-amber-700">{n('setting')}</span>
                </Link>
            </div>
        </header>
    );
}