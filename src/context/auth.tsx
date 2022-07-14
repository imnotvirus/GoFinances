import { createContext, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const AuthContext = createContext({} as IAuthContextData);

const AuthProvier: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      console.log(authUrl);
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const info = {
          email: userInfo.email,
          id: userInfo.id,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };
        setUser(info);
        await AsyncStorage.setItem("@gofinances:user", JSON.stringify(info));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credentials) {
        const info = {
          id: String(credentials.user!),
          name: String(credentials.fullName!.givenName!),
          email: String(credentials.email),
          photo: undefined,
        };
        setUser(info);
        await AsyncStorage.setItem("@gofinances:user", JSON.stringify(info));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
export { AuthProvier, useAuth };
