import { deleteProjects } from "@/services/projectService"
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react"

interface DeleteProjectProps{
    id: string,
    handleDelete: () => void
}

export default function DeleteProject({id, handleDelete}: DeleteProjectProps){
    
    const deleteProject = async(id: string) => {
        try {
            const response = await deleteProjects(id)
            handleDelete()
        } catch (error) {
            console.error("Erro ao deletar projeto", error)
        }
    }
    
    return (
        <Dialog.Root key={id} size={"md"}>
            <Dialog.Trigger asChild>
            <Button variant="solid" backgroundColor={"red"} color={"white"} size={"sm"} width={"1/6"}>
                Deletar
            </Button>
            </Dialog.Trigger>
            <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Deletar projeto</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <p>
                    Você realmente deseja excluir esse projeto?
                    Todas as informações dele seram perdidas.
                    </p>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancelar</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={() => deleteProject(id)}>Excluir</Button>
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