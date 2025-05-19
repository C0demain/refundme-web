import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export default function InitialChart() {
  const chart = useChart({
    data: [
      { date: "2024-01-01", revenue: 1000 },
      { date: "2024-01-02", revenue: 2000 },
      { date: "2024-01-03", revenue: 1000 },
    ],
    series: [{ name: "revenue", color: "blue.500" }],
    sort: { by: "date", direction: "asc" },
  });

  return (
    <Chart.Root chart={chart} maxH="md">
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color("gray.200")} vertical={false} />
        <XAxis axisLine={true} tickLine={true} dataKey={chart.key("date")} />
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
        <Tooltip
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            radius={[5,5,0,0]}
            barSize={50}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
}
