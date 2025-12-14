'use client';

import Link from 'next/link';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import ThemeToggle from '@/components/shared/theme/toggle';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu">
              <HamburgerMenuIcon className="size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent side="left" className="w-3/4 sm:w-80">
            <nav className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <DrawerClose key={item.href} asChild>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </DrawerClose>
              ))}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>

      <ThemeToggle />
    </header>
  );
}
