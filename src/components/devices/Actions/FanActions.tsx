import { updateFeed } from '@/app/services/feed';
import { FAN_POWERS } from '@/app/types/feed';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FC } from 'react';
import { FeedActionProps } from '.';
import { useFeedDetail } from '@/app/hooks/useFeedDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export default FanActions;
