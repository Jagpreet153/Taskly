import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";
export default async function Home() {

  const user =await getCurrent();
  console.log(user)
  if(!user)
    redirect("/signin");
  return (
    <div className="">
         <UserButton/>
    </div>
  );
}
