"use client"
import { z } from 'zod';
import { createWorkspaceSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DottedSeperator } from '@/components/ui/dotted-seperator';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useCreateWorkspaces } from '../api/useCreateWorkspace';

interface CreateWorkspacesFormProps {
    onCancel?: () => void;
}

export const CreateWorkspacesForm = ({ onCancel }: CreateWorkspacesFormProps) => {

    const {mutate,isPending} = useCreateWorkspaces();

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        mutate({json: values});
    };

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
                        <div className="space-y-4">
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
                                className="sm:w-auto"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                size="lg"
                                className="sm:w-auto"
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