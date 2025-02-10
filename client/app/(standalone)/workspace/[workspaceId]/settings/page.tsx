import { redirect } from 'next/navigation';
import { getCurrent } from '@/features/auth/actions';

interface WorkspaceIdSettingPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdSettingPage = async(  {params}: WorkspaceIdSettingPageProps) => {
    const {workspaceId} = params;
    const user = getCurrent();
    if(!user){
        redirect("/login");
    }
    return (
        <div>
            <h1>WorkspaceIdSettingPage</h1>
        </div>
    );
}
    


export default WorkspaceIdSettingPage;