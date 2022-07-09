import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";

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
import {
  Category,
  FormDataProps,
  RegisterNavigationProp,
  RegisterProps,
  TransactionType,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const schema = Yup.object()
  .shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number()
      .typeError("informe um valor numérico")
      .positive("informe um valor positivo")
      .required("Valor é obrigatório"),
  })
  .required();
const dataKey = "@GoFinances:transaction";

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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation<RegisterNavigationProp>();
  const handleRegister = async (form: FormDataProps) => {
    if (!transactionType)
      return Alert.alert("Erro", "Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Erro", "Selecione uma categoria");

    const data = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };
    try {
      const dataLocal: TransactionType[] =
        (await AsyncStorage.getItem(dataKey).then(
          (result) => result && JSON.parse(result)
        )) ?? [];

      dataLocal.push(data);
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataLocal));
      Alert.alert("Cadastro realizado com sucesso");
      reset();
      setCategory({
        key: "category",
        name: "Categoria",
      });
      setTransactionType("");
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar a transação");
    }
  };

  async function init() {
    const dataLocal: TransactionType[] =
      (await AsyncStorage.getItem(dataKey).then(
        (result) => result && JSON.parse(result)
      )) ?? [];

    console.log(dataLocal);
  }
  const removeAll = async () => {
    await AsyncStorage.removeItem(dataKey);
  };
  useEffect(() => {
    init();
  }, []);

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
