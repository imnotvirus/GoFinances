export interface HighlightCardProps extends typeProps {
  title: string;
  amount: string;
  lastTransaction: string;
}
export interface typeProps {
  type: "up" | "down" | "total";
}
