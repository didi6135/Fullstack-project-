import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'


const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
}

const rootReducer = combineReducers({
  user: userSlice,
   
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