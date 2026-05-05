import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';

// Define types
export interface Product {
  id: string;
  name: string;
  price: number;
  image?: any;
  quantity: number;
}

export interface CartItem extends Product { }

// Initial Inventory (dummy data)
const initialInventory: Product[] = [
  {
    id: '2402224351',
    name: 'Total 15w40 4L',
    price: 1220,
    image: product1,
    quantity: 50, // Initial stock
  },
  {
    id: '2409312852',
    name: 'Shell HX Lube 3L',
    price: 1200,
    image: product2,
    quantity: 40,
  },
  {
    id: '2408235353',
    name: 'Zic 20w50 4L',
    price: 1500,
    image: product3,
    quantity: 30,
  },
];

// Inventory Slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: initialInventory,
  reducers: {
    addInventoryItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        // Optionally update price or name if needed, but usually just adding stock
        existingItem.price = action.payload.price;
        existingItem.name = action.payload.name;
      } else {
        state.push(action.payload);
      }
    },
    deductInventory: (state, action: PayloadAction<{ id: string; quantity: number }[]>) => {
      action.payload.forEach(deduction => {
        const item = state.find(i => i.id === deduction.id);
        if (item) {
          item.quantity = Math.max(0, item.quantity - deduction.quantity);
        }
      });
    },
  },
});

export const { addInventoryItem, deductInventory } = inventorySlice.actions;

// Cart Slice
const initialCart: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem & { cartQuantity?: number }>) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      const addQty = action.payload.cartQuantity || 1;
      if (existingItem) {
        existingItem.quantity += addQty;
      } else {
        state.push({ ...action.payload, quantity: addQty });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => initialCart,
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Auth Slice
interface AuthState {
  user: any | null;
  isLoading: boolean;
}

const initialAuth: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

// Configure Store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    inventory: inventorySlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
