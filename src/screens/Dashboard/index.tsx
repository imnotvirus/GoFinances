import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { format, max } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

import HighlightCard from "../../components/HighlightCard";
import { typeProps } from "../../components/HighlightCard/types";
import TransactionCard from "../../components/TransactionCard";
import toReal from "../../utils/toReal";
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
    const dataLocal =
      (await AsyncStorage.getItem(dataKey).then(
        (result) => result && JSON.parse(result)
      )) ?? [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    const formattedData: DataListProps[] = dataLocal.map(
      (transaction: TransactionType) => {
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
      }
    );

    const lastTransactionEntries = dataLocal.some(
      (item: TransactionType) => item.type === "up"
    )
      ? format(
          max(
            dataLocal
              .filter((item: TransactionType) => item.type === "up")
              .map((item: TransactionType) => new Date(item.date))
          ),
          "PP",
          {
            locale: ptBR,
          }
        )
      : "";

    const lastTransactionExpensive = dataLocal.some(
      (item: TransactionType) => item.type === "down"
    )
      ? format(
          max(
            dataLocal
              .filter((item: TransactionType) => item.type === "down")
              .map((item: TransactionType) => new Date(item.date))
          ),
          "PPP"
        )
      : "";

    const totalInterval =
      lastTransactionExpensive === ""
        ? ""
        : `de 01 a ${lastTransactionExpensive}`;

    setData(formattedData);
    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: toReal(entriesTotal),
        lastTransaction:
          lastTransactionEntries === ""
            ? ""
            : `Ultima entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: toReal(expensiveTotal),
        lastTransaction:
          lastTransactionExpensive === ""
            ? ""
            : `Ultima saída saída ${lastTransactionExpensive}`,
      },
      total: {
        amount: toReal(total),
        lastTransaction: totalInterval,
      },
    });
  };

  const onLongPress = (arg0: DataListProps) => {
    Alert.alert("Atenção", `Deseja excluir o item ${arg0.title}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => {
          const newData = data.filter((item) => item.id !== arg0.id);
          AsyncStorage.setItem(dataKey, JSON.stringify(newData));
          getItens();
        },
      },
    ]);
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
          renderItem={({ item }) => (
            <TransactionCard data={item} onLongPress={onLongPress} />
          )}
        />
      </Transaction>
    </Container>
  );
};

export default Dashboard;
