'use client';

import SideNav from '@/components/sidenav';
import ROUTES, { Route } from '@/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../icon';

const SideBar = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(true);

  const isCurrentRoute = (route: string) => {
    if (!pathname || !route) return false;
    return pathname == route;
    // return pathname.split('/')[1] == route.split('/')[1];
  };

  const renderItems = (routes: Route[]) => {
    return (
      <>
        {routes.map(({ label, href, icon }) => (
          <SideNav.Item
            key={label}
            label={isHidden ? '' : label}
            icon={icon}
            href={href}
            as={Link}
            onClick={() => {
              console.log(`${label} clicked`);
            }}
            selected={isCurrentRoute(href)}
          />
        ))}
      </>
    );
  };

  const chevron = isHidden ? 'chevronsRight' : 'chevronsLeft';

  return (
    <aside className={
      clsx(
        "h-full border-r-2 relative",
        isHidden ? 'w-max' : 'col-span-2'
      )
    }>
      <SideNav className='h-max'>
        <>
          <>
            <SideNav.Header isHidden={isHidden} />
            <Separator className="bg-muted-foreground mix-blend-color-burn h-[2px] my-2" />
          </>
          <div className="h-full flex flex-col gap-2 justify-start">
            {/* In the future, this list of route should be fetched from an endpoint (access control service) */}
            {renderItems(ROUTES.base)}
            <Separator className="bg-muted-foreground mix-blend-color-burn h-[2px] my-1" />
            {/* This one stays local, since all user should have these routes */}
            {renderItems(ROUTES.userBase)}
          </div>
          <>
            {/* <SideNav.Footer /> */}
          </>
        </>

        <div
          className={
            clsx(
              "flex w-full items-center",
              isHidden ? 'justify-center' : 'justify-end mr-8',

            )
          }
        >

          <SideNav.Item
            key={'close'}
            icon={
              isHidden ? 'chevronsRight' : 'chevronsLeft'
            }
            onClick={() => setIsHidden(!isHidden)}
          />
        </div>
      </SideNav>
    </aside>
  );
};

export default SideBar;
