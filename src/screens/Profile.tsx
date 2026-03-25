import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '../theme/colors';
import { useLessonStore } from '../store/store';

import { ProfileHeader } from '../components/profile/ProfileHeader';
import { AccountCard } from '../components/profile/AccountCard';
import { StatsCard } from '../components/profile/StatsCard';
import { LevelCard } from '../components/profile/LevelCard';
import { LanguageCard } from '../components/profile/LanguageCard';

export default function Profile() {
  const { user, setLanguage, updateUser, logout } = useLessonStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) setName(user.username);
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Нет пользователя</Text>
      </View>
    );
  }

  const isValid =
    name.trim().length > 0 && name.trim() !== user.username;

  const handleSave = () => {
    if (!isValid) return;
    updateUser(name.trim());
    setIsEditing(false);
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();

        if (isEditing) {
          if (isValid) {
            handleSave();
          } else {
            setIsEditing(false);
            setName(user.username);
          }
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Профиль</Text>

        <ProfileHeader username={user.username} email={user.email} />

        <AccountCard
          username={user.username}
          isEditing={isEditing}
          name={name}
          setName={setName}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          isValid={isValid}
        />

        <LanguageCard
          current={user.language_code}
          onChange={setLanguage}
        />


        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 36,
  },
  logoutBtn: {
    marginTop: 10,
    marginInline: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FF4D4D',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});