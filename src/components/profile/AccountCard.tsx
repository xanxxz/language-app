import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  username: string;
  isEditing: boolean;
  name: string;
  setName: (v: string) => void;
  onEdit: () => void;
  onSave: () => void;
  isValid: boolean;
};

export const AccountCard = ({
  username,
  isEditing,
  name,
  setName,
  onEdit,
  onSave,
  isValid,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>👤 Аккаунт</Text>

      <View style={styles.row}>
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Имя пользователя</Text>

          {isEditing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoFocus
            />
          ) : (
            <Text style={styles.value}>{username}</Text>
          )}
        </View>

        <Pressable
          style={[
            styles.editBtn,
            isEditing && !isValid && styles.disabledBtn,
          ]}
          disabled={isEditing && !isValid}
          onPress={() => {
            if (isEditing) {
              onSave();
            } else {
              onEdit();
            }
          }}
        >
          <Text style={styles.editText}>
            {isEditing ? 'Сохранить' : 'Изменить'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    marginTop: 6,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  editBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    color: colors.textPrimary,
  },
});