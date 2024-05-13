"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({user}: SiderbarProps) => {
  const pathname = usePathname();
  return <section className="sidebar">
    <nav className="flex flex-col gap-4">
      <Link href="/dashboard" className="mb-12 flex cursor-pointer items-center gap-2">
        <Image src="/icons/logo.svg" width={34} height={34} alt="HorizonLogo" className="size-[24px] xl:size-14" />
        <h1 className="sidebar-logo">Horizon</h1>
      </Link>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
        return (
          <Link href={link.route} key={link.route} className={cn("sidebar-link", isActive && "bg-bank-gradient")}>
            <div className="relative size-6">
              <Image src={link.imgURL} fill alt={link.label} className={cn({"brightness-[3] invert-0": isActive})} />
            </div>
            <p className={cn("sidebar-label", { "!text-white": isActive })}>{link.label}</p>
          </Link>
        )
      })}
    </nav>
  </section>;
};

export default Sidebar;
