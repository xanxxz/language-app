import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { AuthContext } from '../utils/AuthContext';

type Props = {
  state: any;
  navigation: any;
};

export default function CustomTabBar({ state, navigation }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        let iconName: any = 'ellipse';

        if (route.name === 'Главная') iconName = 'home';
        if (route.name === 'Уроки') iconName = 'book';
        if (route.name === 'Профиль') iconName = 'person';
        if (route.name === 'Админ') iconName = 'settings';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFocused ? iconName : `${iconName}-outline`}
              size={24}
              color={isFocused ? colors.primary : colors.textSecondary}
            />

            <Text
              style={[
                styles.label,
                {
                  color: isFocused
                    ? colors.primary
                    : colors.textSecondary,
                },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 10,
    paddingTop: 6,
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});