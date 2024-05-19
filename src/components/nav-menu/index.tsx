'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import React from 'react';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={'/services'} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Our Services</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact Us</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// const LinkGroup = ({ title, components }: { title: string; components: (MenuLink & { subLinks?: MenuLink[] })[] }) => (
//   <NavigationMenuItem>
//     <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
//     <NavigationMenuContent>
//       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[700px] max-h-[480px] overflow-y-auto">
//         {components.map((component, idx) => (
//           <ListItem
//             key={component.title + idx}
//             title={component.title}
//             href={component.href ? component.href : `${ROUTE_PATH}?category=${navTitleToSearchParam(component.title)}`}
//           >
//             {/* {component.description} */}
//             {component.subLinks?.map(({ title, href }, idx) => (
//               <Link
//                 className="self-center"
//                 href={href ? href : `${ROUTE_PATH}?category=${navTitleToSearchParam(title)}`}
//                 legacyBehavior
//                 passHref
//                 key={href ? href + idx : idx}
//               >
//                 <NavigationMenuLink
//                   className={[
//                     // navigationMenuTriggerStyle(),
//                     'flex-1 !w-full !items-start !justify-start py-1 px-2 hover:underline',
//                   ].join(' ')}
//                 >
//                   {title}
//                 </NavigationMenuLink>
//               </Link>
//             ))}
//           </ListItem>
//         ))}
//       </ul>
//     </NavigationMenuContent>
//   </NavigationMenuItem>
// );

// const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild className="!hover:bg-red-100">
//           <a
//             ref={ref}
//             className={cn(
//               'block select-none space-y-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//               className,
//             )}
//             {...props}
//           >
//             <div className="pl-2 text-xl font-bold leading-none">{title}</div>
//             <Separator />
//             <div className="flex flex-col gap-4 mt-4 w-full ">{children}</div>
//             {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p> */}
//           </a>
//         </NavigationMenuLink>
//       </li>
//     );
//   },
// );
// ListItem.displayName = 'ListItem';

export default NavMenu;
