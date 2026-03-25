import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../utils/AuthContext";

type Props = {
  onLogin: () => Promise<void>;
};

export default function AuthScreen({ onLogin }: Props) {
  const { login, register } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // 👈 новое поле

  const submit = async () => {
    if (isLogin) {
      await login(email, password);
    } else {
      await register(email, password, username); // 👈 передаём username
    }

    await onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {isLogin ? "Добро пожаловать 👋" : "Создать аккаунт"}
        </Text>

        {/* 👇 Показываем только при регистрации */}
        {!isLogin && (
          <TextInput
            placeholder="Username"
            placeholderTextColor="#999"
            onChangeText={setUsername}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Text>
        </Pressable>

        <Text style={styles.switchText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Нет аккаунта? Зарегистрироваться"
            : "Уже есть аккаунт? Войти"}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  switchText: {
    marginTop: 15,
    textAlign: "center",
    color: "#4f46e5",
  },
});