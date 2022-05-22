import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import itemsReduser from './reducers/ItemsSlice';

//можно просто передавать текущий редюсер itemsReduser, это просто задел на будущее, так как один редюсер бывает редко
const rootReducer = combineReducers({
    itemsReduser
})

//настройка мидлвари, чтобы хранить не сериализуемые значения
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

//настраиваем хранилище - передаём редюсер и настройки мидлвари
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
  })
}

//заготовка, чтобы каждый раз не указывать тип
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
