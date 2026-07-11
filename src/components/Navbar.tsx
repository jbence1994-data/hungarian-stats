import { Link, useLocation } from 'react-router';

import ModeToggle from '@/components/ModeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

const linkClass = (active: boolean) =>
  cn(
    'hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent',
    active && 'font-bold',
  );

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold text-foreground">
          Hungarian Stats
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link to="/" />}
                  className={linkClass(pathname === '/')}
                >
                  Overview
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    'hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent',
                    (pathname === '/inflation-rate' || pathname === '/huf-interest-rate') &&
                      'font-bold',
                  )}
                >
                  Economy
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-48">
                  <NavigationMenuLink
                    render={<Link to="/inflation-rate" />}
                    className={linkClass(pathname === '/inflation-rate')}
                  >
                    Inflation Rate
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    render={<Link to="/huf-interest-rate" />}
                    className={linkClass(pathname === '/huf-interest-rate')}
                  >
                    HUF Interest Rate
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
