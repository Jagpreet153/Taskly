import { redirect } from 'next/navigation';
import { getCurrent } from '@/features/auth/queries';
import { EditWorkspaceForm } from '@/features/workspaces/components/editWorkspaceForm';
import { getWorkspace } from "@/features/workspaces/queries";

interface WorkspaceIdSettingPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdSettingPage = async( {params}: WorkspaceIdSettingPageProps ) => {
    const user = await getCurrent();
    if(!user)
        redirect("/signin");
    
    const initialValues = await getWorkspace({workspaceId: params.workspaceId});
    if(!initialValues){
        redirect(`/workspace/${params.workspaceId}`);
    }
    return (
        <div className='w-full lg:max-w-xl'>
           <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    );
}
    
export default WorkspaceIdSettingPage;