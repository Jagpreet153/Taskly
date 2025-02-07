import { zValidator } from '@hono/zod-validator';
import {Hono} from 'hono';
import {createWorkspaceSchema} from '@/features/workspaces/schemas';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID , WORKSPACES_ID,MEMBERS_ID } from '@/config';
import { IMAGES_BUCKET_ID } from '@/config';
import { Query , ID} from 'node-appwrite';
import { MemberRole } from '@/features/members/types';
import { generateInviteCode } from '@/lib/utils';
const app = new Hono()

.get('/',sessionMiddleware,async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const members= await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId",user.$id)]
    );

    if(members.total===0){
        return c.json({data: {documents: []} , total:0 });
    }

    const workspaceIds = members.documents.map((member)=>member.workspaceId);

    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.contains("$id",workspaceIds),
            Query.orderDesc("$createdAt"),
        ]
    );
    return c.json({data: workspaces});
})

.post('/',zValidator("form",createWorkspaceSchema),sessionMiddleware,async (c) => {
    const databases=c
    .get("databases");
    const user=c.get("user");
    const {name,image}  = c.req.valid("form");
    const storage = c.get("storage");

    let uploadedImageUrl: string | undefined;

    if(image instanceof File){
        const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image
        );


        const arrayBuffer = await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id,
        );
            
            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
        }
       
    const workspaces = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
            name,
            userId: user.$id,
            imageUrl: uploadedImageUrl,
            
        },
    );

    await databases.createDocument(
        DATABASE_ID,
        MEMBERS_ID,
        ID.unique(),
        {
            userId: user.$id,
            workspaceId: workspaces.$id,
            role: MemberRole.ADMIN,
            inviteCode: generateInviteCode(7)
        },

    );
    return c.json({data: workspaces});
})
export default app;