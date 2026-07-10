import { Link, useLocation } from 'react-router'

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
        <Link to="/" className="text-lg font-semibold text-nova-600 dark:text-nova-400">
          Hungarian Stats
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.to}>
                <NavigationMenuLink
                  render={<Link to={link.to} />}
                  className={cn(pathname === link.to && 'bg-muted/50')}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
