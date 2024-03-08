import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find((item) => item.dish_id === action.payload.dish_id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action) => {
      let itemInCart = state.cart.find((item) => item.dish_id === action.payload.dish_id);
      if (itemInCart && itemInCart?.quantity === 1) {
        itemInCart.quantity = 0;
        const updatedCart = state.cart.filter((item) => item.dish_id !== action.payload.dish_id);
        state.cart = updatedCart;
      } else if(itemInCart) {
        itemInCart.quantity--;
      }
    },
  },
});

export default cartSlice.reducer;

export const {
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;