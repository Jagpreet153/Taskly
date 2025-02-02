import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useRouter } from 'next/navigation'
import { Route } from 'lucide-react'
import { toast } from 'sonner'
type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout= () => {
    const Router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error>
        ({
            mutationFn: async(): Promise<ResponseType> => {
                const response = await client.api.auth.logout["$post"]();
                if(!response.ok)
                {
                    throw new Error("Failed to logout");
                }
                return await response.json() 
            },

            
            onSuccess: () => {
                toast.success("Logout successful");
                Router.refresh();
                queryClient.invalidateQueries({queryKey: "current"});
            },
            onError:() => {
                toast.error("Logout failed");
            }

        })
        return mutation;
}