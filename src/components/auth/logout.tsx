"use client";

import { useAuth } from "@/context/authContext";
import { Button } from "@chakra-ui/react";
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
            cancelButtonColor: "	#e53e3e",
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                signOut();
            }
        });
    }

    return (
        <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
        </Button>
    );
}
