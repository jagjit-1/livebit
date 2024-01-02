import { db } from "./db";
import { getSelf } from "./auth-service";
import { getUserByField } from "./user-service";

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf();
        const otherUser = await getUserByField({ fieldName: "id", fieldValue: id });

        if (!otherUser) throw new Error("invalid id");

        if (otherUser.id === self.id) return false;

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        });

        return !!existingBlock;

    } catch (error) {
        return false;
    }
};

export const blockUser = async (id: string) => {
    const self = await getSelf();
    if (self.id === id) throw new Error("invalid action");

    const otherUser = await getUserByField({ fieldName: "id", fieldValue: id });
    if (!otherUser) throw new Error("invalid id");

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    });

    if (existingBlock) throw new Error("Already blocked");

    const newBlock = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true
        }
    });

    return newBlock;
}

export const unblockUser = async (id: string) => {
    const self = await getSelf();
    if (self.id === id) throw new Error("invalid action");

    const otherUser = await getUserByField({ fieldName: "id", fieldValue: id });
    if (!otherUser) throw new Error("invalid id");

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    });

    if (!existingBlock) throw new Error("not blocked");

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocked: true
        }
    });

    return unblock;
}