'use client'
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTranslations } from 'next-intl';


export default function SelectLanguage() {
    const m = useTranslations('Metadata');

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-center">Language</h3>
            {m('home')}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize w-48 hover:bg-emerald-200 border-emerald-500"
                    >
                        {m('language')} <span className="ml-2">🌐</span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu

                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    className="w-48"

                >
                    <DropdownItem value="en">English</DropdownItem>
                    <DropdownItem value="de">Deutsch</DropdownItem>
                    <DropdownItem value="es">Español</DropdownItem>
                    <DropdownItem value="fr">Français</DropdownItem>
                    <DropdownItem value="it">Italiano</DropdownItem>
                    <DropdownItem value="ja">日本語</DropdownItem>
                    <DropdownItem value="ko">한국어</DropdownItem>
                    <DropdownItem value="pt">Português</DropdownItem>
                    <DropdownItem value="ru">Русский</DropdownItem>
                    <DropdownItem value="zh">中文</DropdownItem>
                    <DropdownItem value="vi">Tiếng Việt</DropdownItem>
                    <DropdownItem value="id">Bahasa Indonesia</DropdownItem>
                    <DropdownItem value="ne">नेपाली</DropdownItem>
                    <DropdownItem value="tl">Tagalog</DropdownItem>
                    <DropdownItem value="hi">हिन्दी</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
