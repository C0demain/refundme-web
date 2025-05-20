'use client'
import RequestType from "@/@types/RequestType";
import { getRequests } from "@/services/requestService";
import { Badge, Box, Button, ButtonGroup, Center, Container, Heading, Icon, IconButton, Input, Pagination, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdModeEdit } from "react-icons/md";

const badgeColors = {
    'Aprovado': 'green',
    'Recusado': 'red',
    'Rascunho': '',
    'Pendente': 'yellow'
}

export default function RequestList(){
    const [requests, setRequests] = useState<RequestType[] | null>()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)

    const fetchRequests = async () => {
        try{
            const newRequests = await getRequests({search, limit: pageSize, page})
            setRequests(newRequests.data)
            setTotalPages(newRequests.totalPages)
            setIsLoading(false)
        }catch(e){
            console.error(e)
            setIsLoading(false)
            setHasError(true)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [search, page])

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
            <Input placeholder="Pesquisar por código ou título" value={search} onChange={e => setSearch(e.currentTarget.value)} mb="10" bg="white"/>
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
                            <Badge colorPalette={badgeColors[req.status as keyof typeof badgeColors]}>{req.status}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                            <Box display="flex" gap="4">
                                <Icon size="md" _hover={{cursor: 'pointer'}}>
                                    <MdModeEdit />
                                </Icon>
                                <Icon size={"md"} _hover={{cursor: 'pointer'}}>
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