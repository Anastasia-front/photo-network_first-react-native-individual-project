import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth } from "../../firebase/config";

const AuthCheckScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Проверка статуса авторизации
      const user = auth.currentUser;
      if (user) {
        // Если пользователь авторизован, перенаправляем на экран PostsScreen
        navigation.replace("Posts");
      } else {
        // Если пользователь не авторизован, перенаправляем на экран LoginScreen
        navigation.replace("Login");
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthCheckScreen;
