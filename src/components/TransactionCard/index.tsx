import React from "react";
import { View } from "react-native";
import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";
import { TransactionCardProps } from "./types";

const TransactionCard: React.FC<TransactionCardProps> = ({
  data,
  onLongPress,
}) => {
  const category = categories.find((item) => item.key === data.category);
  return (
    <Container onLongPress={() => onLongPress(data)}>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "down" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category!.icon} />
          <CategoryName>{category!.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
