import { FeedSensorUnit } from '@/app/types/feed';
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

export function extractFeedType(feed: string) {
  const splitted = feed.split('-');
  return splitted[splitted.length - 1];
}

export function calcDayDifference(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
