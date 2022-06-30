interface Category {
  name: string;
  icon: string;
}
export interface Data extends typeProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
}
export interface TransactionCardProps {
  data: Data;
}
export interface typeProps {
  type: "positive" | "negative";
}
