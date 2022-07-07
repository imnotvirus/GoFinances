import React, { useState } from "react";
import { Modal } from "react-native";
import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import Input from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import CategorySelectorModal from "../CategorySelectorModal";

import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsType,
} from "./styles";
import { Category, RegisterProps } from "./types";

const Register: React.FC<RegisterProps> = (props) => {
  const [transactionType, setTransactionType] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });

  const handleTransactionType = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleShowModal = () => {
    setVisibleModal(true);
  };

  const handleHideModal = () => {
    setVisibleModal(false);
  };

  const handleSelectCategory = (arg0: Category) => {
    setCategory(arg0);
  };

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionType("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionType("down")}
              isActive={transactionType === "down"}
            />
          </TransactionsType>
          <CategorySelectButton
            title={category.name}
            onPress={handleShowModal}
          />
        </Fields>
        <Button title="Enviar" />
      </Form>

      <Modal onRequestClose={handleHideModal} visible={visibleModal}>
        <CategorySelectorModal
          category={category}
          setCategory={handleSelectCategory}
          closeSelectCategory={handleHideModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
