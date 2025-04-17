import { createSlice,configureStore } from '@reduxjs/toolkit';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';

const initialState = [
  {
    id: '2402224351',
    name: 'Total 15w40 4L',
    price: '1220',
    image: product1,
    quantity: 1,
  },
  {
    id: '2409312852',
    name: 'Shell HX Lube 3L',
    price: '1200',
    image: product2,
    quantity: 1,
  },
  {
    id: '2408235353',
    name: 'Zic 20w50 4L',
    price: '1500',
    image: product3,
    quantity: 1,
  },
];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
        const existingItem = state.find(item => item.id === action.payload.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.push({ ...action.payload, quantity: 1 });
        }
        },
        incrementQuantity: (state, action) => {
          const item = state.find(item => item.id === action.payload);
          if (item) {
            item.quantity += 1;
          }
        },
        decrementQuantity: (state, action) => {
          const index = state.findIndex(item => item.id === action.payload);
          if (index !== -1) {
            if (state[index].quantity > 1) {
              state[index].quantity -= 1;
            } else {
              state.splice(index, 1); // Remove item if quantity reaches 0
            }
          }},
          removeFromCart: (state, action) => {
            // Make sure we're using action.payload.id
            return state.filter(item => item.id !== action.payload.id);
          },
        clearCart: () => initialState,
    },
});
export const { addToCart, removeFromCart, clearCart,incrementQuantity,decrementQuantity} = cartSlice.actions;
 export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
