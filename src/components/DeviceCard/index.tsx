import { FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { SheetTrigger } from '../ui/sheet';
import { Dispatch, FC, SetStateAction } from 'react';
import { Label } from '../ui/label';
import { extractFeedType } from '@/lib/utils';
import Link from 'next/link';

export type DeviceCardProps = {
  feed: FeedInfo;
  setCurrentFeed: Dispatch<SetStateAction<FeedInfo | null>>;
};
const DeviceCard: FC<DeviceCardProps> = ({ feed, setCurrentFeed }) => {
  return (
    <Link href={'devices/' + feed.key} onClick={() => setCurrentFeed(feed)} className="col-span-1">
      <Card className="p-2 cursor-pointer hover:bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="w-full min-w-0 flex flex-col justify-start">
            <div className="inline-block text-md font-semibold">
              <p className="truncate block text-primary">{feed.name}</p>
            </div>
            <Label className="text-sm text-gray-500">
              {FeedType[extractFeedType(feed.name) as FeedTypeKeys] ?? 'Unknown Device'}
            </Label>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DeviceCard;
