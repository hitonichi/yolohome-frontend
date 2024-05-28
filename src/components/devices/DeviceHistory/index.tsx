'use client';

import { useFeedHistory } from '@/app/hooks/useFeedHistory';
import { FeedData, FeedInfo, FeedSensorUnit, FeedSensorUnitKeys } from '@/app/types/feed';
import { FC } from 'react';
import { useMounted } from '@/app/hooks/useMounted';
import Chart from '@/components/Chart';
import { Label } from '@/components/ui/label';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { extractFeedType } from '@/lib/utils';

export type DeviceHistoryProps = {
  feedKey: string;
};
const DeviceHistory: FC<DeviceHistoryProps> = ({ feedKey }) => {
  const mounted = useMounted();
  const { data: feedHistory, error: historyError, isPending: feedHistoryPending } = useFeedHistory(feedKey);
  const { data: feedInfo, error: infoError, isPending: infoPending } = useFeedDetail(feedKey);

  const error = historyError || infoError;
  const isPending = feedHistoryPending || infoPending;

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const fmt = feedHistory.reduce((acc, curr) => {
    acc.unshift(curr);
    return acc;
  }, [] as FeedData[]);

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-xl mb-2 font-bold text-left w-full">History</Label>
      {mounted && (
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
