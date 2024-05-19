import DashboardSensors from '@/components/dashboard/dashboardSensor';
import { Label } from '@/components/ui/label';
import { Icon } from '@radix-ui/react-select';
import { Expand } from 'lucide-react';
import { FC } from 'react';

export default function DashboardPage() {
  return (
    <div className="relative w-full h-full grid grid-cols-12 grid-rows-1 gap-4">
      <div className="grid grid-rows-6 row-span-1 col-span-8 gap-4">
        <DashboardCard title="Quick actions" className="row-span-4"></DashboardCard>
        <DashboardCard title="History" className="row-span-2"></DashboardCard>
      </div>
      <div className="grid grid-rows-6 row-span-1 col-span-4 gap-4">
        <DashboardCard title="Sensors" className="row-span-3">
          <DashboardSensors />
        </DashboardCard>
        <DashboardCard title="Graphs" className="row-span-3"></DashboardCard>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};
const DashboardCard: FC<DashboardCardProps> = ({ title, description, className, children }) => {
  const twClasses =
    'h-full flex flex-col outline outline-primary/20 outline-1 hover:bg-primary/5 hover:shadow-lg hover:outline-none w-full h-full rounded p-2';
  return (
    <div className={[twClasses, className].join(' ')}>
      <div className="w-full flex justify-between mb-2">
        <Label className="font-bold text-md">{title}</Label>
        <div className="cursor-pointer bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded-full flex justify-center items-center">
          <Expand size={16} className="text-gray-500" />
        </div>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
};
