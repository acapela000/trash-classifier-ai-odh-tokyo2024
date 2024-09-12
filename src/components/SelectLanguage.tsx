'use client';
import React, { ChangeEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl"; // Use this hook to get the current locale
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from 'next-intl';


export default function SelectLanguage() {
    const l = useTranslations('SelectLanguage');

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
        { key: 'zh', label: '中文' },
        { key: 'es', label: 'Español' },
        { key: 'ru', label: 'Русский' },
        { key: 'fr', label: 'Français' },
        { key: 'ko', label: '한국어' },
        { key: 'it', label: 'Italiano' },
        { key: 'pt', label: 'Português' },
        { key: 'de', label: 'Deutsch' },
        { key: 'ne', label: 'नेपाली' },
        { key: 'id', label: 'Bahasa Indonesia' },
        { key: 'tl', label: 'Tagalog' },
        { key: 'hi', label: 'हिन्दी' },
    ], []);

    return (
        <Select
            label={l('selectLg')}
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
