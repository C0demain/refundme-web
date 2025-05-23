"use client";

import { getRequestsStats } from "@/services/chartService";
import {
  BarSegment,
  BarSegmentData,
  useChart,
  UseChartReturn,
} from "@chakra-ui/charts";
import { useEffect, useState } from "react";

export default function RequestsByStatusChart() {
  const [data, setData] = useState<any>([]);

  const matchColor = (name: string) => {
    switch (name) {
      case "Aprovado":
        return "green.solid";
      case "Pendente":
        return "yellow.solid";
      case "Recusado":
        return "red.solid";
      case "Rascunho":
        return "#aaaaaa";
      default:
        return "purple.solid";
    }
  };

  const fetchStats = async () => {
    try {
      const stats = await getRequestsStats();

      const order = ["Aprovado", "Pendente", "Recusado", "Rascunho"];

      const formattedStats = stats.map((entry) => ({
        value: entry.value,
        name: entry._id,
        color: matchColor(entry._id),
      }));

      const sortedStats = formattedStats.sort(
        (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
      );

      setData(sortedStats);
      console.log(sortedStats);
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chart: UseChartReturn<BarSegmentData> = useChart({
    data: data
  });

  return (
    <BarSegment.Root chart={chart} color={"black"} barSize="5" my={2}>
      <BarSegment.Content>
        <BarSegment.Label />
        <BarSegment.Bar borderRadius={"lg"} gap={1} />
        <BarSegment.Value />
      </BarSegment.Content>
    </BarSegment.Root>
  );
}
