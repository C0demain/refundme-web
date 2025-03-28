'use client'

import Expense from "@/@types/Expense";
import ReadImage from "@/components/expenses/readImage";
import { getAllExpenses } from "@/services/expenseService"
import { Container, Table, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export default function Home(){
    const [expenses, setExpenses] = useState<Expense[]>([])

    const fetchExpenses = async() => {
        const newExpenses = await getAllExpenses();
        setExpenses(newExpenses);
    }

    useEffect(()=>{
        fetchExpenses();
    },[])

    return(
        <Container>
            <Text textStyle='3xl' color='black' marginY='12'>Solicatações de reembolso</Text>
            <Table.ScrollArea borderWidth="1px" rounded="md" bgColor={'white'} color={'white'}>
                <Table.Root stickyHeader size='sm' bgColor={'white'} interactive>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader bgColor={'#8a2be2'} textStyle='xl'>Descrição</Table.ColumnHeader>
                            <Table.ColumnHeader bgColor={'#8a2be2'} textStyle='xl'>Tipo</Table.ColumnHeader>
                            <Table.ColumnHeader bgColor={'#8a2be2'} textStyle='xl'>Valor</Table.ColumnHeader>
                            <Table.ColumnHeader bgColor={'#8a2be2'} textStyle='xl'>Data</Table.ColumnHeader>
                            <Table.ColumnHeader bgColor={'#8a2be2'} textStyle='xl'>Imagem</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Array.isArray(expenses) && expenses.map((expense: Expense, i: number) => {return (
                            <Table.Row key={i}>
                                <Table.Cell bgColor={'white'} color={'black'} textStyle='md'>{expense.description}</Table.Cell>
                                <Table.Cell bgColor={'white'} color={'black'} textStyle='md'>{expense.type}</Table.Cell>
                                <Table.Cell bgColor={'white'} color={'black'} textStyle='md'>{expense.value}</Table.Cell>
                                <Table.Cell bgColor={'white'} color={'black'} textStyle='md'>{expense.date}</Table.Cell>
                                <Table.Cell bgColor={'white'} color={'black'} textStyle='md'><ReadImage image={expense.image}/></Table.Cell>
                            </Table.Row>
                        )})}
                        <Table.Row>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </Container>
    )
}