"use client";

import { Button } from "../ui/button";


interface ActionsProps {
    isFollowing: boolean;
    isHost: boolean;
    hostIdentity: string;
}

export const Actions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
    return (
        <Button>
            Actions
        </Button>
    )
}