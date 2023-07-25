import { configureStore, ThunkAction, Action, combineReducers, createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit';
import userSilce from '../features/userSlice/UserSlice';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';


const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userSilce,
  
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefultMidllewate) => 
  getDefultMidllewate({
    serializableCheck: false
  })
})


export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;