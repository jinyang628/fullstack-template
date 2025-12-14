'use client';

import { useState } from 'react';

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

import ThemeToggle from '@/components/shared/theme/toggle';
import { Button } from '@/components/ui/button';

import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileHamburgerButton = (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? (
        <Cross1Icon className="size-5" />
      ) : (
        <HamburgerMenuIcon className="size-5" />
      )}
    </Button>
  );

  const mobileMenu = (
    <nav className="bg-background border-border absolute top-full right-0 left-0 z-50 mt-2 rounded-md border shadow-lg md:hidden">
      <div className="flex flex-col gap-1 p-2">
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-start"
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href={item.href}>{item.label}</a>
          </Button>
        ))}
      </div>
    </nav>
  );

  return (
    <header className="relative flex w-full items-center justify-between gap-4">
      <nav className="hidden items-center gap-4 md:flex">
        {NAV_ITEMS.map((item) => (
          <Button key={item.href} variant="ghost" asChild>
            <a href={item.href}>{item.label}</a>
          </Button>
        ))}
      </nav>
      {mobileHamburgerButton}
      {isMobileMenuOpen && mobileMenu}
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
