import { configureStore, combineReducers} from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';
import appDataReducer from './slices/appDataSlice';

const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Storage engine to use
  stateReconciler: autoMergeLevel2,
  whitelist: ['authentication', 'navigation', 'appData'], // Reducers to persist
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  authentication: authReducer,
  navigation: navReducer,
  appData: appDataReducer,
}));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };


export const clearAllStorage = () => ({
    type: 'persist/PURGE', // Use 'persist/PURGE' for redux-persist v6
    keys: ['authStorage', 'navStorage', 'appDataStorage'], // Add keys for all your slices
    result: () => null,
  });
