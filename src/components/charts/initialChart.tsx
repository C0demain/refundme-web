import { getDashboardStats } from "@/services/expenseService";
import { Chart, useChart } from "@chakra-ui/charts";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function InitialChart() {
  const [data, setData] = useState<any>([]);

  const fetchStats = async () => {
    try {
      const stats = await getDashboardStats(
        new Date("2025-01-01").toISOString(),
        new Date().toISOString(),
        "week"
      );
      setData(stats);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chart = useChart({
    data,
    series: [
      { name: "Alimentação", color: "blue.400", stackId: "a" },
      { name: "Hospedagem", color: "green.400", stackId: "a" },
      { name: "Transporte", color: "orange.400", stackId: "a" },
      { name: "Combustível", color: "purple.400", stackId: "a" },
      { name: "Papelaria", color: "gray.400", stackId: "a" },
    ],
    sort: { by: "date", direction: "asc" },
  });

  return (
    <Chart.Root chart={chart} maxH="md" color={"black"}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("gray.200")} vertical={false} />
        <XAxis
          axisLine={true}
          tickLine={true}
          dataKey={chart.key("date")}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={chart.formatNumber({
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
            signDisplay: "never",
          })}
        />
        <Legend content={<Chart.Legend />} />
        <Tooltip
          formatter={(value) =>
            typeof value === "number"
              ? new Intl.NumberFormat("pt-br").format(value)
              : value
          }
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            barSize={50}
            stackId={item.stackId}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
}
