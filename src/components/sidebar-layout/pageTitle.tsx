'use client';

import { getPageTitleByRoute, isSubRoute } from '@/lib/routes';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

const PageTitle = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (isSubRoute(pathname))
    return (
      <div className="flex-1 flex justify-start items-center gap-2">
        <Button
          variant="link"
          className="px-2"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeft className="text-primary" />
        </Button>
        <p className="text-primary text-2xl font-bold">Device Details</p>
      </div>
    );

  return <p className="text-primary text-2xl font-bold absolute left-6">{getPageTitleByRoute(pathname)}</p>;
};

export default PageTitle;
