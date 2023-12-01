import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { currencyReducer } from "./currency/currencySlice";

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["data"],
};

export const store = configureStore({
  reducer: {
    currency: persistReducer(currencyPersistConfig, currencyReducer),
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
