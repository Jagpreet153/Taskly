import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspacesForm } from "@/features/workspaces/components/createWorkspacesForm";
import { redirect } from "next/navigation";
export default async function Home() {

  const user =await getCurrent();
  console.log(user)
  if(!user)
    redirect("/signin");
  return (
    <div className="bg-neutral-500 p-4 h-full">
         <CreateWorkspacesForm/>
    </div>
  );
}
