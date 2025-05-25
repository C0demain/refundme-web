"use client";

import { useAuth } from "@/context/authContext";
import { HStack, Avatar, For, defineStyle } from "@chakra-ui/react";
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

  const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "white",
    outlineStyle: "solid",
    outlineOffset: "-2px"
  });

  return (
    <HStack onClick={handleLogout} cursor="pointer">
      <Avatar.Root
        variant={"outline"}
        css={ringCss}
        _hover={{
          transform: "scale(1.1)",
          transition: "0.2s",
          backgroundColor: "#3E007A",
        }}
      >
        <Avatar.Fallback color="white" bg={"transparent"} />
      </Avatar.Root>
    </HStack>
  );
}
