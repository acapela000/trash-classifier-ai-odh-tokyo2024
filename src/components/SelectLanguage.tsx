'use client'
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


export default function SelectLanguage() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select Languages"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

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
                // onSelectionChange={setSelectedKeys}
                >
                    <DropdownItem className="hover:bg-emerald-200" key="en">English</DropdownItem>
                    <DropdownItem key="jp">Japanese</DropdownItem>
                    <DropdownItem key="korea">Korean</DropdownItem>
                    <DropdownItem key="china">Chinese</DropdownItem>
                    <DropdownItem key="vn">Vietnamese</DropdownItem>
                    <DropdownItem key="spanish">Spanish</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
