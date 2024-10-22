import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ja, vi, es, ru, fr, ko, it, pt, de, id, hi } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocale(locale: string) {
  switch (locale) {
    case 'es':
      return { locale: es };
    case 'vi':
      return { locale: vi };
    case 'ja':
    case 'zh':
      return { locale: ja };
    case 'en':
      return {};
    case 'ru':
      return { locale: ru };
    case 'fr':
      return { locale: fr };
    case 'ko':
      return { locale: ko };
    case 'it':
      return { locale: it };
    case 'pt':
      return { locale: pt };
    case 'de':
      return { locale: de };
    case 'id':
      return { locale: id };
    case 'hi':
      return { locale: hi };
    default:
      return { locale: ja };
  }
}
