import { useQuery } from '@tanstack/react-query';
import { FeedData } from '../types/feed';
import { getFeedHistory } from '../services/feed';

export const useFeedHistory = (key: string) => {
  console.log('[useFeedDetail] key', key);

  return useQuery<FeedData[]>({
    queryKey: ['feedHistory', key],
    queryFn: (q) => getFeedHistory(q.queryKey as unknown as string[]),
    refetchInterval: 600000,
  });
};
