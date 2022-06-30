import React from "react";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  Title,
  Transaction,
  TransactionList,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";
import { DataListProps } from "./types";

const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: "044ebb49-660a-4418-843a-b3b49aaebcaf",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
      date: "13/04/2020",
    },
    {
      id: "59409246-7f7d-48e4-a62c-921fbcaac70e",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "10/04/2020",
    },
    {
      id: "af72beff-2885-40a2-b654-01b691d93c6a",
      type: "negative",

      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        icon: "shopping-bag",
        name: "Casa",
      },
      date: "10/04/2020",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/11259073?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Luiz</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 06 de abril"
          type="total"
        />
      </HighlightCards>
      <Transaction>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transaction>
    </Container>
  );
};

export default Dashboard;
