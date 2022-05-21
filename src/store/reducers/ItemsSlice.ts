import {InterfaceItem} from '../../models/InterfaceItem';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

//интерфейс хранилища
interface ItemState {
  items: InterfaceItem[];
  isLoading: boolean;
  error: string;
}

//начальное состояние
const initialState: ItemState = {
  items: [],
  isLoading: false,
  error: ''
}

//основной слайс
export const itemsSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    //очищаем список элементов
    clearItems(state){
      state.items = []
      },
    //устанавливаем флаг загрузки
    getItemsList(state) {
        state.isLoading = true;
      },
    //получили данные, дописываем их в конец списка элементов
    getItemsListSuccess(state, action: PayloadAction<InterfaceItem[]>) {
        state.isLoading = false;
        state.error = '';
        state.items.push(...action.payload);
      },
    //получили данные по поиску, перезаполняем список элементов
    getSearchedItemsListSuccess(state, action: PayloadAction<InterfaceItem[]>) {
          state.isLoading = false;
          state.error = '';
          state.items = action.payload;
        },
    //записываем исключение
    getItemsListError(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.error = action.payload;
      }
  }
})

export default itemsSlice.reducer
