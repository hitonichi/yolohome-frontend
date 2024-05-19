import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function navTitleToSearchParam(title: string) {
  return title.toLowerCase().replace(/(( & )| )/g, '-');
}

export function to2Decimal(num: number) {
  return Math.round(num * 100) / 100;
}
