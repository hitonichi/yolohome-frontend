import { updateFeed } from '@/app/services/feed';
import { FC } from 'react';
import { FeedActionProps } from '.';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toggle } from '@/components/ui/toggle';
import { FeedInfo } from '@/app/types/feed';

const LightActions: FC<FeedActionProps> = ({ feedKey }) => {
  const { data, error, isLoading } = useFeedDetail(feedKey);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newVal: number) => {
      // console.log('newVal', newVal);
      return updateFeed(feedKey, newVal);
    },
    onSuccess: () => {
      // console.log('[ACTION] Mutate Success');
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

export default LightActions;
