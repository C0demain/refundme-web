"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  DialogRootProps,
} from "@chakra-ui/react";
import CreateProjectForm from "./createProjectForm";

interface CreateProjectDialogProps extends DialogRootProps {
  onCreate?: () => void;
}

export default function CreateProjectDialog({
  onCreate,
}: CreateProjectDialogProps) {
  return (
    <Dialog.Root size="md">
      <Dialog.Trigger asChild>
        <Button backgroundColor={"#7C55F3"} rounded={"full"}>
          Criar Projeto
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner color={"black"}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Novo Projeto</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <CreateProjectForm onChange={onCreate} />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top="4" right="4" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
