'use client'
import RequestType from "@/@types/RequestType";
import { getRequests } from "@/services/requestService";
import { Badge, Box, Button, Center, Container, Heading, Icon, Input, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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

    const fetchRequests = async () => {
        try{
            const newRequests = await getRequests({search})
            setRequests([...newRequests, ...newRequests])
            setIsLoading(false)
        }catch(e){
            setIsLoading(false)
            setHasError(true)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [search])

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
        </Container>
    )
}