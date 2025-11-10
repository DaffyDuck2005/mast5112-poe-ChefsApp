// Starter.tsx
// Screen: Starter
// Purpose: Displays all starter menu items
// Features:
//  - Filters and shows only starter items
//  - Interactive item descriptions on tap
//  - Shows name and price for each item
//  - Uses same overlay pattern as main menu

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import { useContext } from 'react';
import { MenuContext, MenuItem } from './MenuContext';

export default function Starter({ navigation }: { navigation: any }) {
  // Get menu items from context and filter to show only starters
  const { items } = useContext(MenuContext);
  const starters = items.filter((i) => i.course === 'Starters');

  // State for managing the description overlay
  const [showDescriptionOverlay, setShowDescriptionOverlay] = useState(false);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

  // Toggle description overlay when an item is tapped
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
        <Text style={styles.title}>Starters</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {starters.map((item, index) => (
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
    paddingTop: 40, // Adjusted to move content up
  },
  title: {
    color: '#fff',
    fontSize: 30, // Consistent with App.tsx title
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  mainContentArea: {
    flex: 1, // Takes up available space between top and bottom
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    paddingBottom: 40, // Consistent with App.tsx
    backgroundColor: 'rgba(255,255,255,0.03)', // Consistent with App.tsx
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'center', // Center the single button
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 12, // Consistent with App.tsx
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'green',
    fontSize: 20, // Consistent with App.tsx
    fontWeight: '600', // Consistent with App.tsx
  },
  scrollContainer: {
    flex: 1, // Takes up available space
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
    borderBottomColor: 'rgba(255,255,255,0.1)', // Light divider for items
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
