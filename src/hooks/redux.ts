import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';

//указываем типы единожды, чтобы не делать этого при каждом использовании хуков
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
