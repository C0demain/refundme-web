"use client";

import ExpensesByTypeChart from "@/components/charts/expensesByTypeChart";
import RequestsByStatusChart from "@/components/charts/requestsByStatusChart";
import {
  Container,
  GridItem,
  HStack,
  Input,
  SegmentGroup,
  Separator,
  SimpleGrid,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";

export default function Dashboard() {
  const [period, setPeriod] = useState<string>("month");
  // TODO: atribuir data inicial dinamicamente
  const [startDate, setStartDate] = useState<string>(
    dayjs(new Date()).subtract(1, "month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const periodsList = [
    { label: "Semana", value: "week" },
    { label: "Mês", value: "month" },
    { label: "Trimestre", value: "quarter" },
    { label: "Semestre", value: "semester" },
  ];

  return (
    <Container my={6}>
      <SimpleGrid column={{ base: 2, mdDown: 1 }} gap={"20px"}>
        <GridItem
          bg={"white"}
          borderRadius={"md"}
          colSpan={{ base: 2, mdDown: 1 }}
        >
          <Container my={2}>
            <Text fontSize={"lg"} textAlign={"center"}>
              Status das solicitações
            </Text>
            <Separator />
            <RequestsByStatusChart />
          </Container>
        </GridItem>

        <GridItem
          bg={"white"}
          borderRadius={"md"}
          colSpan={{ base: 2, mdDown: 1 }}
        >
          <Stack
            direction={{ _default: "row", mdDown: "column" }}
            align={"center"}
            separator={<StackSeparator />}
            marginInline={4}
            justify={"space-evenly"}
          >
            <HStack>
              <Text fontSize="lg" m="4">
                Início
              </Text>
              <Input
                type={"date"}
                size={"md"}
                w={"15rem"}
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </HStack>
            <HStack>
              <Text fontSize="lg" m="4">
                Fim
              </Text>
              <Input
                type={"date"}
                size={"md"}
                w={"15rem"}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </HStack>
            <HStack>
              <Text fontSize="lg" m="4">
                Período
              </Text>
              <SegmentGroup.Root
                defaultValue="Mês"
                size={"sm"}
                value={period}
                onValueChange={(e) => setPeriod(e.value ?? "month")}
              >
                <SegmentGroup.Indicator />
                {periodsList.map((period) => (
                  <SegmentGroup.Item key={period.value} value={period.value}>
                    <SegmentGroup.ItemText>
                      {period.label}
                    </SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                ))}
              </SegmentGroup.Root>
            </HStack>
          </Stack>
        </GridItem>

        <GridItem
          bg={"white"}
          borderRadius={"md"}
          colSpan={{ base: 2, mdDown: 1 }}
        >
          <Container my={2}>
            <Text fontSize={"lg"} textAlign={"center"}>
              Despesas por tipo
            </Text>
            <ExpensesByTypeChart
              startDate={startDate}
              endDate={endDate}
              period={period}
            />
          </Container>
        </GridItem>
        {/* <GridItem
          bg={"white"}
          borderRadius={"md"}
          colSpan={{ base: 2, mdDown: 1 }}
        >
          <Container my={2}>
            <Text fontSize="3xl" color="black" my="6">
              Reembolsos
            </Text>
          </Container>
        </GridItem> */}
      </SimpleGrid>
    </Container>
  );
}
