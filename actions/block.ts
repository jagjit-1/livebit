"use server"

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    // TODO: disconnect the blocked user from livestream
    // TODO: allow ability to kick a guest user
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);

    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`);

    return unblockedUser;
}