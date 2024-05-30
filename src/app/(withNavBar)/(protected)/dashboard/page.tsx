import { FeedInfo } from '@/app/types/feed';
import Logs from '@/components/dashboard/History';
import News from '@/components/dashboard/News';
import QuickActions from '@/components/dashboard/QuickActions';
import { Label } from '@/components/ui/label';
import { Expand } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

export default function DashboardPage() {
  return (
    <div className="relative w-full h-full grid grid-cols-12 grid-rows-1 gap-4">
      <div className="grid grid-rows-6 row-span-1 col-span-8 gap-4">
        <DashboardCard title="Quick actions" href="/dashboard/devices" className="row-span-4">
          <QuickActions />
        </DashboardCard>
        <DashboardCard title="History" className="row-span-2">
          <Logs />
        </DashboardCard>
      </div>
      <div className="grid grid-rows-12 row-span-1 col-span-4 gap-4">
        <DashboardCard title="News" className="row-span-12">
          <News />
        </DashboardCard>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
};
const DashboardCard: FC<DashboardCardProps> = ({ title, description, className, children, href }) => {
  const twClasses =
    'h-full flex flex-col outline outline-primary/20 outline-1 hover:bg-primary/5 hover:shadow-lg hover:outline-none w-full h-full rounded p-2';

  return (
    <div className={[twClasses, className].join(' ')}>
      <div className="w-full flex justify-between mt-1 mb-3">
        <Label className="font-bold text-md ml-2">{title}</Label>
        <div className="cursor-pointer bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded-full flex justify-center items-center">
          <Link href={href ?? ''}>
            <Expand size={16} className="text-gray-500" />
          </Link>
        </div>
      </div>
      <div className="relative flex-1  overflow-y-scroll no-scrollbar">{children}</div>
    </div>
  );
};
