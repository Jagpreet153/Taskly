"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrent } from "../features/auth/api/use-current";
export default function Home() {
  const router = useRouter();
  router.push("/signin");
  const {data,isLoading} = useCurrent();
  
  useEffect(()=>{
    if(data && !isLoading){
      router.push("/signin")
    }
  },[data])

  return (
    <div className="">
          Only authenticated users can access this page 
    </div>
  );
}
