import { CreateWorkspacesForm } from "@/features/workspaces/components/createWorkspacesForm";
import {redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
 const WorkspaceCreatePage = async () => {
    const user = await getCurrent();
    if(!user)
    redirect("/signin");
    return (
        <div className="w-full lg:max-w-xl">
            <CreateWorkspacesForm />
        </div>
    );
}
export default WorkspaceCreatePage;