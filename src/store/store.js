import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import listReducer from './slices/listSlice';
import { loadState } from '../services/localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    lists: listReducer,
  },
  preloadedState: persistedState
});

export default store; 