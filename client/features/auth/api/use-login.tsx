import { useMutation } from '@tanstack/react-query'
import { InferRequestType,InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import {toast} from "sonner"

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin= () => {
    const Router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType>
        ({
            mutationFn: async({ json }): Promise<ResponseType> => {
                const response = await client.api.auth.login["$post"]({ json });
                if(!response.ok)
                {
                    throw new Error("Failed to login");
                }
                return await response.json() 
                
            },
            onSuccess: () => {
                toast.success("Login successful");
                Router.refresh();
                queryClient.invalidateQueries({queryKey: "current"});
            },

            onError:() => {
                toast.error("Login failed");
            }

        })
        return mutation;
}