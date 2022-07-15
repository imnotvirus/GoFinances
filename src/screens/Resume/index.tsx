import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { VictoryPie } from "victory-native";
import HistoryCard from "../../components/HistoryCard";
import { useAuth } from "../../context/auth";
import { categories } from "../../utils/categories";
import toReal from "../../utils/toReal";
import { TransactionType } from "../Register/types";

import {
  Container,
  Header,
  Title,
  ContentHeader,
  ContentGraph,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from "./styles";
import { CategoryData, ResumeProps } from "./types";

const Resume: React.FC<ResumeProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState<CategoryData[]>([]);

  const theme = useTheme();
  const { user } = useAuth();
  const dataKey = `@GoFinances:transaction:userId&${user.id}`;

  const handleChangeDate = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
      );
    } else {
      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
      );
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    const dataLocal: TransactionType[] =
      (await AsyncStorage.getItem(dataKey).then(
        (result) => result && JSON.parse(result)
      )) ?? [];

    const expensive = dataLocal.filter(
      (item) =>
        item.type === "down" &&
        new Date(item.date).getMonth() === selectedDate.getMonth() &&
        new Date(item.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensive.reduce((acc, item) => {
      return acc + parseFloat(item.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;
      expensive.forEach((item) => {
        if (item.category === category.key) {
          categorySum += parseFloat(item.amount);
        }
      });

      if (categorySum > 0) {
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          name: category.name,
          amount: toReal(categorySum),
          color: category.color,
          key: category.key,
          total: categorySum,
          percent,
        });
      }
    });

    setData(totalByCategory);
    setLoading(false);
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <FlatList
        data={data}
        ListHeaderComponent={
          <ContentHeader>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleChangeDate("prev")}>
                <SelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>
                {Intl.DateTimeFormat("pt-BR", {
                  month: "long",
                  year: "numeric",
                }).format(selectedDate)}
              </Month>

              <MonthSelectButton onPress={() => handleChangeDate("next")}>
                <SelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>
            {!loading && data.length > 0 && (
              <ContentGraph>
                <VictoryPie
                  data={data}
                  colorScale={data.map((item) => item.color)}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  labelRadius={80}
                  x="percent"
                  y="total"
                />
              </ContentGraph>
            )}
          </ContentHeader>
        }
        keyExtractor={(item: CategoryData) => item.key}
        contentContainerStyle={{
          paddingHorizontal: 24,
          flexGrow: 1,
        }}
        ListEmptyComponent={() =>
          loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Nenhuma transação encontrada</Text>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: CategoryData }) =>
          !loading ? (
            <HistoryCard
              amount={item.amount}
              color={item.color}
              title={item.name}
            />
          ) : null
        }
      />
    </Container>
  );
};

export default Resume;
