"use client";

import { ResponsiveModal } from "@/components/responsiveModal";
import { CreateWorkspacesForm } from "./createWorkspacesForm";
import { useCreateWorkspaceModal } from "../hooks/useCreateWorkspaceModal";
import {useState} from "react";

export const CreateWorkspaceModal = () => { 
    const [open, setOpen] = useState(true);
    const {isopen,setIsOpen,close} = useCreateWorkspaceModal();
    return (
        <ResponsiveModal open={isopen} onOpenChange={setIsOpen}>
            <CreateWorkspacesForm onCancel={close}/>
        </ResponsiveModal>
    );
}