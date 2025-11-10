import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MenuContext, MenuItem } from './MenuContext';

export default function Dessert({ navigation }: { navigation: any }) {
  const { items } = useContext(MenuContext);
  const desserts = items.filter((i) => i.course === 'Desserts');
  const [showDescriptionOverlay, setShowDescriptionOverlay] = useState(false);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

  const handleItemTap = (item: MenuItem) => {
    if (showDescriptionOverlay && selectedItemDescription === item.description) {
      setShowDescriptionOverlay(false);
      setSelectedItemDescription(null);
    } else {
      setSelectedItemDescription(item.description ?? 'No description available.');
      setShowDescriptionOverlay(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Desserts</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {desserts.map((item, index) => (
            <Pressable key={index} onPress={() => handleItemTap(item)}>
              <View style={styles.menuItemContainer}>
                <Text style={styles.menuItemText}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>{item.price}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        {showDescriptionOverlay && (
          <Pressable
            style={styles.fullDescriptionOverlay}
            onPress={() => {
              setShowDescriptionOverlay(false);
              setSelectedItemDescription(null);
            }}>
            <Text style={styles.descriptionText}>{selectedItemDescription}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.buttonText}>Menu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 18,
  },
  menuItemPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    paddingBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  fullDescriptionOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
