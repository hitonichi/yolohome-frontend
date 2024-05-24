'use client';

import { useFeeds } from '@/app/hooks/useFeeds';
import { FeedInfo, FeedSensorUnit, FeedSensorUnitKeys } from '@/app/types/feed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import { Fan, Lightbulb, LightbulbOff } from 'lucide-react';
import { FC } from 'react';

const QuickActions = () => {
  const { data, error, isPending } = useFeeds();

  if (isPending) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Type assert here
  const feeds = data as FeedInfo[];

  const renderFeedData = (feed: FeedInfo) => {
    const feedType = extractFeedType(feed.name);
    if (Object.keys(FeedSensorUnit).includes(feedType)) {
      return (
        <div className="flex items-end gap-1">
          <Label className="text-3xl font-bold text-primary">{feed.last_value}</Label>
          <Label className="text-md text-gray-400">{FeedSensorUnit[feedType as FeedSensorUnitKeys]}</Label>
        </div>
      );
    } else if (['light'].includes(feedType)) {
      return (
        <Button className={`flex justify-center items-center w-20 h-20 ${feed.last_value ? '' : 'bg-gray-300'}`}>
          {feed.last_value ? (
            <Lightbulb className="text-white" size={48} />
          ) : (
            <LightbulbOff className="text-white" size={48} />
          )}
        </Button>
      );
    } else if (['fan'].includes(feedType)) {
      return (
        <Button className={`flex justify-center items-center w-20 h-20 ${feed.last_value ? '' : 'bg-gray-300'}`}>
          <Fan className="text-white" size={48} />
        </Button>
      );
    }
    return <Label className="text-md text-gray-400">Fan</Label>;
  };

  return (
    <div className="grid gap-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
      {feeds.map((feed) => (
        <QuickActionCard key={feed.id} title={feed.name}>
          {renderFeedData(feed)}
        </QuickActionCard>
      ))}
    </div>
  );
};

type QuickActionCardProps = {
  title?: string;
  children?: React.ReactNode;
};

const QuickActionCard: FC<QuickActionCardProps> = ({ children, title = 'Untitled' }) => {
  return (
    <Card className="flex flex-col justify-start items-center p-2 hover:bg-gray-50">
      <CardTitle className="w-full min-w-0 inline-block text-md">
        <p className="truncate block ">{title}</p>
      </CardTitle>
      <CardContent className="w-full h-32 mt-2 flex flex-col justify-center items-center p-0">{children}</CardContent>
    </Card>
  );
};

export default QuickActions;
