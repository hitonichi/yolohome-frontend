'use client';

import { Boxes } from 'lucide-react';
import Logo from '../logo';
import STRINGS from '@/lib/strings';
import { FC } from 'react';

interface ISideNavHeaderProps {
  isHidden?: boolean;
}

const SideNavHeader: FC<ISideNavHeaderProps> = ({ isHidden }) => {
  return (
    <div className="relative w-full flex pl-2 py-3 items-center justify-start gap-2 text-primary">
      {/* <Boxes size={48} /> */}
      <Logo size={36} />
      {
        !isHidden && (
          <p className="text-2xl font-bold">{STRINGS.appName}</p>
        )
      }
    </div>
  );
};

export default SideNavHeader;
