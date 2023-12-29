"use client"

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface UserItemProps {
    username: string,
    imageUrl: string,
    isLive?: boolean
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
    const pathname = usePathname();

    const collapsed = useSidebar(state => state.collapsed);

    const href = `/${username}`;
    const isActive = pathname === href;
    // find out what asChild property is for?
    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "w-full h-12",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent"
            )}
        >
            

        </Button>
    )
}