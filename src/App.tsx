import {FC, useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from './hooks/redux';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Table } from '@consta/uikit/Table';
import { TableColumn } from '@consta/uikit/Table';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';

import Header from './components/Header'
import Footer from './components/Footer'
import { getItems, getSearchedItems, clearItems } from './store/reducers/ActionCreators'
import { tableColumnsData } from './models/TableColumnItems'
import './App.css'

export type TParams = {
  limit: number;
  skip: number;
}

const App: FC = () => {
  //сколько в начальном состоянии отображать товаров
  const defaultParams: TParams = {
    limit: 5,
    skip: 0
  };

  //хуки
  const {items, isLoading, error} = useAppSelector(state => state.itemsReduser) //данные из стора
  const [params, setParams] = useState<TParams>(defaultParams) //маркер количества загруженных элементов
  const [isSearch, setIsSearch] = useState(false) //блокировка подгрузки во время поиска
  const dispatch = useAppDispatch() //диспетчер

  //вгружаем описание заголовков столбцов таблицы
  const columns = tableColumnsData as TableColumn<typeof items[number]>[];

  //первично загружаем товары в список
  useEffect(() => {
    onGetItmes()
  },[])

  //функция получения списка товаров через API, если ничего не передаём, то выводим как при старте
  const onGetItmes = (count: number = 0) => {

    const newParams = count ? {
      limit: count,
      skip: params.skip + params.limit
    }
    :
    defaultParams
    //первый аргумент - сколько грузим товаров, второй - отступ от начала списка
    dispatch(getItems( newParams ));
    setParams( newParams );
  }

  //функция поиска - передаём строку поиска
  const onSearch = (query: string) => {
    dispatch(getSearchedItems(query)); //заполняем список
    setIsSearch(true); //блокируем подгрузку товаров
  }

  //функция отмены поиска
  const onCancelSearch = () => {
    dispatch(clearItems());
    setIsSearch(false); //разрешаем подгрузку товаров
    onGetItmes()
  }

  return (
    <Theme
    preset={presetGpnDefault}
    className='container'
    >
        <Card
        verticalSpace="2xl"
        horizontalSpace="2xl"
        className='card'
        >
            <div className="body-content">

              <Header
              onCancel={onCancelSearch}
              onSearch={onSearch}
              />

              <Table
              size="m"
              borderBetweenColumns
              borderBetweenRows
              columns={columns}
              rows={items}
              emptyRowsPlaceholder={
                //проверяем ситуации, когда в таблице могут отсутствовать элементы
                isLoading ?
                  <Loader/>
                  :
                  error ?
                    <Text>Не удалось загрузить данные (Ошибка: {error})</Text>
                    :
                    !items.length ?
                      <Text>Товары не найдены</Text>
                      : ''
              } />

            </div>

            <Footer
            onGetItmes={onGetItmes}
            currentCount={items.length}
            isSearch={isSearch}
            />

        </Card>
    </Theme>
  );
}

export default App;
