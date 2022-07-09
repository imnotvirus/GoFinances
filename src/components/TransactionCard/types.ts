export interface Data {
  title: string;
  amount: string;
  category: string;
  date: string;
  type: string;
}
export interface TransactionCardProps {
  data: Data;
}
export interface typeProps {
  type: "up" | "down";
}
