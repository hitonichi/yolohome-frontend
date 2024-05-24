export interface Route {
  label: string;
  icon: string;
  href: string;
}

export const getPageTitleByRoute = (route: string) => {
  const res = [...ROUTES.base, ...ROUTES.userBase].find((r) => r.href == route);
  return res ? res.label : 'Unknown route';
};

const ROUTES: Record<string, Route[]> = {
  base: [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      href: '/dashboard',
    },
    {
      label: 'Devices',
      icon: 'sqrGantt',
      href: '/dashboard/devices',
    },
    {
      label: 'Statistics',
      icon: 'statistic',
      href: '/dashboard/statistics',
    },
  ],
  userBase: [
    {
      label: 'Profile',
      icon: 'profile',
      href: '/profile',
    },
    {
      label: 'Settings',
      icon: 'settings',
      href: '/settings',
    },
  ],
};

export default ROUTES;
