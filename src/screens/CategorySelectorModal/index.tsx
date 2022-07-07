import React from "react";
import { FlatList, Text } from "react-native";
import Button from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { CategorySelectorModalProps } from "./types";

const CategorySelectorModal: React.FC<CategorySelectorModalProps> = ({
  category,
  closeSelectCategory,
  setCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCategory(item)}
            isSelected={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />
      <Footer>
        <Button title="Cadastrar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};

export default CategorySelectorModal;
