import { auth } from '@/auth';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import Link from 'next/link';
import UserSessionDisplay from '../user-session';
import SideBar from '../sideBar';
import Logo from '../logo';
import STRINGS from '@/lib/strings';
import NavMenu from '../nav-menu';
import PageTitle from './pageTitle';
import { Footer } from './footer';

const S = STRINGS.homepage;

export default async function SideBarLayout({ children }: { children?: ReactNode }) {
  const session = await auth();

  if (session) {
    return (
      <div className="relative grid grid-cols-12 min-w-full h-[100vh] ">
        <aside className="col-span-2 h-full border-r-2">
          <SideBar />
        </aside>
        <div className="col-span-10 w-full h-full relative">
          <div className="w-full h-[var(--navbar-height)] flex flex-row justify-center gap-4 items-center border-b-2 px-4 py-2">
            <PageTitle />
            <div className="absolute right-4 flex flex-row items-center gap-3 justify-center">
              <UserSessionDisplay session={session} />
            </div>
          </div>

          <div className="relative w-full h-[calc(100vh-var(--navbar-height))] overflow-y-scroll scroll-smooth p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-full min-h-[100vh] relative">
      <div
        className={`min-h-[var(--navbar-height)] sticky backdrop-blur-sm z-10 border top-0 flex flex-row justify-center gap-4 items-center bg-white/60 px-10 py-3`}
      >
        <div className="absolute left-20 flex gap-2 items-center justify-start">
          <Link href={'/'} className="flex gap-2 items-center justify-start">
            <Logo type="black" size={36} />
            <p className="mr-10 text-black text-2xl font-bold ">{S.title}</p>
          </Link>
          <NavMenu />
        </div>

        <div className="absolute right-20 flex gap-4 items-center justify-end">
          <Link href={'/login'}>
            <Button>{S.nav.login}</Button>
          </Link>
        </div>
        {/* <div className="absolute right-20 flex gap-4 items-center justify-end">
          <ProductSearch />
          <Cart />
          {session ? (
            <>
              <Button variant={'outline'} className="ml-2 p-2 rounded-full h-fit">
                <Bell size={16} />
              </Button>
              <UserSessionDisplay session={session} />
            </>
          ) : (
            <Link href={'/login'}>
              <Button>{S.nav.login}</Button>
            </Link>
          )}
        </div> */}
      </div>
      <div className={`min-w-full`}>{children}</div>
      <Footer />
    </div>
  );

  // return (
  //   <div className="relative grid grid-cols-12 min-w-full h-[100vh] ">
  //     <aside className="col-span-2 h-full border-r-2">
  //       <SideBar />
  //     </aside>
  //     <div className="col-span-10 w-full h-full relative">
  //       <div className="w-full h-[var(--navbar-height)] flex flex-row justify-center gap-4 items-center border-b-2 px-4 py-3">
  //         <PageTitle />
  //         <div className="absolute right-4 flex flex-row items-center gap-3 justify-center">
  //           {/* <UserSessionDisplay session={session} /> */}
  //           logged in
  //         </div>
  //       </div>

  //       <div className="w-full h-[calc(100vh-var(--navbar-height))] overflow-y-scroll scroll-smooth p-6">
  //         {children}
  //       </div>
  //     </div>
  //   </div>
  // );
}
