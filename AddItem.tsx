// AddItem.tsx
// Screen: AddItem
// Purpose: shows a form for creating a new menu item and adding it to the global MenuContext.
// Sections:
//  - Dish Name input
//  - Description textarea
//  - Course selector (Starters/Mains/Desserts)
//  - Price input
//  - Bottom action buttons (Add / Clear / Cancel / Remove)
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { MenuContext, MenuItem } from './MenuContext';

const AddItem = ({ navigation }: { navigation: any }) => {
  // Access addItem from MenuContext to update the shared menu list
  const { addItem } = useContext(MenuContext);

  // Form state: name, description, price and selected course
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Desserts' | null>(null);

  // Local UI state for showing the course dropdown
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const courses = ["Starters", "Mains", "Desserts"] as const;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Add An Item</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.formContainer}>
          {/* Dish Name field */}
          <Text style={styles.label}>Dish Name</Text>
          <TextInput 
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter dish name"
          />

          {/* Description textarea for the dish */}
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter dish description"
            multiline
          />

          {/* Course selector - opens a small dropdown with course options */}
          <Text style={styles.label}>Select Course</Text>
          <View>
            <Pressable style={styles.input} onPress={() => setShowCourseOptions(!showCourseOptions)}>
              <Text style={styles.inputText}>{course || 'Select course'}</Text>
            </Pressable>
            {showCourseOptions && (
              <View style={styles.dropdown}>
                {courses.map((c, index) => (
                  <Pressable
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => { setCourse(c); setShowCourseOptions(false); }}
                  >
                    <Text style={styles.dropdownOptionText}>{c}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
          
          {/* Price input - numeric keyboard */}
          <Text style={styles.label}>Price</Text>
          <TextInput 
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="Enter price"
          />
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable 
            style={styles.button} 
            onPress={() => {
              if (!name || !description || !course || !price) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
              }
              
              const newItem: MenuItem = {
                name,
                description,
                course,
                price
              };
              
              addItem(newItem);
              Alert.alert('Success', 'Item added successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          {/* Clear button: reset the form fields */}
          <Pressable style={styles.button} onPress={() => {
            setName('');
            setDescription('');
            setPrice('');
            setCourse(null);
          }}>
            <Text style={styles.buttonText}>Clear</Text>
          </Pressable>

          {/* Cancel button: go back to previous screen without saving */}
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          {/* Remove shortcut: navigate to RemoveItem screen */}
          <Pressable style={styles.button} onPress={() => navigation.navigate('RemoveItem')}>
            <Text style={styles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// Styles for the AddItem screen. Keep them small and focused on layout.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    justifyContent: 'center',
    minHeight: 44,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: -15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'green',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default AddItem;