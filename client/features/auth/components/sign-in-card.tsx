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

    const {mutate,isPending} =useLogin()

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
    <Card className="w-full h-auto p-5 border-none shadow-none">
    <CardHeader className="flex items-center justify-center text-center p-7">
      <CardTitle className="text-2xl">Welcome back!</CardTitle>
    </CardHeader>
    <div className="px-7 mb-2">
      <DottedSeperator />
    </div>
    <CardContent className="px-7">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} size="lg" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardContent>

    <div className="px-7">
      <DottedSeperator />
    </div>

    <CardContent className="px-7 flex flex-col gap-y-4">
      <Button
        variant="secondary"
        size="lg"
        className="w-full"
      >
        <FcGoogle className="mr-2 size-5" />
        Login with Google
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
      >
        <FaGithub className="mr-2 size-5" />
        Login with Github
      </Button>
    </CardContent>
    <div className="px-7">
      <DottedSeperator />
    </div>

    <CardContent className="p-7 flex items-center justify-center">
      <p>
        Don&apos;t have an account?
        <Link href="/sign-up">
          <span className="text-blue-700">&nbsp;Sign Up</span>
        </Link>
      </p>
    </CardContent>
  </Card>
    )
}