import { Hono } from "hono";
import {zValidator} from '@hono/zod-validator'
import { loginSchema } from "../schemas";
import {registerSchema} from "../schemas"
import { createAdminClient } from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {deleteCookie, setCookie} from "hono/cookie"
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/sessionMiddleware";

const app = new Hono()

    .get("/current",sessionMiddleware, (c)=> {
        const user = c.get("user");
        return c.json({data: user})
    })

    .post("/login",
        zValidator("json", loginSchema),
        async (c)=> {
            const {email,password} = c.req.valid("json");

            const {account} = await createAdminClient();

            const session = await account.createEmailPasswordSession(
                email,
                password
            );

            setCookie(c,AUTH_COOKIE , session.secret,{
                path: "/",
                httpOnly:true,
                sameSite: "strict",
                secure:true,
                maxAge: 60*60*24*30
            });

            console.log({email,password})
            return c.json({success: true})
        }
    )

    .post("/register",
        zValidator("json", registerSchema),
        async (c)=> {
            const {name,email,password} = c.req.valid("json");
            const {account} = await createAdminClient();
            const user= await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            const session = await account.createEmailPasswordSession(
                email,
                password
            );

            setCookie(c,AUTH_COOKIE , session.secret,{
                path: "/",
                httpOnly:true,
                sameSite: "strict",
                secure:true,
                maxAge: 60*60*24*30
            });

            console.log({name,email,password})

            return c.json({data: user})
        }   
    )

    .post("/logout", (c) => {
        deleteCookie(c, AUTH_COOKIE);
        return c.json({success: true});
    })

export default app;


