'use client';

import { useFeeds } from '@/app/hooks/useFeeds';
import { useMounted } from '@/app/hooks/useMounted';
import { FeedInfo } from '@/app/types/feed';
import Chart from '@/components/Chart';
import DeviceCard from '@/components/DeviceCard';
import DeviceDetails from '@/components/devices/DeviceDetails';
import DeviceHistory from '@/components/devices/DeviceHistory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function DevicesPage() {
  const mounted = useMounted();
  const { data, error, isLoading } = useFeeds();
  const [currentFeed, setCurrentFeed] = useState<FeedInfo | null>(null);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const feeds = data as FeedInfo[];

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-2">
      {feeds.map((feed) => (
        <DeviceCard feed={feed} setCurrentFeed={setCurrentFeed} key={feed.id} />
      ))}
    </div>
  );
}
