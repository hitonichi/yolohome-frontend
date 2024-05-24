'use client';

import { useFeeds } from '@/app/hooks/useFeeds';
import { FeedInfo, FeedSensorUnit } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';

const SENSORS = [
  {
    name: 'Temperature',
    type: 'temperature',
    value: 25,
  },
  {
    name: 'Humidity',
    type: 'humidity',
    value: 50,
  },
  {
    name: 'Light',
    type: 'light',
    value: 100,
  },
  {
    name: 'Temperature',
    type: 'temperature',
    value: 25,
  },
  {
    name: 'Humidity',
    type: 'humidity',
    value: 50,
  },
  {
    name: 'Light',
    type: 'light',
    value: 100,
  },
];

export type DashboardSensorsProps = {
  feeds: FeedInfo[];
};
const DashboardSensors = () => {
  const { data, error, isPending } = useFeeds();

  if (isPending) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Type assert here
  const feeds = data as FeedInfo[];
  console.log('DATA', feeds);
  // if (data) {
  // }

  return (
    <div className="flex flex-col gap-2">
      {feeds.map((sensor, id) => (
        <div className="bg-white shadow rounded py-2 px-3 flex items-center justify-between gap-2" key={id}>
          <Label className="text-lg">{sensor.name}</Label>
          <p className="flex-1 flex justify-end text-primary text-3xl font-bold">{sensor.last_value}</p>
          <p className="min-w-[10%] flex justify-end items-end text-2xl text-gray-400">
            {FeedSensorUnit[extractFeedType(sensor.name)]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSensors;
