"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavTrigger } from "./nav-trigger";
import { NavItem } from "./nav-item";
import { MegaMenu } from "./mega-menu";
import { NAV_ITEMS, NAV_MENUS, type NavItem as NavItemType, type NavMenuConfig } from "./nav-config";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((menuKey: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const handleMenuMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const mobileMenuItems = useMemo(() => {
    return (NAV_ITEMS as NavItemType[]).map((item) => {
      const menuKey = item.menuKey;
      const menu: NavMenuConfig | undefined = menuKey ? NAV_MENUS[menuKey] : undefined;
      return { item, menuKey, menu } as const;
    });
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    // allow mount before transition to visible
    requestAnimationFrame(() => setMobileVisible(true));
  }, []);

  const closeMobile = useCallback(() => {
    setMobileVisible(false);
    // wait for slide-out transition before unmount
    window.setTimeout(() => setMobileOpen(false), 220);
  }, []);

  const toggleMobileSection = useCallback((key: string) => {
    setMobileSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="bg-navbar-background w-full fixed top-0 left-0 right-0 z-50 border-b border-border">
      <div className="px-4 py-3 w-full flex items-center justify-center">
        <nav className="flex flex-row items-center justify-between w-full max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/assets/config/logo.png" 
              alt="Acogas Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation Items */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li 
                key={item.href}
                className="relative"
                onMouseEnter={() => item.menuKey && handleMouseEnter(item.menuKey)}
                onMouseLeave={handleMouseLeave}
              >
                {item.type === "trigger" && item.menuKey ? (
                  <>
                    <NavTrigger
                      label={item.label}
                      isActive={activeMenu === item.menuKey}
                      onMouseEnter={() => {}}
                    />
                    {/* Mega Menu positioned relative to trigger */}
                    <div onMouseEnter={handleMenuMouseEnter}>
                      <MegaMenu
                        config={NAV_MENUS[item.menuKey]}
                        isOpen={activeMenu === item.menuKey}
                      />
                    </div>
                  </>
                ) : (
                  <NavItem
                    label={item.label}
                    href={item.href}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contacto/" size="sm">
              Cotizar
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
            onClick={openMobile}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 transition-opacity duration-200",
              mobileVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={closeMobile}
          />

          {/* Panel */}
          <div
            className={cn(
              "absolute top-0 right-0 h-full w-[min(360px,85vw)] bg-navbar-background border-l border-border shadow-xl flex flex-col",
              "transform transition-transform duration-200 ease-out",
              mobileVisible ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <Link href="/" onClick={closeMobile} className="flex items-center gap-2">
                <Image src="/assets/config/logo.png" alt="Acogas Logo" width={110} height={36} className="h-9 w-auto" />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
                onClick={closeMobile}
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-2">
              {mobileMenuItems.map(({ item, menuKey, menu }) => {
                const isSectionOpen = !!(menuKey && mobileSections[menuKey]);

                if (item.type !== "trigger" || !menuKey || !menu) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="block px-3 py-3 rounded-md hover:bg-muted text-foreground font-medium"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.href} className="mb-1">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-3 rounded-md hover:bg-muted text-foreground font-medium"
                      onClick={() => toggleMobileSection(menuKey)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform", isSectionOpen && "rotate-180")} />
                    </button>

                    {/* Animated submenu (accordion) */}
                    <div
                      className={cn(
                        "grid overflow-hidden transition-all duration-300 ease-out",
                        isSectionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="min-h-0">
                        <div className={cn("pl-3 pr-2 pb-2 space-y-4", isSectionOpen ? "pt-2" : "pt-0")}>
                          {/* Parent link as first child */}
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            className="block px-3 py-2 rounded-md bg-muted/60 hover:bg-muted text-sm font-semibold text-primary"
                          >
                            {item.label}
                          </Link>

                          {/* Image card (optional) */}
                          {menu.image && (
                            <Link
                              href={menu.image.href}
                              onClick={closeMobile}
                              className="block rounded-lg overflow-hidden border border-border"
                            >
                              <div className="relative h-28 bg-muted">
                                <Image src={menu.image.src} alt={menu.image.alt} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 p-3 text-white">
                                  <div className="font-bold">{menu.image.title}</div>
                                  {menu.image.description && (
                                    <div className="text-xs text-white/80 line-clamp-1">{menu.image.description}</div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          )}

                          {/* Columns */}
                          {menu.columns.map((col, idx) => (
                            <div key={idx}>
                              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                                {col.title}
                              </div>
                              <div className="space-y-4">
                                {col.categories ? (
                                  col.categories.map((cat, ci) => (
                                    <div key={ci} className="space-y-2">
                                      <Link
                                        href={cat.href}
                                        onClick={closeMobile}
                                        className="block text-sm font-semibold text-primary hover:underline"
                                      >
                                        {cat.label}
                                      </Link>
                                      {cat.sections.map((sec, si) => (
                                        <div key={si} className="pl-2 text-xs font-medium text-muted-foreground">
                                          {sec.title}
                                        </div>
                                      ))}
                                    </div>
                                  ))
                                ) : (
                                  (col.items ?? []).map((link, li) => (
                                    <Link
                                      key={li}
                                      href={link.href}
                                      onClick={closeMobile}
                                      className="block px-3 py-2 rounded-md hover:bg-muted text-sm text-foreground"
                                    >
                                      <div className="font-medium">{link.label}</div>
                                      {link.description && (
                                        <div className="text-xs text-muted-foreground">{link.description}</div>
                                      )}
                                    </Link>
                                  ))
                                )}
                              </div>
                            </div>
                          ))}

                          {/* Main link */}
                          {menu.mainLink && (
                            <Link
                              href={menu.mainLink.href}
                              onClick={closeMobile}
                              className="inline-flex items-center text-sm text-primary font-semibold hover:underline"
                            >
                              {menu.mainLink.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border">
              <Button href="/contacto/" className="w-full">
                Cotizar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
