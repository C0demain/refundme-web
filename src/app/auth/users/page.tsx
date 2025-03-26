'use client'
import User from "@/@types/User"
import { getAllUsers } from "@/services/userService"
import { Container, NativeSelect, Table, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function UserList(){
    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async () => {
        const newUsers = await getAllUsers()
        const sortedUsers = newUsers.sort((a, b) => a.name.localeCompare(b.name))
        setUsers(sortedUsers)
    }

    useEffect(() => {
        fetchUsers()
    })

    return (
        <Container>
            <Text textStyle='3xl' color='black' marginY='12'>Usuários</Text>
            <Table.ScrollArea borderWidth="1px" rounded="md" minW='5/6' bgColor={'white'}>
                <Table.Root stickyHeader size='sm' interactive>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader textStyle='xl'>Nome</Table.ColumnHeader>
                            <Table.ColumnHeader textStyle='xl'>Email</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map((user: User, i: number) => {return (
                            <Table.Row key={i}>
                                <Table.Cell textStyle='md'>{user.name}</Table.Cell>
                                <Table.Cell textStyle='md'>{user.email}</Table.Cell>
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