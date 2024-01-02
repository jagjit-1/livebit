
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Clapperboard, LogOut } from "lucide-react";


export const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center justify-end ml-4 lg:ml-0 gap-x-2">
            <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href="/">
                    <LogOut className="h-5 w-5 mr-2" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}