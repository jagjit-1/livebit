"use client"

import { toast } from "sonner";
import { startTransition, useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { Hint } from "@/components/hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";


interface CommunityItem {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}


export const CommunityItem = ({ hostName, viewerName, participantIdentity, participantName }: CommunityItem) => {
    const color = stringToColor(participantName || "");
    const [isPending, startTransition] = useTransition();

    const isSelf = viewerName === participantName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!isHost || isSelf || !participantName) return;

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={{ color: color }}>
                {participantName}
            </p>
            {!isSelf && isHost && (
                <Hint label="Block">
                    <Button
                        disabled={isPending}
                        onClick={handleBlock}
                        className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}
        </div>
    )
}