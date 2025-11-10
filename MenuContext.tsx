import React, { createContext, useState, ReactNode } from 'react';
import { initialMenuItems } from './menuData';

export type MenuItem = {
  name: string;
  price: string;
  course: 'Starters' | 'Mains' | 'Desserts';
  description: string;
};

type MenuContextType = {
  items: MenuItem[];            // Array of all menu items
  addItem: (item: MenuItem) => void;     // Function to add a new item
  removeItem: (index: number) => void;    // Function to remove an item by index
};


export const MenuContext = createContext<MenuContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

// Provider component that wraps the app and provides menu state
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  // Initialize menu items with data from menuData.ts
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems);

  // Add new item to the start of the list
  const addItem = (item: MenuItem) => setItems((s) => [item, ...s]);
  
  // Remove item at the specified index
  const removeItem = (index: number) => setItems((s) => s.filter((_, i) => i !== index));

  // Provide state and functions to all child components
  return <MenuContext.Provider value={{ items, addItem, removeItem }}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
