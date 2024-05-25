'use client';

import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import { FC } from 'react';

export type DeviceDetailsProps = {
  feed: FeedInfo;
};
const DeviceDetails: FC<DeviceDetailsProps> = ({ feed }) => {
  console.log('[DeviceDetails] feed', feed);

  const { data, error, isLoading } = useFeedDetail(feed.key);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log('DATA', data);

  const feedDetail = data as FeedInfo;
  return (
    <div className="flex flex-col justify-start items-center gap-3">
      {/* {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 gap-2">
            <div className="col-span-1">{key}</div>
            <div className="col-span-1">{value}</div>
          </div>
        ))} */}
      <DetailEntry title="Device Type" value={FeedType[extractFeedType(feedDetail.key) as FeedTypeKeys]} />
      <DetailEntry title="Name" value={feedDetail.name} />
      <DetailEntry title="Created at" value={feedDetail.created_at} />
      <DetailEntry title="Description" value={feedDetail.description} />
    </div>
  );
};

const DetailEntry: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="w-full grid grid-cols-3 gap-2">
    <Label className="col-span-1 font-semibold text-left">{title}:</Label>
    <Label className="col-span-2 text-right">{value}</Label>
  </div>
);

export default DeviceDetails;
