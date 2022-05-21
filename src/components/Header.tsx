import { FC } from 'react';
import { Text } from '@consta/uikit/Text';
import SearchLine, { TSearch } from './SearchLine'

//контейнерный элемент, который может быть переиспользуем, если мы хотим сделать более одного окна
const Header: FC<TSearch> = ({onSearch, onCancel}) => {

  return (
    <div className='header'>

      <Text
      align="left"
      font="primary"
      size="l"
      view="primary"
      weight="bold"
      >
      Заказы на производство
      </Text>

      <SearchLine
      onSearch={onSearch}
      onCancel={onCancel}
      />

    </div>
  );
}


export default Header;
