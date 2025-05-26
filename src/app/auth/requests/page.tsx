"use client";
import RequestType from "@/@types/RequestType";
import EditableStatus from "@/components/editable-status";
import PaginationComponent from "@/components/pagination";
import SearchBar from "@/components/searchBar";
import StatusFilterPicker from "@/components/status-picker";
import { getRequests, updateStatus } from "@/services/requestService";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Spinner,
  Table,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function RequestList() {
  const [requests, setRequests] = useState<RequestType[] | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<string | undefined>("");
  const router = useRouter();

  const fetchRequests = async () => {
    try {
      const response = await getRequests({
        search,
        limit: pageSize,
        page,
        status,
      });
      setRequests(response.data);
      setTotal(response.total);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const editStatus = async (id: string, status: string) => {
    try {
      await updateStatus(id, status);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, status]);

  useEffect(() => {
    setPage(1)
  }, [status, search])

  if (isLoading) {
    return (
      <Center py="24">
        <Spinner color="#8a2be2" size="xl" />
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center w="full" mt="20" display="flex" flexDirection="column" gap="3">
        <Heading>
          Não foi possível obter as solicitações. Tente novamente
        </Heading>
        <Button onClick={(_) => window.location.reload()}>Recarregar</Button>
      </Center>
    );
  }

  return (
    <Container>
      <VStack gap={5}>
        <Flex
          direction={{ base: "row", mdDown: "column" }}
          w={"full"}
          mt={6}
          align={"center"}
          justify={"space-between"}
        >
          <Heading
            fontSize="3xl"
            color="black"
            mr={3}
            mb={{ base: 0, mdDown: 3 }}
          >
            Solicitações
          </Heading>{" "}
          <StatusFilterPicker
            selectedValue={status}
            setSelectedValue={setStatus}
          />
        </Flex>
        <SearchBar
          searchValue={search}
          setSearchFunction={setSearch}
          fetchFunction={fetchRequests}
        />
        <Table.ScrollArea rounded="md" minW="full" bgColor="white">
          <Table.Root
            colorPalette={"purple"}
            variant={"outline"}
            stickyHeader
            size="sm"
            interactive
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textStyle="xl">Título</Table.ColumnHeader>
                <Table.ColumnHeader textStyle="xl">Código</Table.ColumnHeader>
                <Table.ColumnHeader textStyle="xl">Status</Table.ColumnHeader>
                <Table.ColumnHeader textStyle="xl" />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {requests?.map((req, i) => (
                <Table.Row key={i}>
                  <Table.Cell w="1/3">{req.title}</Table.Cell>
                  <Table.Cell>{req.code}</Table.Cell>
                  <Table.Cell colorPalette={"gray"}>
                    <EditableStatus
                      key={req._id}
                      initialValue={req.status}
                      onSelected={(e) =>
                        toast.promise(editStatus(req._id, e.value), {
                          loading: "Atualizando status",
                          error: "Erro ao atualizar status",
                          success: "Status atualizado com sucesso",
                        })
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Box display="flex" gap="4">
                      <Icon
                        size={"md"}
                        _hover={{ cursor: "pointer" }}
                        onClick={(_) => router.push(`requests/${req._id}`)}
                      >
                        <FaArrowUpRightFromSquare />
                      </Icon>
                    </Box>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>

        <PaginationComponent
          count={total}
          pageSize={pageSize}
          page={page}
          setPage={setPage}
        />
      </VStack>
    </Container>
  );
}
