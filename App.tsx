import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilterScreen from './Filter';
import StarterScreen from './Starter';
import MainsScreen from './Mains';
import DessertScreen from './Dessert';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';
import { MenuContext, MenuProvider } from './MenuContext';

const Stack = createStackNavigator();

function MenuScreen({ navigation }: { navigation: any }) {
  const { items } = useContext(MenuContext);
  const [showDescriptionOverlay, setShowDescriptionOverlay] = useState(false);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.divider} />
        <Text style={styles.itemCount}>{items.length} Items</Text>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 160 }}>
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              if (showDescriptionOverlay && selectedItemDescription === item.description) {
                setShowDescriptionOverlay(false);
                setSelectedItemDescription(null);
              } else {
                setSelectedItemDescription(item.description ?? 'No description available.');
                setShowDescriptionOverlay(true);
              }
            }}
          >
            <View style={styles.menuItemContainer}>
              <View style={styles.menuItemLeft}>
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </View>
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
          }}
        >
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionBoxText}>{selectedItemDescription}</Text>
          </View>
        </Pressable>
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.buttonText}>Filter</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AddItem')}>
            <Text style={styles.buttonText}>Add Item</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: 'green' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitle: '',
          }}
        >
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: '' }} />
          <Stack.Screen name="AddItem" component={AddItem} options={{ title: '' }} />
          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: '' }} />
          <Stack.Screen name="RemoveItem" component={RemoveItem} options={{ title: '' }} />
          <Stack.Screen name="Starters" component={StarterScreen} options={{ title: '' }} />
          <Stack.Screen name="Mains" component={MainsScreen} options={{ title: '' }} />
          <Stack.Screen name="Desserts" component={DessertScreen} options={{ title: '' }} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'green' },
  topContainer: { alignItems: 'center', paddingTop: 30 },
  title: { fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 10 },
  itemCount: { color: '#fff', fontSize: 16, marginTop: 10 },
  scrollContainer: { flex: 1, paddingHorizontal: 20 },
  menuItemContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
  menuItemText: { color: '#fff', fontSize: 18 },
  menuItemPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  menuItemLeft: { flex: 1, paddingRight: 12 },
  menuItemDescription: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 6 },
  fullDescriptionOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 120, // fits between top and bottom dividers
    bottom: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  descriptionBox: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.95)',
    padding: 18,
    justifyContent: 'center',
  },
  descriptionBoxText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 20, backgroundColor: 'green' },
  buttonWrapper: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 },
  button: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, minWidth: 120, alignItems: 'center' },
  buttonText: { color: 'green', fontSize: 18, fontWeight: '500' },
  divider: { width: '100%', height: 2, backgroundColor: '#fff', marginVertical: 20 },
});
