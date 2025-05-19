"use client";

import {
  BarSegment,
  BarSegmentData,
  useChart,
  UseChartReturn,
} from "@chakra-ui/charts";

export default function RequestStatusChart() {
  const chart: UseChartReturn<BarSegmentData> = useChart({
    data: [
      { value: 1000.1, name: "Aprovado", color: "green.solid" },
      { value: 4000, name: "Em análise", color: "yellow.solid" },
      { value: 2000, name: "Recusado", color: "red.solid" },
    ],
    sort: { by: "name", direction: "asc" },
  });

  return (
    <BarSegment.Root
      chart={chart}
      color={"black"}
      barSize="5"
    >
      <BarSegment.Content>
        <BarSegment.Value />
        <BarSegment.Bar borderRadius={"lg"} gap={1} />
      </BarSegment.Content>
      <BarSegment.Legend
        justify={"center"}
        showValue={true}
        valueFormatter={(value) => `R\$${value.toFixed(2).toString()}`}
        gap={"10"}
      />
    </BarSegment.Root>
  );
}
