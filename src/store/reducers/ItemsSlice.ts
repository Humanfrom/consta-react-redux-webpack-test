import {InterfaceItem} from '../../models/InterfaceItem';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getItems} from './ActionCreators'

interface ItemState {
  items: InterfaceItem[];
  isLoading: boolean;
  error: string;
}

const initialState: ItemState = {
  items: [],
  isLoading: false,
  error: ''
}

export const itemsSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers:{
    [getItems.pending.type]: (state) => {
        state.isLoading = true;
      },
    [getItems.fulfilled.type]: (state, action: PayloadAction<InterfaceItem[]>) => {
        state.isLoading = false;
        state.error = ''
        state.items = action.payload
      },
    [getItems.rejected.type]: (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload
      }
  }
})

export default itemsSlice.reducer
