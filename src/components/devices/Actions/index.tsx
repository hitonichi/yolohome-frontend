'use client';

import { FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import FanActions from './FanActions';
import LightActions from './LightActions';

const NON_INTERACTABLE_FEEDS = ['temperature', 'humidity', 'lux', 'earthquake'];

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

  if (!feedType || NON_INTERACTABLE_FEEDS.includes(extractFeedType(feedKey) as FeedType)) return null;

  return (
    <div className="flex flex-col justify-start items-center gap-3 mb-6">
      <Label className="text-xl mb-2 font-bold text-left w-full">Actions</Label>
      {renderBody(feedType)}
    </div>
  );
};

export interface FeedActionProps {
  feedKey: string;
}

export default DeviceActions;
