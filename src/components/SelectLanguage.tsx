'use client'
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
// import { i18n } from '@components/i18n';

export default function SelectLanguage() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select Languages"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    // add i18n
    const { t, i18n } = useTranslation();
    const router = useRouter();


    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-center">Language</h3>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize w-48 hover:bg-emerald-200 border-emerald-500"
                    >
                        {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu

                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                >

                    <DropdownItem onClick={() => i18n.changeLanguage('en')} className="hover:bg-emerald-200 duration-200" key="English">English</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('ja')} key="Japanese">Japan</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('ko')} key="Korean">Korea</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('zh')} key="Chinese">China</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('vi')} key="Vietnamese">Vietnam</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('id')} key="Bahasa">Indonesia</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('ne')} key="Nepali">Nepal</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('tl')} key="Tagalog">Philippines</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('hi')} key="Hindi">India</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('es')} key="Spanish">Spain</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('de')} key="Deutsch">Germany</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('fr')} key="French">France</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('it')} key="Italian">Italy</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('pt')} key="Potugese">Potugal</DropdownItem>
                    <DropdownItem onClick={() => i18n.changeLanguage('ru')} key="Russia">Russia</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
