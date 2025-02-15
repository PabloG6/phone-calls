"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
function useBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  return paths.map((path, index) => ({
    href: "/" + paths.slice(0, index + 1).join("/"),
    label: path.charAt(0).toUpperCase() + path.slice(1),
  }));
}
export default function DashboardHeader() {
  const breadcrumbs = useBreadcrumbs();
  const [isOpen, setIsOpen] = useState(false);

  const visibleCrumbs =
    breadcrumbs.length > 3
      ? [breadcrumbs[0], breadcrumbs[breadcrumbs.length - 1]]
      : breadcrumbs;

  const hiddenCrumbs = breadcrumbs.length > 3 ? breadcrumbs.slice(1, -1) : [];
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {visibleCrumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.href}>
              {index === visibleCrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                </>
              )}
              {index < visibleCrumbs.length ? <BreadcrumbSeparator /> : <></>}
            </BreadcrumbItem>
          ))}
          {hiddenCrumbs.length > 0 && (
            <BreadcrumbItem>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="flex items-center">
                  ...
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenCrumbs.map((crumb) => (
                    <DropdownMenuItem key={crumb.href} asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
