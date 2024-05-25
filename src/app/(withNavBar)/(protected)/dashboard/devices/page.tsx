'use client';

import { useFeeds } from '@/app/hooks/useFeeds';
import { FeedInfo } from '@/app/types/feed';
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
  const { data, error, isLoading } = useFeeds();
  const [currentFeed, setCurrentFeed] = useState<FeedInfo | null>(null);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const feeds = data as FeedInfo[];

  return (
    <Sheet>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-2">
        {feeds.map((feed) => (
          <DeviceCard feed={feed} setCurrentFeed={setCurrentFeed} key={feed.id} />
        ))}
      </div>
      <SheetContent>
        {currentFeed ? (
          <>
            <SheetHeader>
              <SheetTitle>{currentFeed.name}</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="details" className="w-full mt-2">
              <TabsList className="w-full mb-2">
                <TabsTrigger value="details" className="w-full">
                  Details
                </TabsTrigger>
                <TabsTrigger value="history" className="w-full">
                  History
                </TabsTrigger>
                {/* <TabsTrigger value='Edit'>Edit</TabsTrigger> */}
              </TabsList>
              <TabsContent value="details">
                <DeviceDetails feed={currentFeed} />
              </TabsContent>
              <TabsContent value="history">
                <DeviceHistory feed={currentFeed} />
              </TabsContent>
            </Tabs>
            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </>
        ) : (
          <SheetHeader>
            <SheetTitle>Details</SheetTitle>
            <SheetDescription>No device selected.</SheetDescription>
          </SheetHeader>
        )}
      </SheetContent>
    </Sheet>
  );
}
