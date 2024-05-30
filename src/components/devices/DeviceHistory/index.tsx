'use client';

import { useFeedHistory } from '@/app/hooks/useFeedHistory';
import { FeedData, FeedInfo, FeedSensorUnit, FeedSensorUnitKeys } from '@/app/types/feed';
import { FC, useState } from 'react';
import { useMounted } from '@/app/hooks/useMounted';
import Chart from '@/components/Chart';
import { Label } from '@/components/ui/label';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { extractFeedType } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

type Period = {
  label: string;
  value: string;
};

const PERIODS: Period[] = [
  { label: 'Last Hour', value: 'hour' },
  { label: 'Last Day', value: 'day' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' },
];

enum Periods {
  hour = 'Last Hour',
  day = 'Last Day',
  week = 'Last Week',
  month = 'Last Month',
}

type PeriodKeys = keyof typeof Periods;

export type DeviceHistoryProps = {
  feedKey: string;
};
const DeviceHistory: FC<DeviceHistoryProps> = ({ feedKey }) => {
  const mounted = useMounted();
  const [period, setPeriod] = useState<PeriodKeys>('hour');

  const { data: feedHistory, error: historyError, isPending: feedHistoryPending } = useFeedHistory(feedKey, period);
  const { data: feedInfo, error: infoError, isPending: infoPending } = useFeedDetail(feedKey);

  const error = historyError || infoError;
  const isPending = feedHistoryPending || infoPending;

  if (isPending || error)
    return (
      <div className="flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <Label className="text-xl mb-2 font-bold text-left w-full">History</Label>
          <div className="max-w-[30%] min-w-[20%]">
            <Select onValueChange={(value) => setPeriod(value as PeriodKeys)} disabled>
              <SelectTrigger>{Periods[period]}</SelectTrigger>
              <SelectContent>
                {Object.keys(Periods).map((p, idx) => (
                  <SelectItem key={idx} value={p}>
                    {Periods[p as PeriodKeys]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
      </div>
    );

  const fmt = feedHistory.reduce((acc, curr) => {
    acc.unshift(curr);
    return acc;
  }, [] as FeedData[]);

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex items-center justify-between">
        <Label className="text-xl mb-2 font-bold text-left w-full">History</Label>
        <div className="max-w-[30%] min-w-[20%]">
          <Select onValueChange={(value) => setPeriod(value as PeriodKeys)}>
            <SelectTrigger>{Periods[period]}</SelectTrigger>
            <SelectContent>
              {Object.keys(Periods).map((p, idx) => (
                <SelectItem key={idx} value={p}>
                  {Periods[p as PeriodKeys]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {fmt.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <Label className="text-md text-gray-500">No data available during this period</Label>
        </div>
      )}
      {mounted && fmt.length !== 0 && (
        <Chart
          data={fmt}
          unit={FeedSensorUnit[extractFeedType(feedInfo.key) as FeedSensorUnitKeys]}
          type={parseChartType(feedInfo.key)}
        />
      )}
    </div>
  );
};

const parseChartType = (feedType: string) => {
  if (['light', 'fan'].includes(extractFeedType(feedType))) return 'stepped';
  return '';
};

export default DeviceHistory;
