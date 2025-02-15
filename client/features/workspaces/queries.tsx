"use server";
import { cookies } from "next/headers";
import { Client,Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { Account,Databases } from "node-appwrite";
import { Workspace } from "./types";
import { getMembers } from "@/features/members/utils";
import { createSessionClient } from "@/lib/appwrite";

export const  getWorkspaces = async() => {

    try{
        const { database, account } = await createSessionClient();
       
    const user = await account.get(); 
    const members= await database.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId",user.$id)]
    );

    if(members.total===0){
        return {documents: [] , total:0} ;
    }

    const workspaceIds = members.documents.map((member)=>member.workspaceId);

    const workspaces = await database.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.contains("$id",workspaceIds),
            Query.orderDesc("$createdAt"),
        ]
    );
    return workspaces;
    }

    catch
    {
        return {documents: [] , total:0 };
    }
    
}


interface GetWorkspaceProps {
    workspaceId: string;
}


export const  getWorkspace = async({workspaceId}: GetWorkspaceProps) => {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
    try{
        const sessionCookie = await cookies();
    const session= sessionCookie.get(AUTH_COOKIE);
    if(!session)
    {
        return null;
    }

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get(); 
    const members= await getMembers(
        { databases, workspaceId , userID: user.$id}
    );

    if(!members){
        return null ;
    }


    const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
       workspaceId
    );
    return workspace;
    }

    catch
    {
        return null;
    }
    
}