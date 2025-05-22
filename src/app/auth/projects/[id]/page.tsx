"use client"

import Project from "@/@types/Project";
import EditableStatus from "@/components/editable-status";
import { AddUserInProject, DeleteUserForProject, getProjectById } from "@/services/projectService";
import { Box, Button, ButtonGroup, Center, Container, Flex, Heading, Icon, IconButton, Pagination, Spinner, Table, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { updateStatus } from "@/services/requestService";
import { Tooltip } from "@/components/ui/tooltip";
import { CiSquareRemove } from "react-icons/ci";

export default function ProjectPage() {
    const [project, setProject] = useState<Project>()
    const [loanding, setLoanding] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const router = useRouter()
    const params = useParams()
    const id = params.id

    const fetchProject = async () => {
        setLoanding(true)
        try {
            const newProject = await getProjectById(String(id))
            setProject(newProject)
            setLoanding(false)
        } catch (error) {
            console.error(error)
            setLoanding(false)
            setHasError(true)
        }
    }

    const editStatus = async (id: string, status: string) => {
        try {
            await updateStatus(id, status)
        } catch (e) {
            console.error(e)
        }
    }

    const removeUser = async (userId: string) => {
        try {
            await DeleteUserForProject(project?._id, userId)
            fetchProject()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])

    useEffect(() => {
        if (project?.requests) {
            setTotalPages(Math.ceil(project.requests.length / pageSize))
        }
    }, [project, pageSize])

    if (loanding) {
        return (
            <Container h={"max"}>
                <Center>
                    <Spinner color={"#8a2be2"} size={"xl"} />
                </Center>
            </Container>
        )
    }

    if (hasError) {
        return (
            <Center w="full" mt="20" display="flex" flexDirection="column" gap="3">
                <Heading>Solicitação não encontrada</Heading>
                <ButtonGroup>
                    <Button onClick={_ => window.location.reload()}>Recarregar</Button>
                    <Button onClick={_ => router.back()}>Voltar</Button>
                </ButtonGroup>
            </Center>
        )
    }

    return (
        <>
            <Container marginTop={4}>
                <Flex spaceX={10} backgroundColor={"white"} rounded={"md"} shadow={"md"} p={4}>
                    <Box>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>{project?.title}</Text>
                        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray"}>#{project?.code}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Descrição:</Text>
                        <Text fontSize={"xl"} >{project?.description}</Text>
                    </Box>
                </Flex>
                <Flex w="full" spaceX={2} marginTop={4}>
                    <Box w="1/2" rounded={"md"} shadow={"md"} p={4} backgroundColor={"white"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Solicitações do projeto:</Text>
                        <Table.Root stickyHeader size="sm" interactive >
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader fontWeight="semibold" py="4">Título</Table.ColumnHeader>
                                    <Table.ColumnHeader fontWeight="semibold" py="4">Código</Table.ColumnHeader>
                                    <Table.ColumnHeader fontWeight="semibold" py="4">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader fontWeight="semibold" py="4"></Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {project?.requests
                                    ?.slice((page - 1) * pageSize, page * pageSize)
                                    .map((req, i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell>{req.title}</Table.Cell>
                                            <Table.Cell>{req.code}</Table.Cell>
                                            <Table.Cell>
                                                <EditableStatus
                                                    key={req._id}
                                                    initialValue={req.status}
                                                    onSelected={e => toast.promise(editStatus(req._id, e.value), {
                                                        loading: 'Atualizando status',
                                                        error: 'Erro ao atualizar status',
                                                        success: 'Status atualizado com sucesso'
                                                    })}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Box display="flex">
                                                    <Icon
                                                        size={"md"}
                                                        _hover={{ cursor: 'pointer' }}
                                                        onClick={_ => router.push(`requests/${req._id}`)}
                                                    >
                                                        <FaArrowUpRightFromSquare />
                                                    </Icon>
                                                </Box>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table.Root>
                        <Pagination.Root pageSize={pageSize} page={page} count={totalPages}>
                            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                                <Pagination.PrevTrigger asChild onClick={_ => setPage(page - 1)}>
                                    <IconButton disabled={page <= 1}>
                                        <LuChevronLeft />
                                    </IconButton>
                                </Pagination.PrevTrigger>

                                <Pagination.Items
                                    render={(pageItem) => (
                                        <IconButton
                                            variant={pageItem.value === page ? "outline" : "ghost"}
                                            onClick={_ => setPage(pageItem.value)}
                                        >
                                            {pageItem.value}
                                        </IconButton>
                                    )}
                                />
                                <Pagination.NextTrigger asChild onClick={_ => setPage(page + 1)}>
                                    <IconButton disabled={page >= totalPages}>
                                        <LuChevronRight />
                                    </IconButton>
                                </Pagination.NextTrigger>
                            </ButtonGroup>
                        </Pagination.Root>
                    </Box>

                    <Box w={"1/2"} rounded={"md"} shadow={"md"} p={4} backgroundColor={"white"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Usuários no projeto:</Text>
                        <Table.Root stickyHeader size="sm" interactive>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader bg="white" fontWeight="semibold" py={4}>Nome</Table.ColumnHeader>
                                    <Table.ColumnHeader bg="white" fontWeight="semibold">Email</Table.ColumnHeader>
                                    <Table.ColumnHeader bg="white" fontWeight="semibold"></Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {project?.users?.map((user, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell color="black" textStyle="md">{user.name}</Table.Cell>
                                        <Table.Cell color="black" textStyle="md">{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Tooltip content="Remover usuário">
                                                <Button
                                                    backgroundColor={"transparent"}
                                                    display={"flex"}
                                                    onClick={() => removeUser(user._id)}
                                                >
                                                    <Icon color={"black"}>
                                                        <CiSquareRemove />
                                                    </Icon>
                                                </Button>
                                            </Tooltip>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Flex>
            </Container>
            <p>{JSON.stringify(project)}</p>
        </>
    )
}
