import {FC} from 'react';

//основной интерфейс элемента списка
export interface InterfaceItem {
  id: string;
  orderDate: string;
  name: string;
  recipient: string;
  endDate: string;
  state: FC;
  zone: string;
}
