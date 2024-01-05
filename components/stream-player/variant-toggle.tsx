"use client"

import { Users, MessageSquare } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar(state => state);

    const isChatVariant = variant === ChatVariant.CHAT;

    const Icon = isChatVariant ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChatVariant ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    }

    const label = isChatVariant ? "Community" : "Go back to chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    )
}