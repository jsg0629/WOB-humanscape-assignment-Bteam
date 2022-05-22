import axios, { AxiosError, AxiosResponse } from 'axios'
import { IDiseaseError } from 'types/disease.d'

const PROXY = window.location.hostname === 'localhost' ? '/api/' : '/proxy/'
// 해당변수는 호스트가 localhost에서 클라이언트 서버를 열면 값이 없지만 다른 호스트를 사용시에는 netlify.toml에 설정해둔
// proxy값을 할당 받는다.

const DISEASE_BASE_URL = `${PROXY}B551182/diseaseInfoService/getDissNameCodeList`

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
    if (!response.data.response) {
      const errorMsg: IDiseaseError = { responseText: response.data, requestURL: response.config.url ?? '' }
      return Promise.reject(errorMsg)
    }

    if (response.data.response.body.items === '' || !response.data.response.body.items.item)
      return {
        data: '',
      }

    return { data: response.data.response.body.items.item }
  },
  (error: AxiosError) => {
    // TODO: 타입 정의 OR 수정
    const errorMsg: IDiseaseError = { responseText: error.request.responseText, requestURL: error.config.url ?? '' }
    return Promise.reject(errorMsg)
  }
)

export const getDisease = (params: Params) =>
  axiosInstance.get(`${DISEASE_BASE_URL}`, {
    params: {
      serviceKey: process.env.REACT_APP_DISEASE_API_KEY, // decoding 키
      ...params,
    },
  })
