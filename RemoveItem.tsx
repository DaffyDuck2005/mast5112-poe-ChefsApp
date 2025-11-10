import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { MenuContext, MenuItem } from './MenuContext';

export default function RemoveItem({ navigation }: { navigation: any }) {
  const { items, removeItem } = useContext(MenuContext);

  const confirmRemove = (index: number, name: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeItem(index);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Remove Items</Text>
        <View style={styles.divider} />
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 160 }}>
        {items.map((item: MenuItem, index: number) => (
          <View key={index} style={styles.menuItemContainer}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemText}>{item.name}</Text>
              <Text style={styles.menuItemDesc} numberOfLines={1} ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>

            <Pressable style={styles.removeButton} onPress={() => confirmRemove(index, item.name)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.buttonText}>Menu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'green' },
  topContainer: { alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 10 },
  divider: { width: '100%', height: 2, backgroundColor: '#fff', marginVertical: 20 },
  scrollContainer: { flex: 1, paddingHorizontal: 20 },
  menuItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
  menuItemLeft: { flex: 1, paddingRight: 12 },
  menuItemText: { color: '#fff', fontSize: 18 },
  menuItemDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  removeButton: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  removeButtonText: { color: 'green', fontWeight: '600' },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 20, backgroundColor: 'green' },
  buttonWrapper: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
  button: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, minWidth: 120, alignItems: 'center' },
  buttonText: { color: 'green', fontSize: 18, fontWeight: '500' },
});
