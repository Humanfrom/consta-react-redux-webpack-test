import React, {FC, useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from './hooks/redux';
import {getItems} from './store/reducers/ActionCreators'
import Item from './components/Item'

const App: FC = () => {
  const [params, setParams] = useState({q:'x', limit: 10})
  const {items, isLoading, error} = useAppSelector(state => state.itemsReduser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getItems(params))
  },[])

  return (
    <div>
      <h1>START</h1>
      {isLoading && <h1>Загрузка...</h1>}
      {error && <h1>Ошибка. Не удалось загрузить данные...</h1>}
      {items.map(item =>
        <Item itemData={item}/>
      )}
    </div>
  );
}


export default App;
