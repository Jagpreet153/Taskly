import { useMutation } from '@tanstack/react-query'
import { InferRequestType,InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useQueryClient } from '@tanstack/react-query'
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"],200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>

export const useResetInviteCode= () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType>
        ({
            mutationFn: async( param ): Promise<ResponseType> => {
                const response = await client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"](param);

                if(!response.ok){
                    throw new Error("Failed to reset invite code");
                }
                return await response.json() 
            },
            onSuccess: ({data}) => {
                toast.success("Invite Code reset successfully");
                queryClient.invalidateQueries({queryKey: ["workspaces"]});
                queryClient.invalidateQueries({queryKey: ["workspaces" , data.$id]});
            },

            onError:() => {
                toast.error("Failed to reset invite code");
            
            }

        })
        return mutation;
}