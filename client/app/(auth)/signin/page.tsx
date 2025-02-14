import {SigninCard} from "@/features/auth/components/sign-in-card";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
const SignIn = async()=>{
    const user =await getCurrent();
    if(user){
        redirect("/")
    }
    return (
             <SigninCard/>     
    )
}

export default SignIn;