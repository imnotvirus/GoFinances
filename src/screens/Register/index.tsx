import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Form/Button";
import CategorySelectButton from "../../components/Form/CategorySelectButton";
import InputForm from "../../components/Form/InputForm";
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
import { Category, FormDataProps, RegisterProps } from "./types";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number()
      .typeError("informe um valor numérico")
      .positive("informe um valor positivo")
      .required("Valor é obrigatório"),
  })
  .required();

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (form: FormDataProps) => {
    if (!transactionType)
      return Alert.alert("Erro", "Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Erro", "Selecione uma categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Register</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && String(errors.name.message)}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && String(errors.amount.message)}
            />
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
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal onRequestClose={handleHideModal} visible={visibleModal}>
          <CategorySelectorModal
            category={category}
            setCategory={handleSelectCategory}
            closeSelectCategory={handleHideModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
