import { combineReducers, configureStore } from '@reduxjs/toolkit'
import itemsReduser from './reducers/ItemsSlice';

//можно просто передавать текущий редюсер itemsReduser, это просто задел на будущее, так как один редюсер бывает редко
const rootReducer = combineReducers({
    itemsReduser
})

//настраиваем хранилище - передаём редюсер и настройки мидлвари
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

//заготовка, чтобы каждый раз не указывать тип
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
