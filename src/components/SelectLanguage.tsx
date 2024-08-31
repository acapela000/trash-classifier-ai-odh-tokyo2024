'use client';
import React, { ChangeEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl"; // Use this hook to get the current locale
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectLanguage() {
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        // Reconstruct the path with the new locale
        const newPath = pathname.replace(locale, newLocale);
        router.push(newPath);
    };

    const languages = useMemo(() => [
        { key: 'en', label: 'English' },
        { key: 'ja', label: '日本語' },
        { key: 'vi', label: 'Tiếng Việt' },
        // Uncomment the following lines to add more languages
        // { key: 'de', label: 'Deutsch' },
        // { key: 'es', label: 'Español' },
        // { key: 'fr', label: 'Français' },
        // { key: 'it', label: 'Italiano' },
        // { key: 'ko', label: '한국어' },
        // { key: 'pt', label: 'Português' },
        // { key: 'ru', label: 'Русский' },
        // { key: 'zh', label: '中文' },
        // { key: 'id', label: 'Bahasa Indonesia' },
        // { key: 'ne', label: 'नेपाली' },
    ], []);

    return (
        <Select
            label="Select your language"
            selectionMode="single"
            onChange={handleLanguageChange}
            selectedKeys={[locale]}>
            {languages.map((language) => (
                <SelectItem key={language.key}>
                    {language.label}
                </SelectItem>
            ))}
        </Select>
    );
}
