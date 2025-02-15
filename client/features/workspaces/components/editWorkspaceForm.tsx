"use client"
import { z } from 'zod';
import { useRef } from 'react';
import { updateWorkspaceSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DottedSeperator } from '@/components/ui/dotted-seperator';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"; 
import { useUpdateWorkspaces } from '../api/useUpdateWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import { ArrowLeftIcon, ImageIcon, Upload } from "lucide-react";
import React from 'react';
import {Workspace} from '../types';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useConfirm } from '@/app/hooks/useConfirm';
import { useDeleteWorkspaces } from '../api/useDeleteWorkspace';
interface EditWorkspacesFormProps {
    onCancel?: () => void;
    initialValues: Workspace
}

export const EditWorkspaceForm = ({ onCancel,initialValues }: EditWorkspacesFormProps) => {
    const router=useRouter();
    const { mutate, isPending } = useUpdateWorkspaces();
    const { mutate: deleteWorkspace , isPending: isDeletingWorkspace } = useDeleteWorkspaces();

    const [DeleteDialog,confirmDelete] = useConfirm(
        "Delete Workspace",
        "Are you sure you want to delete this workspace? This action is irreversible",
        "destructive",

    );

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl? initialValues.imageUrl : ""
        }
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();
        if(!ok)
        return;
        
        deleteWorkspace({  param: {workspaceId: initialValues.$id}, },
            {
                onSuccess: () => {
                    window.location.href = "/";
                }
            }
        );
    }

    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValue={
            ...values,
            image: values.image instanceof File ?  values.image : ""
        }
        mutate({ form: finalValue,
            param: {workspaceId: initialValues.$id} 
         },{
            onSuccess: ( {data} ) => {
                form.reset();
                // onCancel?.();
                router.push(`/workspace/${data.$id}`);
            }
        }
        ); 
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            form.setValue("image", file);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <DeleteDialog />
            <Card className="w-full max-w-3xl mx-auto bg-white md:my-6 shadow-sm">
                    <CardHeader className="space-y-1.5 p-4 sm:p-6 md:p-8 flex flex-row items-center gap-4">
                        <Button size="sm" onClick={onCancel? onCancel: ()=> router.push(`/workspace/${initialValues.$id}`)} variant="secondary">
                            Back
                            <ArrowLeftIcon size={4} className='mr-2'/>
                        </Button>

                        <CardTitle className="text-xl sm:text-2xl font-semibold">
                            {initialValues.name}
                        </CardTitle>
                    </CardHeader>
                
                <div className="px-4 sm:px-6 md:px-8">
                    <DottedSeperator />
                </div>
                
                <CardContent className="p-4 sm:p-6 md:p-8 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-medium">
                                                Workspace Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field} 
                                                    placeholder="Enter workspace name"
                                                    className="h-10 md:h-11"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({field: { value, onChange, ...field }}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-medium">
                                            
                                            </FormLabel>
                                            <FormControl>       
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-4">
                                                        {value ? (
                                                            <div className="relative h-[72px] w-[72px] rounded-md overflow-hidden">
                                                                <Image
                                                                    src={value instanceof File ? URL.createObjectURL(value) : value}
                                                                    alt=""
                                                                    className='object-cover'
                                                                    width={72}
                                                                    height={72}  
                                                                />
                                                            </div>
                                                        ) : (
                                                            <Avatar className="w-[72px] h-[72px]">
                                                                <AvatarFallback>
                                                                    <ImageIcon className="w-[36px] h-[36px] text-neutral-00" />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <p className='text-sm'>Workspace Icon</p>
                                                            <p className='text-sm text-muted-foreground'>JPG, PNG, JPEG, SVG max 1mb</p>
                                                        </div>
                                                        <input 
                                                        className='hidden' 
                                                        accept=".jpg,.png,.jpeg,.svg"
                                                        type="file"
                                                        ref={inputRef}
                                                        disabled={isPending}
                                                        onChange={handleImageChange}
                                                        />
                                                        {
                                                            value ? (
                                                                <Button 
                                                                variant="destructive"
                                                                size="xs"
                                                                disabled={isPending}
                                                                className='w-fit mt-2'
                                                                onClick={() => {onChange(null)
                                                                        { 
                                                                            if(inputRef.current){
                                                                                inputRef.current.value = "";
                                                                        }
                                                                    }
                                                                }}
                                                                type="button"
                                                                > Remove Image
                                                                </Button>

                                                            ) : (
                                                                <Button 
                                                                variant="teritary"
                                                                size="xs"
                                                                disabled={isPending}
                                                                className='w-fit mt-2'
                                                                onClick={() => inputRef.current?.click()}
                                                                type="button"
                                                                > Upload Image
                                                                </Button>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-4">
                                <DottedSeperator />
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
                                <Button 
                                    type="button" 
                                    variant="secondary" 
                                    size="lg" 
                                    onClick={onCancel}
                                    disabled={isPending}
                                    className={cn("w-full sm:w-auto" , !onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    disabled={isPending}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className='w-full max-w-3xl mx-auto bg-white md:my-6 shadow-sm'>
                <CardContent className='p-4 sm:p-6 md:p-8 space-y-6'>
                    <div className='flex flex-col'>
                        <h3 className='font-bold'>Danger Zone</h3>
                        <p className='text-sm text-muted-foreground'>
                            Deleting a workspace is irreversible. All data associated with the workspace will be lost.
                        </p>
                        <Button className='mt-6 w-fit ml-auto' size="sm" variant='destructive' type='button' disabled={isPending || isDeletingWorkspace} onClick={handleDelete}>
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};