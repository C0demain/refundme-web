import { deleteProjects } from "@/services/projectService";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";

interface DeleteProjectProps {
  id: string;
  handleDelete: () => void;
}

export default function DeleteProject({
  id,
  handleDelete,
}: DeleteProjectProps) {
  const deleteProject = async (id: string) => {
    try {
      const response = await deleteProjects(id);
      handleDelete();
    } catch (error) {
      console.error("Erro ao deletar projeto", error);
    }
  };

  return (
    <Dialog.Root key={id} size={"md"}>
      <Dialog.Trigger asChild>
        <IconButton
          variant={{base: "outline", _hover: "solid"}}
          colorPalette={"red"}
          size={"md"}
          rounded={"full"}
        >
          <LuTrash2
            aria-label="Excluir projeto"
            strokeWidth={2}
          />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header color={"black"}>
              <Dialog.Title>Deletar projeto</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color={"black"}>
              <Text>
                Você realmente deseja excluir esse projeto? Todas as informações
                dele seram perdidas.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => deleteProject(id)}>
                Excluir
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
