import { getSelf } from "./auth-service";
import { db } from "./db";


export const getRecommended = async () => {
    // simple recommendation service 
    // a point to improve drastically
    const users = await db.user.findMany({
        orderBy:{
            createdAt:"desc"
        }
    });
    return users;
}