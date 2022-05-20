import {InterfaceItem} from '../models/InterfaceItem';
import {IApi} from '../store/reducers/ActionCreators'

//функция, которыая преобразует значения API в фейковые значения интерфейса
export const transformToFakeData = (responseData: IApi[]) => {
  //получаем дату; 86400000 - количество миллисекунд в одном дне
  const getDate = (addDays: number) => new Date ( Date.now() + 86400000 * addDays);
  //по хорошему, вычисления надо проводить в отдельных функциях подобных getDate(), но некоторые параметры просто придуманы, поэтому это не имеет смысла
  return responseData.map((item, i) => ({
    id: responseData[i].id,
    orderDate: getDate(i),
    name: 'ЗП01-' + responseData[i].id,
    recipient: responseData[i].title,
    endDate: getDate(i + 1),
    state: Math.floor( (responseData[i].rating - 4) * 5 ),
    zone: 'Площадка ' + ( responseData[i].stock % 2 + 1 )
  })
  )
}
