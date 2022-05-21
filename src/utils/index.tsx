import { IApi } from '../store/reducers/ActionCreators';
import { Badge } from '@consta/uikit/Badge';
import { Text } from '@consta/uikit/Text';

//функция, которыая преобразует значения API в фейковые значения интерфейса
export const transformToFakeData = (responseData: IApi[]) => {

  //функция для получения красивых состояний с цветным кружочком
  const getState = (rating: number) => {

    const states = [ 'Выполнено' , 'Выполняется' , 'Не выполняется' , 'Не выполнено', 'Может потом' ];
    const bages = [ "success", "normal"  , "error" , "warning", "system" ] as any;
    const index = Math.floor( (rating - 4) * 5 );

    return <div className='flex-row container'>
            <Badge
            style={{margin: 5}}
            status={ bages[index] }
            size='s'
            minified
            />
            <Text>{ states[index] }</Text>
          </div>
  }

  //получаем дату; 86400000 - количество миллисекунд в одном дне
  const getDate = (addDays: number) => new Date ( Date.now() + 86400000 * addDays);

  //по хорошему, вычисления надо проводить в отдельных функциях подобных getDate(), но некоторые параметры просто придуманы, поэтому это не имеет смысла
  return responseData.map((item, i) => ({
    id: responseData[i].id,
    orderDate: getDate(i).toLocaleDateString(),
    name: 'ЗП01-' + responseData[i].id,
    recipient: responseData[i].title,
    endDate: getDate(i + 1).toLocaleDateString(),
    state: getState(responseData[i].rating),
    zone: 'Площадка ' + ( responseData[i].stock % 2 + 1 )
  })
  )
}

/*
<Badge status="normal" label="Новый" /> /* маршрут готов, отправьте на проверку
<Badge status="success" label="Cойдёт" /> /* всё получилось, запускайте марсоход
<Badge status="error" label="Отстой" /> /* упс, постройте другой маршрут
<Badge status="warning" label="На проверке" /> /* подождите, маршрут проверяется
 */
