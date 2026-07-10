import { Link, useLocation } from 'react-router'

import { ModeToggle } from '@/components/ModeToggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'

const links = [
  { label: 'Overview', to: '/' },
  { label: 'Population', to: '/population' },
  { label: 'Economy', to: '/economy' },
]

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold text-foreground">
          Hungarian Stats
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink
                    render={<Link to={link.to} />}
                    className={cn(
                      'hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent',
                      pathname === link.to && 'font-bold',
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
