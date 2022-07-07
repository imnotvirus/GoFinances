import React, { useState } from "react";
import Button from "../../components/Form/Button";
import CategorySelect from "../../components/Form/CategorySelect";
import Input from "../../components/Form/Input";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from "./styles";
import { RegisterProps } from "./types";

const Register: React.FC<RegisterProps> = (props) => {
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionType = (type: "up" | "down") => {
    setTransactionType(type);
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
          <CategorySelect title="categoria" />
        </Fields>
        <Button title="Button" />
      </Form>
    </Container>
  );
};

export default Register;
