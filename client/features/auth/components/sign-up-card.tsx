"use client";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { DottedSeperator } from "@/components/ui/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {registerSchema} from '../schemas'
import { Form,FormControl,FormField,FormItem,FormMessage } from "@/components/ui/form";
import { useRegister } from "../api/use-register";

const formSchema = z.object({
    name: z.string(),
    email: z.string().trim().min(1,"required").email(),
    password: z.string().min(1,"required").max(256)
});
export const SignupCard = () => {
    const {mutate} =useRegister()
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            name:"",
            password:""
        }
    })
    const onSubmit = (values:z.infer<typeof registerSchema>)=>{
             mutate({json: values})
    }
    
return(
        <Card className="h-auto md:w-[800px] border-none shadow-none p-4"> 
           <CardHeader className="flex items-center justify-center p-7 text-center">
                    <CardTitle className="p-4"> 
                        Sign Up  
                    </CardTitle>
                    <CardDescription>
                        By Signing up, you agree to our {" "}
                        <Link href="/policy">
                            <span className="text-blue-600">Terms and Conditions</span>
                        </Link>
                    </CardDescription>
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
                        name="name"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    type="text"
                                    placeholder="Enter your name"
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
                        <Button size="lg" variant="primary" className="w-full my-2">Sign Up</Button>                        
                    </form>
                    <div className="p-3">
                        <DottedSeperator/>
                    </div>  
                    <CardContent className="flex p-4 justify-center ">
                        <CardDescription>
                            Already have an account? 
                            <Link href="/signin">
                                <span className="text-blue-600">&nbsp; Login</span>
                            </Link>
                        </CardDescription>
                    </CardContent>
                    </Form>
                </CardContent>
        </Card>
    )
}