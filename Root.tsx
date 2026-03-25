import { useContext } from "react";
import { AuthContext } from "./src/utils/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthScreen from "./src/screens/AuthScreen";
import { Text } from "react-native";

export default function Root() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return user ? <AppNavigator /> : <AuthScreen onLogin={function (): Promise<void> {
    throw new Error("Function not implemented.");
  } } />;
}