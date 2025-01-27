"use server";
import { cookies } from "next/headers";
import { Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";
import { Account } from "node-appwrite";
export const  getCurrent = async() => {
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

    const account= new Account(client);
    return await  account.get();
    }

    catch
    {
        return null;
    }
    
}