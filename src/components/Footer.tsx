import {FC, useState, useEffect} from 'react';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text';
import { TParams } from '../App'

type TCount = {
  label: string;
  number: number;
};

type TFooter = {
  currentCount: number;
  onGetItmes: Function;
  isSearch: boolean;
}

//контейнерный элемент, который может быть переиспользуем, если мы хотим сделать более одного окна
const Footer: FC<TFooter> = ({ currentCount, onGetItmes, isSearch }) => {

  //варианты количества догружаемых страниц
  const count: TCount[] = [
    { label:'1', number: 1 },
    { label:'5' , number: 5 },
    { label:'10', number: 10 },
    { label:'20', number: 20 },
    { label:'50', number: 50 }
  ];

  const [selectedCount, setSelectedCount] = useState<TCount>(count[2]) //выбранная опция на данный момент
  const [totalCount, setTotalCount] = useState<number>(currentCount) //количество элементов для загрузки

  //следим за массивом загруженных элементов и обновляем когда загрузилось
  useEffect(() => {
    setTotalCount(currentCount)
  },[currentCount])

  //обработчик кнопки подгрузки
  const onClickGetMoreItems = () => {
    setTotalCount(currentCount + selectedCount.number) //указываем сколько должно быть загружено
    onGetItmes(selectedCount.number) //начинаем загрузку пака элементов
  }

  return (
    <div className="footer">

        <Text size="s">Загружено: {`${currentCount} из ${totalCount}`}</Text>

        <Button
        label={`Показать ещё ${selectedCount?.label}`}
        view="ghost"
        size='s'
        onClick={onClickGetMoreItems}
        disabled={isSearch}
        />

        <div className='footer-select'>

            <Text size="s" style={{width: 120}}>Показывать по </Text>

            <Select
            style={{width: 70}}
            getItemKey={(item) => item.label}
            items={count}
            value={selectedCount}
            onChange={({ value }) => setSelectedCount(value || selectedCount)}
            size='s'
            />

        </div>

    </div>
  );
}


export default Footer;
