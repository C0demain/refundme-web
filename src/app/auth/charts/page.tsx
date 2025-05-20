"use client";

import InitialChart from "@/components/charts/initialChart";
import RequestStatusChart from "@/components/charts/requestStatusChart";
import {
    Box,
    Container,
    GridItem,
    SimpleGrid,
    Text
} from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Container>
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Dashboard
      </Text>
      <SimpleGrid column={{ base: 2, mdDown: 1 }} gap={"20px"}>
        <GridItem
          bg={"white"}
          borderRadius={"md"}
          colSpan={{ base: 2, mdDown: 1 }}
        >
          <Container>
            <Text fontSize="3xl" color="black" m="4">
              Requisições por status
            </Text>
            <RequestStatusChart />
          </Container>
        </GridItem>
        <GridItem bg={"white"} borderRadius={"md"}>
          <Container>
            <Text fontSize="3xl" color="black" m="4">
              Despesas por tipo
            </Text>
            <InitialChart />
          </Container>
        </GridItem>
        <Box bg={"white"} borderRadius={"md"}>
          <Container>
            <Text fontSize="3xl" color="black" my="6">
              Reembolsos
            </Text>
          </Container>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
