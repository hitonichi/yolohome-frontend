import { Label } from '@/components/ui/label';
import { FC } from 'react';

const DetailEntry: FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="w-full grid grid-cols-3 gap-2">
    <Label className="col-span-1 font-semibold text-left">{title}:</Label>
    <Label className="col-span-2 text-right">{value}</Label>
  </div>
);

export default DetailEntry;
