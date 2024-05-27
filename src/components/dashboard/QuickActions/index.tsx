'use client';

import { useFeeds } from '@/app/hooks/useFeeds';
import { updateFeed } from '@/app/services/feed';
import { FAN_POWERS, FeedInfo, FeedSensorUnit, FeedSensorUnitKeys } from '@/app/types/feed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { extractFeedType } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fan, Lightbulb, LightbulbOff } from 'lucide-react';
import { FC, use } from 'react';

const QuickActions = () => {
  const { data, error, isPending } = useFeeds();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { feedKey: string; value: number }) => {
      return updateFeed(data.feedKey, data.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: (error) => {
      console.error('Error updating feed', error);
    },
  });

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
      const isOn = feed.last_value === '1';
      return (
        <Button
          onClick={() => {
            mutation.mutate({ feedKey: feed.key, value: isOn ? 0 : 1 });
          }}
          className={`flex justify-center items-center w-20 h-20 shadow-lg ${isOn ? '' : 'bg-gray-300'}`}
        >
          {isOn ? <Lightbulb className="text-white" size={48} /> : <LightbulbOff className="text-white" size={48} />}
        </Button>
      );
    } else if (['fan'].includes(feedType)) {
      const power = Number(feed.last_value) / 25;
      const fanLabel = FAN_POWERS.find((val) => val.value === power * 25)?.label;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`shadow-lg flex flex-col justify-between items-center w-20 h-20 text-white ${power === 0 ? 'bg-gray-300' : ''}`}
            >
              <Fan className="flex-1" size={28} />
              <Label className="text-lg">{fanLabel}</Label>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 space-y-3">
            {FAN_POWERS.map((val, idx) => {
              return (
                <Button
                  key={idx}
                  className="w-full"
                  onClick={() => {
                    mutation.mutate({ feedKey: feed.key, value: val.value });
                  }}
                >
                  {val.label}
                </Button>
              );
            })}
          </PopoverContent>
        </Popover>
      );
    }
    return <Label className="text-md text-gray-400">Unknown Device</Label>;
  };

  return (
    <div className="grid gap-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
      {mutation.isPending && <div className="col-span-full flex justify-center items-center">Changing...</div>}
      {!mutation.isPending &&
        feeds.map((feed) => (
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
