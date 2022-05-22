import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface ICount {
  value: number
}

const INITIAL_STATE: ICount = {
  value: 1,
}

const countSlice = createSlice({
  name: 'count',
  initialState: INITIAL_STATE,
  reducers: {
    increment: (state: ICount) => {
      state.value += 1
    },
  },
})

export const { increment } = countSlice.actions

export default countSlice.reducer

export const countApi = (state: RootState) => state.count.value
