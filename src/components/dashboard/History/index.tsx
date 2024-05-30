import { Card, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { calcDayDifference } from '@/lib/utils';
import { title } from 'process';
import { FC } from 'react';

const NEWS = [
  {
    title: 'Device added: pihome',
    subTitles: 'Device added to the dashboard',
    date: '2024-05-22T07:42:42Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
  {
    title: 'Device status update',
    subTitles: 'Device status updated',
    date: '2024-05-22T07:42:49Z',
  },
];

const Logs = () => {
  return (
    <div className="space-y-2">
      {NEWS.map((news) => (
        <HistoryCard key={news.title} title={news.title} subTitles={news.subTitles} date={news.date} />
      ))}
    </div>
  );
};

type HistoryCardProps = {
  title: string;
  subTitles: string;
  date: string;
};
const HistoryCard: FC<HistoryCardProps> = ({ title, subTitles, date }) => {
  return (
    <Card className="p-2">
      <CardTitle>
        <div className="flex justify-between items-center my-2">
          <Label className="font-bold">
            {title}
            <Label className="ml-2">{subTitles}</Label>
          </Label>
          <Label className="text-gray-400">{calcDayDifference(date)} days ago</Label>
        </div>
      </CardTitle>
    </Card>
  );
};

export default Logs;
