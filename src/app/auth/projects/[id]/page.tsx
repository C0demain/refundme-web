    "use client"

    import Project from "@/@types/Project";
    import EditableStatus from "@/components/editable-status";
    import { AddUserInProject, DeleteUserForProject, EditProject, getProjectById } from "@/services/projectService";
    import { updateStatus } from "@/services/requestService";
    import { Tooltip } from "@/components/ui/tooltip";
    import SelectUser from "@/components/util/selectUser";

    import {
        Box, Button, ButtonGroup, Center, Container, Flex, Heading, Icon, IconButton,
        Spinner, Table, Text, Pagination, Editable
    } from "@chakra-ui/react";

    import { useParams, useRouter } from "next/navigation";
    import { useEffect, useState } from "react";
    import toast from "react-hot-toast";
    import { FaArrowUpRightFromSquare, FaDeleteLeft } from "react-icons/fa6";
    import { LuCheck, LuChevronLeft, LuChevronRight, LuPencilLine, LuX } from "react-icons/lu";

    export default function ProjectPage() {

        // Estados
        const [project, setProject] = useState<Project>()
        const [loading, setLoading] = useState(true)
        const [hasError, setHasError] = useState(false)

        const [selectedUsers, setSelectedUsers] = useState<string[]>([])
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [limit, setLimit] = useState('')
        const [cc, setCc] = useState('')

        const [page, setPage] = useState(1)
        const [pageSize] = useState(10)
        const [totalPages, setTotalPages] = useState(1)

        const router = useRouter()
        const params = useParams()
        const id = params.id

        // 🔄 Busca os dados do projeto
        const fetchProject = async () => {
            setLoading(true)
            try {
                const newProject = await getProjectById(String(id))
                setProject(newProject)
                setTitle(newProject.title ?? '')
                setDescription(newProject.description ?? '')
                setLimit(String(newProject.limit ?? '')) // Aqui converte para string
                setCc(newProject.cc ?? '')
                setLoading(false)
            } catch (error) {
                console.error(error)
                setHasError(true)
                setLoading(false)
            }
        }

        // ✏️ Atualiza campos do projeto
        const handleEditProjectField = async (field: string, value: string) => {
            try {
                // Se for 'limit', converte para número antes de enviar
                const processedValue = field === 'limit' ? Number(value) : value;

                await toast.promise(
                    EditProject(String(project?._id), { [field]: processedValue }),
                    {
                        loading: `Atualizando ${field}...`,
                        success: `${field} atualizado com sucesso!`,
                        error: `Erro ao atualizar ${field}`,
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };

        // 🔄 Atualiza status da solicitação
        const editStatus = async (id: string, status: string) => {
            try {
                await updateStatus(id, status)
            } catch (e) {
                console.error(e)
            }
        }

        // ➖ Remove usuário do projeto
        const removeUser = async (userId: string) => {
            try {
                await DeleteUserForProject(project?._id, userId)
                fetchProject()
            } catch (error) {
                console.error(error)
            }
        }

        // ➕ Adiciona usuário no projeto
        const addUser = async () => {
            try {
                await AddUserInProject(project?._id, selectedUsers);
                fetchProject()
            } catch (error) {
                console.error(error)
            }
        }

        // 📦 Paginação dinâmica baseada no total de requests
        useEffect(() => {
            if (project?.requests) {
                setTotalPages(Math.ceil(project.requests.length / pageSize))
            }
        }, [project, pageSize])

        useEffect(() => {
            fetchProject()
        }, [])

        // 🔄 Loading
        if (loading) {
            return (
                <Container h={"max"}>
                    <Center>
                        <Spinner color={"#8a2be2"} size={"xl"} />
                    </Center>
                </Container>
            )
        }

        // ❌ Tratamento de erro
        if (hasError) {
            return (
                <Center w="full" mt="20" flexDirection="column" gap="3">
                    <Heading>Projeto não encontrado</Heading>
                    <ButtonGroup>
                        <Button onClick={() => window.location.reload()}>Recarregar</Button>
                        <Button onClick={() => router.back()}>Voltar</Button>
                    </ButtonGroup>
                </Center>
            )
        }

        return (
            <>
                <Container marginTop={4}>
                    {/* Informações do Projeto */}
                    <Flex backgroundColor={"white"} rounded={"md"} shadow={"md"} p={4} gap={10} flexWrap="wrap">
                        {/* Título */}
                        <Box alignItems={"center"}>
                        <Editable.Root
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            value={title}
                            onValueChange={(details) => setTitle(details.value)}
                            activationMode="focus"
                            submitMode="enter"
                            selectOnFocus={true}
                        >
                            <Editable.Preview />
                            <Editable.Input />
                            <Editable.Control>
                                <Editable.EditTrigger asChild>
                                    <IconButton variant="ghost" size="xs" aria-label="Editar título">
                                        <LuPencilLine />
                                    </IconButton>
                                </Editable.EditTrigger>
                                <Editable.CancelTrigger asChild>
                                    <IconButton variant="outline" size="xs" aria-label="Cancelar edição">
                                        <LuX />
                                    </IconButton>
                                </Editable.CancelTrigger>
                                <Editable.SubmitTrigger asChild>
                                    <IconButton
                                        variant="outline"
                                        size="xs"
                                        aria-label="Confirmar edição"
                                        onClick={() => handleEditProjectField("title", title)}
                                    >
                                        <LuCheck />
                                    </IconButton>
                                </Editable.SubmitTrigger>
                            </Editable.Control>
                        </Editable.Root>
                        <Text fontSize={"xl"} color={"gray"}>#{project?.code}</Text>
                        </Box>
                        {/* Descrição */}
                        <Box mt={4}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>Descrição:</Text>
                            <Editable.Root
                                value={description}
                                onValueChange={(details) => setDescription(details.value)}
                                activationMode="focus"
                                submitMode="enter"
                                selectOnFocus={true}
                            >
                                <Editable.Preview />
                                <Editable.Input />
                                <Editable.Control>
                                    <Editable.EditTrigger asChild>
                                        <IconButton variant="ghost" size="xs" aria-label="Editar descrição">
                                            <LuPencilLine />
                                        </IconButton>
                                    </Editable.EditTrigger>
                                    <Editable.CancelTrigger asChild>
                                        <IconButton variant="outline" size="xs" aria-label="Cancelar edição">
                                            <LuX />
                                        </IconButton>
                                    </Editable.CancelTrigger>
                                    <Editable.SubmitTrigger asChild>
                                        <IconButton
                                            variant="outline"
                                            size="xs"
                                            aria-label="Confirmar edição"
                                            onClick={() => handleEditProjectField("description", description)}
                                        >
                                            <LuCheck />
                                        </IconButton>
                                    </Editable.SubmitTrigger>
                                </Editable.Control>
                            </Editable.Root>
                        </Box>

                        {/* Limite */}
                        <Box mt={4}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>Limite de solicitação:</Text>
                            <Editable.Root
                                value={limit}
                                onValueChange={(details) => setLimit(details.value)}
                                activationMode="focus"
                                submitMode="enter"
                                selectOnFocus={true}
                            >
                                <Editable.Preview />
                                <Editable.Input />
                                <Editable.Control>
                                    <Editable.EditTrigger asChild>
                                        <IconButton variant="ghost" size="xs" aria-label="Editar limite">
                                            <LuPencilLine />
                                        </IconButton>
                                    </Editable.EditTrigger>
                                    <Editable.CancelTrigger asChild>
                                        <IconButton variant="outline" size="xs" aria-label="Cancelar edição">
                                            <LuX />
                                        </IconButton>
                                    </Editable.CancelTrigger>
                                    <Editable.SubmitTrigger asChild>
                                        <IconButton
                                            variant="outline"
                                            size="xs"
                                            aria-label="Confirmar edição"
                                            onClick={() => handleEditProjectField("limit", limit)}
                                        >
                                            <LuCheck />
                                        </IconButton>
                                    </Editable.SubmitTrigger>
                                </Editable.Control>
                            </Editable.Root>
                        </Box>

                        {/* Centro de custo */}
                        <Box mt={4}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>Centro de custo:</Text>
                            <Editable.Root
                                value={cc}
                                onValueChange={(details) => setCc(details.value)}
                                activationMode="focus"
                                submitMode="enter"
                                selectOnFocus={true}
                            >
                                <Editable.Preview />
                                <Editable.Input />
                                <Editable.Control>
                                    <Editable.EditTrigger asChild>
                                        <IconButton variant="ghost" size="xs" aria-label="Editar centro de custo">
                                            <LuPencilLine />
                                        </IconButton>
                                    </Editable.EditTrigger>
                                    <Editable.CancelTrigger asChild>
                                        <IconButton variant="outline" size="xs" aria-label="Cancelar edição">
                                            <LuX />
                                        </IconButton>
                                    </Editable.CancelTrigger>
                                    <Editable.SubmitTrigger asChild>
                                        <IconButton
                                            variant="outline"
                                            size="xs"
                                            aria-label="Confirmar edição"
                                            onClick={() => handleEditProjectField("cc", cc)}
                                        >
                                            <LuCheck />
                                        </IconButton>
                                    </Editable.SubmitTrigger>
                                </Editable.Control>
                            </Editable.Root>
                        </Box>
                    </Flex>

                    {/* Tabela Solicitações */}
                    <Flex w="full" marginTop={4} gap={4}>
                        <Box w="1/2" rounded={"md"} shadow={"md"} p={4} backgroundColor={"white"}>
                            <Text fontSize={"2xl"} fontWeight={"bold"} mb={5}>Solicitações do projeto:</Text>
                            <Table.Root stickyHeader size="sm" interactive >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader py="4">Título</Table.ColumnHeader>
                                        <Table.ColumnHeader py="4">Código</Table.ColumnHeader>
                                        <Table.ColumnHeader py="4">Status</Table.ColumnHeader>
                                        <Table.ColumnHeader py="4"></Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {project?.requests
                                        ?.slice((page - 1) * pageSize, page * pageSize)
                                        .map((req) => (
                                            <Table.Row key={req._id}>
                                                <Table.Cell>{req.title}</Table.Cell>
                                                <Table.Cell>{req.code}</Table.Cell>
                                                <Table.Cell>
                                                    <EditableStatus
                                                        initialValue={req.status}
                                                        onSelected={(e) => toast.promise(editStatus(req._id, e.value), {
                                                            loading: 'Atualizando status',
                                                            error: 'Erro ao atualizar status',
                                                            success: 'Status atualizado com sucesso'
                                                        })}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Icon
                                                        _hover={{ cursor: 'pointer' }}
                                                        onClick={() => router.push(`/auth/requests/${req._id}`)}
                                                    >
                                                        <FaArrowUpRightFromSquare />
                                                    </Icon>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                </Table.Body>
                            </Table.Root>

                            {/* Paginação */}
                            <Pagination.Root pageSize={pageSize} page={page} count={totalPages}>
                                <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                                    <Pagination.PrevTrigger asChild onClick={() => setPage(page - 1)}>
                                        <IconButton disabled={page <= 1}>
                                            <LuChevronLeft />
                                        </IconButton>
                                    </Pagination.PrevTrigger>
                                    <Pagination.Items
                                        render={(pageItem) => (
                                            <IconButton
                                                variant={pageItem.value === page ? "outline" : "ghost"}
                                                onClick={() => setPage(pageItem.value)}
                                            >
                                                {pageItem.value}
                                            </IconButton>
                                        )}
                                    />
                                    <Pagination.NextTrigger asChild onClick={() => setPage(page + 1)}>
                                        <IconButton disabled={page >= totalPages}>
                                            <LuChevronRight />
                                        </IconButton>
                                    </Pagination.NextTrigger>
                                </ButtonGroup>
                            </Pagination.Root>
                        </Box>

                        {/* Tabela Usuários */}
                        <Box w={"1/2"} rounded={"md"} shadow={"md"} p={4} backgroundColor={"white"}>
                            <Flex justifyContent={'space-between'} mb={4}>
                                <Text fontSize={"2xl"} fontWeight={"bold"}>Usuários no projeto:</Text>
                                {/* SELECIONAR NOVO USUÁRIO NO PROJETO */}
                                <Flex gap={4} alignItems={"center"}>
                                    <SelectUser usersOnProject={project?.users.map(user => user._id)} onChange={setSelectedUsers} />
                                    <Tooltip content="Adicionar usuários" showArrow>
                                        <IconButton variant="outline" size="xs" onClick={addUser}>
                                            <LuCheck />
                                        </IconButton>
                                    </Tooltip>
                                </Flex>
                            </Flex>
                            <Table.Root stickyHeader size="sm" interactive>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                                        <Table.ColumnHeader></Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {project?.users?.map((user) => (
                                        <Table.Row key={user._id}>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>
                                                <Tooltip content="Remover usuário" showArrow>
                                                    <IconButton
                                                        backgroundColor={"transparent"}
                                                        color={"black"}
                                                        size={"md"}
                                                        _hover={{ cursor: 'pointer' }}
                                                        onClick={() => toast.promise(removeUser(user._id), {
                                                            loading: 'Removendo usuário',
                                                            error: 'Erro ao remover usuário',
                                                            success: 'Usuário removido com sucesso'
                                                        })}
                                                    >
                                                        <FaDeleteLeft />
                                                    </IconButton>
                                                </Tooltip>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    </Flex>
                </Container>
            </>
        )
    }
