import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = [
  'ja',
  'en',
  'vi',
  'zh',
  'es',
  'ru',
  'fr',
  'ko',
  'it',
  'pt',
  'de',
  'ne',
  'id',
  'tl',
  'hi',
] as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
