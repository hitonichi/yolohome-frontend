import DeviceDetails from '@/components/devices/DeviceDetails';
import DeviceHistory from '@/components/devices/DeviceHistory';

export default function Page({ params }: { params: { feedKey: string } }) {
  return (
    <div className="w-full h-full grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <DeviceDetails feedKey={params.feedKey} />
      </div>
      <div className="col-span-8">
        <DeviceHistory feedKey={params.feedKey} />
      </div>
    </div>
  );
}
