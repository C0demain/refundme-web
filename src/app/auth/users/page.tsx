'use client'

import User from "@/@types/User"
import { getAllUsers } from "@/services/userService"
import {
  Container,
  Table,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const newUsers = await getAllUsers()
      const sortedUsers = newUsers.sort((a, b) => a.name.localeCompare(b.name))
      setUsers(sortedUsers)
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Text textStyle="3xl" color="black" marginY="12">
        Usuários
      </Text>

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <Table.ScrollArea borderWidth="1px" rounded="md" minW="5/6" bgColor="white">
          <Table.Root stickyHeader size="sm" interactive>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader bg="#8a2be2" textStyle="xl">
                  Nome
                </Table.ColumnHeader>
                <Table.ColumnHeader bg="#8a2be2" textStyle="xl">
                  Email
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user: User, i: number) => (
                <Table.Row key={i}>
                  <Table.Cell bg="white" color="black" textStyle="md">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell bg="white" color="black" textStyle="md">
                    {user.email}
                  </Table.Cell>
                </Table.Row>
              ))}
              <Table.Row></Table.Row>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}
    </Container>
  )
}
