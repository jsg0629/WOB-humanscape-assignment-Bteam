import axios, { AxiosError, AxiosResponse } from 'axios'
import { IDiseaseError } from 'types/disease.d'

const DISEASE_BASE_URL = '/api/B551182/diseaseInfoService/getDissNameCodeList'

interface Params {
  pageNo?: string
  numOfRows?: string
  sickType?: string
  medTp?: string
  diseaseType?: string
  searchText: string
}
const axiosInstance = axios.create({
  timeout: 10 * 1000,
  withCredentials: false,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.response.body.items === '' || !response.data.response.body.items.item)
      return {
        data: '',
      }

    return { data: response.data.response.body.items.item }
  },
  (error: AxiosError) => {
    const errorMsg: IDiseaseError = { responseText: error.request.responseText, requestURL: error.config.url ?? '' }
    return Promise.reject(errorMsg)
  }
)

export const getDisease = (params: Params) =>
  axiosInstance.get(`${DISEASE_BASE_URL}`, {
    params: {
      serviceKey: process.env.REACT_APP_DISEASE_API_KEY,
      ...params,
    },
  })
