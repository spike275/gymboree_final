import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

/**
 * A custom hook to get the dispatch function with type inference.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();


/**
 * A custom hook to select data from the Redux store with type inference.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
