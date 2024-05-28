'use client';

import { FAN_POWERS, FeedInfo, FeedType, FeedTypeKeys } from '@/app/types/feed';
import { Label } from '@/components/ui/label';
import { extractFeedType } from '@/lib/utils';
import { FC } from 'react';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { Toggle } from '@/components/ui/toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFeed } from '@/app/services/feed';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newVal: number) => {
      console.log('newVal', newVal);
      return updateFeed(feedKey, newVal);
    },
    onSuccess: () => {
      console.log('[ACTION] Mutate Success');
      queryClient.invalidateQueries({
        queryKey: ['feedDetail'],
      });
      queryClient.invalidateQueries({
        queryKey: ['feedHistory'],
      });
    },
    onError: (error) => {
      console.error('[ACTION] Mutate Error:', error);
    },
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {mutation.isPending ? (
        <div className="min-h-32">Changing...</div>
      ) : (
        <div className="min-h-32 w-full flex flex-col justify-start items-start">
          <div className="w-full px-6 ">
            <Progress
              className="outline outline-1 outline-primary/10 rounded-none bg-primary/10"
              value={Number(data?.last_value) * 20}
            />
          </div>
          <div className="w-full flex justify-between items-center">
            {FAN_POWERS.map((val, idx) => {
              return (
                <div key={idx} className={`w-12 flex flex-col justify-start items-center`}>
                  <Separator className="h-6 w-[1px] bg-primary/30" orientation="vertical" />
                  <p className="font-bold">{val.label}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 w-full flex gap-4 justify-center items-center">
            {FAN_POWERS.map((val, idx) => {
              return (
                <Button
                  key={idx}
                  className="w-1/5"
                  onClick={() => {
                    mutation.mutate(val.value);
                  }}
                >
                  {val.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const LightActions: FC<FeedActionProps> = ({ feedKey }) => {
  const { data, error, isLoading } = useFeedDetail(feedKey);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newVal: number) => {
      console.log('newVal', newVal);
      return updateFeed(feedKey, newVal);
    },
    onSuccess: () => {
      console.log('[ACTION] Mutate Success');
      queryClient.invalidateQueries({
        queryKey: ['feedDetail'],
      });
      queryClient.invalidateQueries({
        queryKey: ['feedHistory'],
      });
    },
    onError: (error) => {
      console.error('[ACTION] Mutate Error:', error);
    },
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const switchData = data as FeedInfo;
  const isOn = Number(switchData.last_value) == 1;

  return (
    <>
      {mutation.isPending ? (
        <div>Changing...</div>
      ) : (
        <div className="w-full flex justify-center">
          {/* <Label className="text-lg font-bold">Light Actions</Label> */}
          {/* <Label className="text-sm">Switch of {feedKey}</Label> */}
          <Toggle
            pressed={isOn}
            variant={'outline'}
            className="data-[state=on]:bg-primary data-[state=on]:text-white"
            onClick={() => {
              mutation.mutate(isOn ? 0 : 1);
            }}
          >
            {isOn ? 'Turn OFF' : 'Turn ON'}
          </Toggle>
        </div>
      )}
    </>
  );
};

export default DeviceActions;
