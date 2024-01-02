import { db } from "./db";

interface IdentityFields {
    fieldName: "username" | "id" | "externalId"
}

interface GetUserByFieldProps extends IdentityFields {
    fieldValue: string
}

export const getUserByField = async ({ fieldName, fieldValue }: GetUserByFieldProps) => {
    // IMPROVE : search on giving dynamic query keys
    let user;
    if (fieldName === "username") {
        user = await db.user.findUnique({
            where: {
                username: fieldValue
            }
        });
    }
    else if (fieldName === "id") {
        user = await db.user.findUnique({
            where: {
                id: fieldValue
            }
        });
    }
    else if (fieldName === "externalId") {
        user = await db.user.findUnique({
            where: {
                externalUserId: fieldValue
            }
        });
    }
    else {
        throw new Error("invalid field")
    }
    return user;
}