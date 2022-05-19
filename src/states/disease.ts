import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

import { IDiseaseItem } from 'types/disease.d'

export interface DieaseState {
  diseaseList: IDiseaseItem[]
}

const INITIAL_STATE: DieaseState = {
  diseaseList: [],
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setDiseaseList: (state: DieaseState, action: PayloadAction<IDiseaseItem[]>) => {
      state.diseaseList = action.payload
    },
  },
})

export const { setDiseaseList } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getDieaseList = (state: RootState): IDiseaseItem[] => state.disease.diseaseList
