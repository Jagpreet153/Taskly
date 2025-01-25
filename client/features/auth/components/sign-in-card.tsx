"use client";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { Card,CardContent,CardHeader,CardTitle,CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { DottedSeperator } from '@/components/ui/dotted-seperator'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {z} from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem,FormMessage } from "@/components/ui/form";
import {loginSchema} from '../schemas'
import { useLogin } from "../api/use-login";

export const SigninCard = () => {

    const {mutate} =useLogin()

    const form=useForm<z.infer<typeof loginSchema>>({
           resolver:zodResolver(loginSchema),
           defaultValues:{
               email:"",
               password:""
           }
       })
   
       const onSubmit = (values:z.infer<typeof loginSchema>)=>{
           mutate({json: values})
       }
return(
        <Card className="w-full h-full md:w-[487px] border-none shadow-none p-4"> 
           <CardHeader className="flex items-center justify-center p-7 text-center">
                    <CardTitle className="text-3xl p-4"> 
                     Welcome Back!  
                </CardTitle>
           </CardHeader>
           <div className="px-7">
                <DottedSeperator/>
            </div>
                <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
                        <FormField
                        name="email"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    type="email"
                                    placeholder="Enter Email address"
                                    disabled={false}
                                    />
                                </FormControl>
                                <FormMessage {...field}/>
                            </FormItem>
                            
                        )}/>
                        
                        <FormField
                        name="password"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    type="password"
                                    placeholder="Enter password"
                                    disabled={false}
                                    />
                                </FormControl>
                                <FormMessage {...field}/>
                            </FormItem>
                            
                        )}/>
                        <Button size="lg" variant="primary" className="w-full my-2">Log in</Button>
                        <div className="py-3">
                            <DottedSeperator/>
                        </div>

                        <CardContent className="flex flex-col p-[-4rem] gap-2">
                            <Button className="w-full" size="lg" variant="secondary" disabled={false} >
                                <FaGithub className="mr-2 size-5"/>
                                Continue with Github
                            </Button> 
                            <Button className="w-full" size="lg" variant="secondary" disabled={false} >
                                <FcGoogle className="mr-2 size-5"/>
                                Continue with Google
                            </Button>   
                        </CardContent>
                        
                    </form>
                    <CardContent className="flex p-4 justify-center ">
                        <CardDescription>
                            Don&apos;t have an account?
                            <Link href="/signup">
                                <span className="text-blue-600">&nbsp; Signup</span>
                            </Link>
                        </CardDescription>
                    </CardContent>
                    </Form>
                </CardContent>
        </Card>
    )
}