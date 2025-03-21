'use client'
import { useAuth } from "@/context/authContext";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

export default function Logout(){
    const { signOut } = useAuth();

    function handleLogout(){
        signOut()
    }
    
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                Logout
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Logout</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <p>
                            Deseja sair da sua conta?
                        </p>
                    </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                                <Button onClick={handleLogout}>Sim</Button>
                        </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}