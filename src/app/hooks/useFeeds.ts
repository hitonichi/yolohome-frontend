import { FeedInfo } from '@/app/types/feed';
import { useQuery } from '@tanstack/react-query';
import { getFeeds } from '../services/feed';

export const useFeeds = () => {
  return useQuery<FeedInfo[]>({
    queryKey: ['feeds'],
    queryFn: () => getFeeds(),
    refetchInterval: 300000,
  });
};
