import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit'
import {transformToFakeData} from '../../utils'

export interface IApi {
    id: number;
    title: string;
    rating: number;
    stock: number;
}

export const getItems = createAsyncThunk(
  'items/fetchAll',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {params})
      return transformToFakeData(response.data.products)
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
  }
)
