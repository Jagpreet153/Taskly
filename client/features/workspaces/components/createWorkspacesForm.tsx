"use client"
import { z } from 'zod';
import { useRef } from 'react';
import { createWorkspaceSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DottedSeperator } from '@/components/ui/dotted-seperator';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"; 
import { useCreateWorkspaces } from '../api/useCreateWorkspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import { ImageIcon, Upload } from "lucide-react";
import React from 'react';

interface CreateWorkspacesFormProps {
    onCancel?: () => void;
}

export const CreateWorkspacesForm = ({ onCancel }: CreateWorkspacesFormProps) => {
    const { mutate, isPending } = useCreateWorkspaces();

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
            image: undefined
        }
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        const finalValue={
            ...values,
            image: values.image instanceof File ?  values.image : undefined
        }
        mutate({ form: finalValue },{
            onSuccess: () => {
                form.reset();
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
        <Card className="w-full max-w-3xl mx-auto bg-white md:my-6 shadow-sm">
            <CardHeader className="space-y-1.5 p-4 sm:p-6 md:p-8">
                <CardTitle className="text-xl sm:text-2xl font-semibold">
                    Create Workspace
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
                                                    <Button 
                                                    variant="teritary"
                                                    size="xs"
                                                    disabled={isPending}
                                                    className='w-fit mt-2'
                                                    onClick={() => inputRef.current?.click()}
                                                    type="button"
                                                    > Upload Image
                                                    </Button>
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
                                className="w-full sm:w-auto"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                size="lg"
                                className="w-full sm:w-auto"
                                disabled={isPending}
                            >
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};