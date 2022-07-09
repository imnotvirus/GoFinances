import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesParamList } from "../../routes/app.routes";

export interface RegisterProps {}
export interface Category {
  name: string;
  key: string;
}
export interface FormDataProps {
  [name: string]: any;
}
export interface TransactionType {
  name: string;
  amount: string;
  category: string;
  type: string;
}
export interface RegisterNavigationProp
  extends BottomTabNavigationProp<AppRoutesParamList, "Cadastrar"> {}
