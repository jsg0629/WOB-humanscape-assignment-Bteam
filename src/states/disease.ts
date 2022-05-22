import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

import { IDiseaseError, IDiseaseItem } from 'types/disease.d'

export interface DiseaseState {
  diseaseList: IDiseaseItem[]
  error: IDiseaseError
}

const INITIAL_STATE: DiseaseState = {
  diseaseList: [],
  error: { requestURL: '', responseText: '' },
}

const systemSlice = createSlice({
  name: 'system',
  initialState: INITIAL_STATE,
  reducers: {
    setDiseaseList: (state: DiseaseState, action: PayloadAction<IDiseaseItem[]>) => {
      state.diseaseList = action.payload
    },
  },
})

export const { setDiseaseList } = systemSlice.actions

export default systemSlice.reducer

// Selector =====================

export const getDiseaseList = (state: RootState): IDiseaseItem[] => state.disease.diseaseList
