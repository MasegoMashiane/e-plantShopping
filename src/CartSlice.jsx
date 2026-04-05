import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload;

        const existinItem = state.items.find(
            item => item.id === newItem.id
        );
        // If the item exists then i9ncrement the quantity, 
        // otherwise add new item with quantity = 1

        if (existinItem){
            existinItem.quantity++;
        } else {
            state.items.push({...newItem, quantity: 1});
        }
    },
    removeItem: (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;

        const item = state.items.find(item => item.id === id);

        if(item){
            item.quantity = quantity;

            //safeguard to remove item if quantity <= 0
            if (item.quantity <= 0){
                state.items = state.items.filter( i => i.id !== id);
            }
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;