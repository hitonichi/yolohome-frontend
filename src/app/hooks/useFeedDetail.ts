import { useQuery } from '@tanstack/react-query';
import { FeedInfo } from '../types/feed';
import { getFeedDetail } from '../services/feed';

export const useFeedDetail = (key: string) => {
  return useQuery<FeedInfo>({
    queryKey: ['feedDetail', key],
    queryFn: (q) => getFeedDetail(q.queryKey as unknown as string[]),
    refetchInterval: 600000,
  });
};
