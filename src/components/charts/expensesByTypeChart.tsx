import { getExpensesStats } from "@/services/chartService";
import { Chart, useChart } from "@chakra-ui/charts";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define color mapping for known expense types
const COLORS: Record<string, string> = {
  Alimentação: "blue.400",
  Hospedagem: "green.400",
  Transporte: "orange.400",
  Combustível: "purple.400",
  Papelaria: "gray.400",
  default: "red.400",
};

export default function ExpensesByTypeChart(props: {
  startDate?: string;
  endDate?: string;
  period: string;
}) {
  const [data, setData] = useState<any[]>([]);
  const { startDate, endDate, period } = props;

  const fetchStats = async () => {
    try {
      const stats = await getExpensesStats(startDate, endDate, period);
      setData(stats);
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [period]);

  const dynamicSeries = useMemo(() => {
    const types = new Set<string>();

    data.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "date") {
          types.add(key);
        }
      });
    });

    return Array.from(types).map((type) => ({
      name: type,
      color: COLORS[type] || COLORS.default,
      stackId: "a",
    }));
  }, [data]);

  const chart = useChart({
    data,
    series: dynamicSeries,
    sort: { by: "date", direction: "asc" },
  });

  return (
    <Chart.Root chart={chart} maxH="md" color={"black"}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("gray.200")} vertical={false} />
        <XAxis
          axisLine={true}
          tickLine={false}
          dataKey={chart.key("date")}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          axisLine={true}
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
            key={String(item.name)}
            dataKey={chart.key(item.name) as string}
            fill={chart.color(item.color)}
            barSize={30}
            stackId={item.stackId}
            radius={3}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
}
