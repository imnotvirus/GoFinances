import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
export { Routes };
