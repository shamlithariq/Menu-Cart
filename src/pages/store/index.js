import { configureStore } from '@reduxjs/toolkit';
import menuSlice from '../store/menuList/menuSlice';
import cartSlice from '../store/menuList/cartSlice';
 
export const store = configureStore({
  reducer: {
    tableMenuList: menuSlice,
    cart: cartSlice,
  },
});