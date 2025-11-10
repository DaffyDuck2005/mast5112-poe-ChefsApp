import React, { createContext, useState, ReactNode } from 'react';
import { initialMenuItems } from './menuData';

export type MenuItem = {
  name: string;
  price: string;
  course: 'Starters' | 'Mains' | 'Desserts';
  description: string;
};

type MenuContextType = {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (index: number) => void;
};

export const MenuContext = createContext<MenuContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>(initialMenuItems);

  const addItem = (item: MenuItem) => setItems((s) => [item, ...s]);
  const removeItem = (index: number) => setItems((s) => s.filter((_, i) => i !== index));

  return <MenuContext.Provider value={{ items, addItem, removeItem }}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
