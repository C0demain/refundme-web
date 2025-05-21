'use client'
import RequestType from "@/@types/RequestType";
import EditableStatus from "@/components/editable-status";
import { getRequests, updateStatus } from "@/services/requestService";
import { Box, Button, ButtonGroup, Center, Container, Heading, Icon, IconButton, Input, Pagination, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import StatusFilterPicker from "@/components/status-picker";

export default function RequestList(){
    const [requests, setRequests] = useState<RequestType[] | null>()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [status, setStatus] = useState<string | undefined>("")
    const router = useRouter()

    const fetchRequests = async () => {
        try{
            const newRequests = await getRequests({search, limit: pageSize, page, status})
            setRequests(newRequests.data)
            setTotalPages(newRequests.totalPages)
            setIsLoading(false)
        }catch(e){
            console.error(e)
            setIsLoading(false)
            setHasError(true)
        }
    }

    const editStatus = async (id: string, status: string) => {
        try{
            await updateStatus(id, status)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [search, page, status])

    if(isLoading){
        return (
            <Center py="24">
                <Spinner color="#8a2be2" size="xl" />
            </Center>
        )
    }

    if(hasError){
        return(
            <Center w="full" mt="20" display="flex" flexDirection="column" gap="3">
                <Heading>Não foi possível obter as solicitações. Tente novamente</Heading>
                <Button onClick={_ => window.location.reload()}>Recarregar</Button>
            </Center>
        )
    }

    return (
        <Container maxW="container.lg">
            <Heading mt="8" mb="6" fontSize="2xl">Solicitações</Heading>
            <Input placeholder="Pesquisar por código ou título" value={search} onChange={e => setSearch(e.currentTarget.value)} bg="white"/>
            <StatusFilterPicker selectedValue={status} setSelectedValue={setStatus}/>
            <Table.Root stickyHeader size="sm" w="full">
                <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader fontWeight="semibold" py="4">Título</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="semibold">Código</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="semibold">Status</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="semibold"></Table.ColumnHeader>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {requests?.map((req, i) => (
                      <Table.Row key={i}>
                        <Table.Cell w="1/3">{req.title}</Table.Cell>
                        <Table.Cell>{req.code}</Table.Cell>
                        <Table.Cell>
                            <EditableStatus
                            key={req._id}
                            initialValue={req.status} 
                            onSelected={e => toast.promise(editStatus(req._id, e.value), {loading: 'Atualizando status', error: 'Erro ao atualizar status', success: 'Status atualizado com sucesso'})}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Box display="flex" gap="4">
                                <Icon
                                size={"md"}
                                _hover={{cursor: 'pointer'}}
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
                    <Pagination.PrevTrigger asChild onClick={_ => setPage(page-1)}>
                        <IconButton>
                            <LuChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                    render={(page) => (
                    <IconButton 
                    variant={{ base: "ghost", _selected: "outline" }}
                    onClick={_ => setPage(page.value)}
                    >
                        {page.value}
                    </IconButton>
                    )}
                    />

                    <Pagination.NextTrigger asChild onClick={_ => setPage(page-1)}>
                        <IconButton>
                            <LuChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </Container>
    )
}