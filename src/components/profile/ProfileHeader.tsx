import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  username: string;
  email: string;
};

export const ProfileHeader = ({ username, email }: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {username?.[0]?.toUpperCase()}
        </Text>
      </View>

      <View>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});