"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useSidebar } from "@/store/use-sidebar";


export const Toggle = () => {
    const {
        collapsed,
        onCollapse,
        onExpand
    } = useSidebar(state => state);

    const label = collapsed ? "Expand" : "Collapse";
    return (
        <div>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint asChild side="right" label={label}>
                        <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items items-center w-full">
                    <p className="font-semibold text-primary">
                        For you
                    </p>
                    <Hint label={label} asChild side="right">
                        <Button
                            onClick={onCollapse}
                            className="h-auto p-2 ml-auto"
                            variant="ghost"
                        >
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </div>
    )
}