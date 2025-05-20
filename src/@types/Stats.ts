export default interface Stats {
  period: string;
  totalValue: number;
  types: { type: string; count: number }[];
}
