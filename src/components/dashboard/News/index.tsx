import { Card, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { calcDayDifference } from '@/lib/utils';
import { title } from 'process';
import { FC } from 'react';

const NEWS = [
  {
    title: 'New feature: Quick Actions',
    subTitles: 'Quickly toggle lights and fans',
    date: '2024-05-22T07:42:42Z',
  },
  {
    title: 'New feature: News',
    subTitles: 'Stay updated with the latest news',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Weather',
    subTitles: 'Check the weather forecast',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Calendar',
    subTitles: 'Keep track of important dates',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Stocks',
    subTitles: 'Monitor stock prices',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Todo List',
    subTitles: 'Keep track of your tasks',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Calculator',
    subTitles: 'Perform calculations',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Timer',
    subTitles: 'Set timers',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Stopwatch',
    subTitles: 'Track time',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Notes',
    subTitles: 'Take notes',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Settings',
    subTitles: 'Customize your dashboard',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Profile',
    subTitles: 'Manage your profile',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'New feature: Logout',
    subTitles: 'Log out of your account',
    date: '2024-05-22T07:42:49Z',
  },
];

const News = () => {
  return (
    <div className="space-y-2">
      {NEWS.map((news) => (
        <NewsCard key={news.title} title={news.title} subTitles={news.subTitles} date={news.date} />
      ))}
    </div>
  );
};

type NewsCardProps = {
  title: string;
  subTitles: string;
  date: string;
};
const NewsCard: FC<NewsCardProps> = ({ title, subTitles, date }) => {
  return (
    <Card className="p-2">
      <CardTitle>
        <div className="flex justify-between items-center my-2">
          <Label className="font-bold">{title}</Label>
          <Label className="text-gray-400">{calcDayDifference(date)} days ago</Label>
        </div>
      </CardTitle>
      <Label>{subTitles}</Label>
    </Card>
  );
};

export default News;
