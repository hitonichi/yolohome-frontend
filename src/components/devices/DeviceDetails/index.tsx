'use client';

import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import { FC } from 'react';
import DetailEntry from '../DetailEntry';

export type DeviceDetailsProps = {
  feedKey: string;
};
const DeviceDetails: FC<DeviceDetailsProps> = ({ feedKey }) => {
  const { data, error, isLoading } = useFeedDetail(feedKey);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const feedDetail = data as FeedInfo;
  return (
    <div className="flex flex-col justify-start items-center gap-3">
      <Label className="text-xl mb-2 font-bold text-left w-full">Details</Label>

      <DetailEntry title="Device Type" value={FeedType[extractFeedType(feedDetail.key) as FeedTypeKeys]} />
      <DetailEntry title="Name" value={feedDetail.name} />
      <DetailEntry title="Created at" value={feedDetail.created_at} />
      <DetailEntry title="Description" value={feedDetail.description} />
    </div>
  );
};

export default DeviceDetails;
