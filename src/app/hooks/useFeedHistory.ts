import { useQuery } from '@tanstack/react-query';
import { FeedData } from '../types/feed';
import { getFeedHistory } from '../services/feed';

export const useFeedHistory = (key: string, type?: string) => {
  let startTime = undefined;

  switch (type) {
    case 'month':
      startTime = new Date(Date.now() - 2592000000).toISOString();
      break;
    case 'week':
      startTime = new Date(Date.now() - 604800000).toISOString();
      break;
    case 'day':
      startTime = new Date(Date.now() - 86400000).toISOString();
      break;
    default:
      startTime = new Date(Date.now() - 3600000).toISOString();
      break;
  }

  console.log('startTime :>> ', startTime);

  return useQuery<FeedData[]>({
    queryKey: ['feedHistory', key],
    queryFn: (q) => getFeedHistory(q.queryKey as unknown as string[], startTime),
    refetchInterval: 600000,
  });
};
