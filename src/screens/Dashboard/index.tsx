import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

import HighlightCard from "../../components/HighlightCard";
import { typeProps } from "../../components/HighlightCard/types";
import TransactionCard from "../../components/TransactionCard";
import { TransactionType } from "../Register/types";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
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

const dataKey = "@GoFinances:transaction";

interface data {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: data;
  expensive: data;
  total: data;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataListProps[]>([]);

  const toReal = (value: number | string) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const [highlightData, setHighlightData] = useState<HighlightData>({
    entries: { amount: toReal(0), lastTransaction: "" },
    expensive: { amount: toReal(0), lastTransaction: "" },
    total: { amount: toReal(0), lastTransaction: "" },
  });
  const getLastTransaction = (
    collection: TransactionType[],
    { type }: typeProps
  ) => {
    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(
      new Date(
        Math.max.apply(
          Math,
          collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        )
      )
    );
  };

  const getItens = async () => {
    const dataLocal: TransactionType[] =
      (await AsyncStorage.getItem(dataKey).then(
        (result) => result && JSON.parse(result)
      )) ?? [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    const formattedData: DataListProps[] = dataLocal.map((transaction) => {
      if (transaction.type === "up") {
        entriesTotal += Number(transaction.amount);
      }
      if (transaction.type === "down") {
        expensiveTotal += Number(transaction.amount);
      }

      const amount = toReal(transaction.amount);

      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "2-digit",
      }).format(new Date(transaction.date));

      return {
        id: transaction.id,
        title: transaction.name,
        amount,
        date,
        type: String(transaction.type),
        category: transaction.category,
      };
    });

    const lastTransactionEntries = getLastTransaction(dataLocal, {
      type: "up",
    });

    const lastTransactionExpensive = getLastTransaction(dataLocal, {
      type: "down",
    });

    setData(formattedData);
    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima saída saída ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Ultima saída lastTransactionEntries`,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      getItens();
    }, [])
  );

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="entradas"
          amount={highlightData.entries.amount}
          lastTransaction={highlightData.entries.lastTransaction}
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount={highlightData.expensive.amount}
          lastTransaction={highlightData.expensive.lastTransaction}
          type="down"
        />
        <HighlightCard
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
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
