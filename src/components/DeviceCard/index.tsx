import { FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { SheetTrigger } from '../ui/sheet';
import { FC } from 'react';
import { Label } from '../ui/label';
import { extractFeedType } from '@/lib/utils';

export type DeviceCardProps = {
  feed: FeedInfo;
};
const DeviceCard: FC<DeviceCardProps> = ({ feed }) => {
  return (
    <SheetTrigger asChild className="col-span-1 cursor-pointer hover:bg-primary/5">
      <Card className="p-2">
        <div className="flex items-center justify-between">
          <div className="w-full min-w-0 flex flex-col justify-start">
            <div className="inline-block text-md font-semibold">
              <p className="truncate block">{feed.name}</p>
            </div>
            <Label className="text-sm text-gray-500">{FeedType[extractFeedType(feed.name) as FeedTypeKeys]}</Label>
          </div>
        </div>
      </Card>
    </SheetTrigger>
  );
};

export default DeviceCard;
