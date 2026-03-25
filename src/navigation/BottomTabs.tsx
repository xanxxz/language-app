import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Learn from '../screens/Learn';
import CustomTabBar from './CustomTabBar';
import Profile from '../screens/Profile';
import AdminScreen from '../screens/AdminScreen';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Tab.Navigator
      key={user?.role} // 👈 ВОТ СЮДА
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Главная" component={Home} />
      <Tab.Screen name="Уроки" component={Learn} />
      <Tab.Screen name="Профиль" component={Profile} />

      {user?.role === 'admin' && (
        <Tab.Screen name="Админ" component={AdminScreen} />
      )}
    </Tab.Navigator>
  );
}