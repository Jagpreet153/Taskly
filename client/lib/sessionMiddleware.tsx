import "server-only"
import { getCookie } from "hono/cookie"
import {createMiddleware} from "hono/factory"

import { AUTH_COOKIE } from "@/features/auth/constants"
import {Account,Databases,Client,Models,Storage , 
    type Account as AccountType,
    type Users as UsersType,
    type Databases as DatabasesType,
    type Storage as StorageType,
        } from "node-appwrite"

        type AdditionalTypes = {
            Variables:{
                account: AccountType,
            storage: StorageType,
            databases: DatabasesType,
            users: UsersType,
            user: Models.User<Models.Preferences>
            }
        }

export const sessionMiddleware = createMiddleware<AdditionalTypes>(
    async (c,next)=> {

   

        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            const session = getCookie(c,AUTH_COOKIE);

            if(!session)
            {
                return c.json({error: "Unauthorized"},401)
            }
            client.setSession(session);

            const account = new Account(client);
            const storage = new Storage(client);
            const databases = new Databases(client);
            const user= await account.get();

            c.set("account",account);
            c.set("storage",storage);
            c.set("databases",databases);
            c.set("user",user);

            await next();
    }
)