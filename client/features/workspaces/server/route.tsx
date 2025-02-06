import { zValidator } from '@hono/zod-validator';
import {Hono} from 'hono';
import {createWorkspaceSchema} from '@/features/workspaces/schemas';
import { sessionMiddleware } from '@/lib/sessionMiddleware';
import { DATABASE_ID , WORKSPACES_ID } from '@/config';
import { IMAGES_BUCKET_ID } from '@/config';
import { ID } from 'appwrite';

const app = new Hono()

.get('/',sessionMiddleware,async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID
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
            imageUrl: uploadedImageUrl
        },
    );
    return c.json({data: workspaces});

})
export default app;