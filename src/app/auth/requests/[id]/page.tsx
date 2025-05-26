"use client";
import RequestType from "@/@types/RequestType";
import EditableStatus from "@/components/editable-status";
import ReadImage from "@/components/expenses/readImage";
import { getRequestsById, updateStatus } from "@/services/requestService";
import formatCurrency from "@/util/format-currency";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Heading,
    HStack,
    Spinner,
    Table,
    Dialog
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RequestPage() {
  const [request, setRequest] = useState<RequestType>();
  const [loading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const fetchRequest = async () => {
    try {
      const newRequest = await getRequestsById(String(id));
      setRequest(newRequest);
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
    fetchRequest();
  }, []);

  if (loading) {
    return (
      <Center py="24">
        <Spinner color="#8a2be2" size="xl" />
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center w="full" mt="20" display="flex" flexDirection="column" gap="3">
        <Heading>Solicitação não encontrada</Heading>
        <ButtonGroup>
          <Button onClick={(_) => window.location.reload()}>Recarregar</Button>
          <Button onClick={(_) => router.back()}>Voltar</Button>
        </ButtonGroup>
      </Center>
    );
  }

  return (
    <Container maxW="container.lg">
      <HStack mt="8" alignItems="center">
        <Heading fontSize="2xl">{request?.title}</Heading>
        <EditableStatus
          size="lg"
          initialValue={String(request?.status)}
          onSelected={(e) =>
            toast.promise(editStatus(String(request?._id), e.value), {
              loading: "Atualizando status",
              error: "Erro ao atualizar status",
              success: "Status atualizado com sucesso",
            })
          }
        />
      </HStack>
      <Heading fontSize="small" mb="6">
        #{request?.code}
      </Heading>
      <Table.Root stickyHeader size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">
              Descrição
            </Table.ColumnHeader>
            <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">
              Tipo
            </Table.ColumnHeader>
            <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">
              Valor
            </Table.ColumnHeader>
            <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">
              Data
            </Table.ColumnHeader>
            <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">
              Imagem
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {request?.expenses &&
            request.expenses.map((expense, i) => (
              <Box as="tr" key={i} borderBottom="1px solid #E2E8F0">
                <Table.Cell bg="white" color="black" textStyle="md">
                  {expense.description}
                </Table.Cell>
                <Table.Cell bg="white" color="black" textStyle="md">
                  {expense.type}
                </Table.Cell>
                <Table.Cell bg="white" color="black" textStyle="md">
                  {formatCurrency(expense.value)}
                </Table.Cell>
                <Table.Cell bg="white" color="black" textStyle="md">
                  {" "}
                  {new Date(expense.date).toLocaleDateString("pt-BR")}
                </Table.Cell>
                <Table.Cell bg="white" color="black" textStyle="md">
                  <Dialog.Root lazyMount immediate={false}>
                    <Dialog.Trigger asChild>
                      <Button variant="solid" bg="#8a2be2" color="white" size="sm">
                        Recibo
                      </Button>
                    </Dialog.Trigger>
                    <ReadImage expense_id={expense._id} />
                  </Dialog.Root>
                </Table.Cell>
              </Box>
            ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
