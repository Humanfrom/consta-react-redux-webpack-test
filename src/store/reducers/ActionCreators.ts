import {AppDispatch} from '../store'
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit'
import {transformToFakeData} from '../../utils'
import {itemsSlice} from './ItemsSlice'

export interface IApi {
    id: number;
    title: string;
    rating: number;
    stock: number;
}

//хелпер отчищающий список загруженных элементов
export const clearItems = () => (dispatch: AppDispatch) => {
  dispatch(itemsSlice.actions.clearItems())
}

//хелпер для последовательной загрузки элементов, если передаём 1 аргумент, то грузим с самого начала списка
export const getItems = (params: object) => async (dispatch: AppDispatch) => {
  try {
    //запускаем загрузку
    dispatch(itemsSlice.actions.getItemsList())
    //пытаемся подгрузить данные через API
    const response = await axios({
        method: 'get',
        url: 'https://dummyjson.com/products',
        params: params
      });
    console.log(response);
    //всё получилось загружаем в хранилище
    dispatch(itemsSlice.actions.getItemsListSuccess(
        transformToFakeData(response.data.products) as any //адаптация полей из API к полям проекта
      ))
  } catch (e: any) {
    dispatch(itemsSlice.actions.getItemsListError(e.message)) //обработка исключения
  }
}

//хелпер для обработки функции поиска
export const getSearchedItems = (query: string) => async (dispatch: AppDispatch) => {
  try {
    //запускаем загрузку
    dispatch(itemsSlice.actions.getItemsList())
    //пытаемся подгрузить данные через API
    const response = await axios({
        method: 'get',
        url: 'https://dummyjson.com/products/search',
        params: {
          q: query
        }
      });
    //всё получилось загружаем в хранилище
    dispatch(itemsSlice.actions.getSearchedItemsListSuccess(
      transformToFakeData(response.data.products) as any //адаптация полей из API к полям проекта
    ))

  } catch (e: any) {
    dispatch(itemsSlice.actions.getItemsListError(e.message)) //обработка исключения
  }
}
