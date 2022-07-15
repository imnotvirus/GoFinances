export interface Data {
  title: string;
  amount: string;
  category: string;
  date: string;
  type: "up" | "down";
  id: string;
}
export interface TransactionCardProps {
  data: Data;
  onLongPress: (arg0: Data) => void;
}
export interface typeProps {
  type: "up" | "down";
}
