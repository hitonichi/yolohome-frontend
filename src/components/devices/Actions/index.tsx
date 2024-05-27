'use client';

import { FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import { FC } from 'react';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { Toggle } from '@/components/ui/toggle';

const NON_INTERACTABLE_FEEDS = ['temperature', 'humidity', 'lux'];

export interface DeviceActionsProps {
  feedKey: string;
}
const DeviceActions: React.FC<DeviceActionsProps> = ({ feedKey }) => {
  const feedType = extractFeedType(feedKey) as FeedTypeKeys;
  const renderBody = (feedType: FeedTypeKeys) => {
    switch (FeedType[feedType]) {
      case FeedType.fan:
        return <FanActions feedKey={feedKey} />;
      case FeedType.light:
        return <LightActions feedKey={feedKey} />;
      case FeedType.temperature:
      case FeedType.humidity:
      case FeedType.lux:
      default:
        return null;
    }
  };

  console.log('[ACTIONS]', feedType);
  if (!feedType || NON_INTERACTABLE_FEEDS.includes(extractFeedType(feedKey) as FeedType)) return null;

  return (
    <div className="flex flex-col justify-start items-center gap-3 mb-6">
      <Label className="text-xl mb-2 font-bold text-left w-full">Actions</Label>
      {renderBody(feedType)}
    </div>
  );
};

interface FeedActionProps {
  feedKey: string;
}
const FanActions: FC<FeedActionProps> = ({ feedKey }) => {
  const { data, error, isLoading } = useFeedDetail(feedKey);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      {/* <Label className="text-lg font-bold">Fan Actions</Label> */}
      <Label className="text-sm">Turn on fan of {feedKey}</Label>
    </div>
  );
};

const LightActions: FC<FeedActionProps> = ({ feedKey }) => {
  const { data, error, isLoading } = useFeedDetail(feedKey);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const switchData = data as FeedInfo;
  const isOn = Number(switchData.last_value) == 1;

  return (
    <div className="w-full">
      {/* <Label className="text-lg font-bold">Light Actions</Label> */}
      <Label className="text-sm">Switch of {feedKey}</Label>
      <Toggle
        pressed={isOn}
        variant={'outline'}
        className="data-[state=on]:bg-primary data-[state=on]:text-white"
        onClick={() => {
          console.log('toggled');
        }}
      >
        {isOn ? 'Turn OFF' : 'Turn ON'}
      </Toggle>
    </div>
  );
};

export default DeviceActions;
