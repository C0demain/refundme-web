"use client";

import { useAuth } from "@/context/authContext";
import { HStack, Avatar, For } from "@chakra-ui/react";
import Swal from "sweetalert2";

export default function Logout() {
    const { signOut } = useAuth();

    function handleLogout() {
        Swal.fire({
            title: "Tem certeza que deseja sair?",
            icon: "warning",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: "#8a2be2",
            cancelButtonColor: "#e53e3e",
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        });
    }

    return (
    <HStack gap="3" onClick={handleLogout} cursor="pointer" mr="160px">
        <For each={["outline"]}>
            {(variant) => (
                <Avatar.Root key={variant} variant={variant} _hover={{
                    transform: "scale(1.1)", 
                    transition: "0.2s", 
                    backgroundColor: "#3E007A"
                }}>
                    <Avatar.Fallback />
                </Avatar.Root>
            )}
        </For>
    </HStack>
    );
}
