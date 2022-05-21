import {FC, useState} from 'react';
import { TextField } from '@consta/uikit/TextField';
import { IconSearch } from '@consta/uikit/IconSearch'
import { IconClose } from '@consta/uikit/IconClose'
import { IconComponent  } from '@consta/uikit/Icon'
import { Button } from '@consta/uikit/Button'

export type TSearch = {
  onSearch: Function;
  onCancel: Function;
}

//строка поиска
const SearchLine: FC<TSearch> = ({onSearch, onCancel}) => {
  const [searchQuery, setSearchQuery] = useState<string | null>('') //текстфилд строки поиска

  //создание нажимаемой иконки, чтобы поместить её в пропс текстфилда
  const pressableCancelIcon: IconComponent = () => (
    <IconClose
    size='xs'
    view="ghost"
    onClick={() => {
      setSearchQuery('')
      onCancel()
    }}
    />)

  return (
    <div className="search-line">

        <TextField
        placeholder="Поиск"
        form="defaultClear"
        style={{ width: '245px' }}
        size='s'
        value={searchQuery}
        onChange={({ value }) => setSearchQuery(value)}
        rightSide={pressableCancelIcon}
        />

        <Button
        view="secondary"
        iconLeft={IconSearch}
        size='s'
        form="brickDefault"
        onClick={() => onSearch(searchQuery)}
        onlyIcon
        />

    </div>
  );
}


export default SearchLine;
