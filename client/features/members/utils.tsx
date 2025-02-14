import { Databases, Query , type Database} from "node-appwrite"
import {DATABASE_ID , MEMBERS_ID} from "@/config"

    interface GetMeberProps {
        databases: Databases,
        workspaceId: string,
        userID: string,
    }

    export const getMembers = async ({databases,workspaceId,userID}: GetMeberProps) => {
        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [
                Query.equal("workspaceId",workspaceId),
                Query.equal("userId",userID)
            ]
        );
        return members.documents[0];
    }
    
