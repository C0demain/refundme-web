'use client'

import Expense from "@/@types/Expense";
import ReadImage from "@/components/expenses/readImage";
import { getAllExpenses } from "@/services/expenseService"
import {
  Container,
  Table,
  Text,
  Spinner,
  Center,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const newExpenses = await getAllExpenses();
      setExpenses(newExpenses);
    } catch (err) {
      console.error("Erro ao buscar despesas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Formatador de moeda
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Container maxW="container.lg">
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Solicitações de Reembolso
      </Text>

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <Table.ScrollArea borderWidth="1px" rounded="md" bg="white">
          <Table.Root stickyHeader size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Descrição</Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Tipo</Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Valor</Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Data</Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Solicitante</Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" color="white" textStyle="xl">Imagem</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Array.isArray(expenses) && expenses.map((expense, i) => (
                <Box as="tr" key={i} borderBottom="1px solid #E2E8F0">
                  <Table.Cell bg="white" color="black" textStyle="md">{expense?.description}</Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md">{expense?.type}</Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md">{formatCurrency(expense?.value)}</Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md"> {new Date(expense?.date).toLocaleDateString("pt-BR")}</Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md">{expense.user?.name}</Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md">
                    <ReadImage image={expense?.image} />
                  </Table.Cell>
                </Box>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}
    </Container>
  );
}
