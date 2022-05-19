import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

import { IDiseaseError, IDiseaseItem } from 'types/disease.d'

export interface DieaseState {
  diseaseList: IDiseaseItem[]
  error: IDiseaseError
}

const INITIAL_STATE: DieaseState = {
  diseaseList: [],
  error: { requestURL: '', responseText: '' },
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setDiseaseList: (state: DieaseState, action: PayloadAction<IDiseaseItem[]>) => {
      state.diseaseList = action.payload
    },
    setError: (state: DieaseState, action: PayloadAction<IDiseaseError>) => {
      state.error = action.payload
    },
  },
})

export const { setDiseaseList, setError } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getDieaseList = (state: RootState): IDiseaseItem[] => state.disease.diseaseList
export const getDieaseError = (state: RootState): IDiseaseError => state.disease.error
