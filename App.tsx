import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { AuthProvider } from './src/utils/AuthContext';
import { useLessonStore } from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [loading, setLoading] = useState(true);

  const user = useLessonStore((s) => s.user);
  const fetchUser = useLessonStore((s) => s.fetchUser);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        await fetchUser(); // 👈 грузим пользователя
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {user ? (
          <AppNavigator />
        ) : (
          <AuthScreen onLogin={checkAuth} />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}