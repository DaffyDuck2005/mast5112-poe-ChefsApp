import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MenuContext } from './MenuContext';

export default function Main() {
  const { items } = useContext(MenuContext);
  const mains = items.filter((i) => i.course === 'Mains');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mains</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {mains.map((m, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.name}>{m.name}</Text>
            <Text style={styles.price}>{m.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'green', paddingTop: 30 },
  title: { fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 10 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  name: { color: '#fff', fontSize: 18 },
  price: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
