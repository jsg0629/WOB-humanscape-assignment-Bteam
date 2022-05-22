import { configureStore } from '@reduxjs/toolkit'

import disease from './disease'
import count from './count'

export const store = configureStore({
  reducer: {
    disease,
    count,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
