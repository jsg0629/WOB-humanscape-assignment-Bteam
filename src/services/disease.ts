import { axios } from 'hooks/worker'

const WEATHER_BASE_URL = '/api/B551182/diseaseInfoService/getDissNameCodeList'

interface Params {
  pageNo?: string
  numOfRows?: string
  sickType?: string
  medTp?: string
  diseaseType?: string
  searchText: string
}

axios.interceptors.response.use(
  (res) => {
    if (!res.data.response) {
      const errorMsg = { responseText: res.data, requestURL: res.config.url }
      return Promise.reject(errorMsg)
    }
    return res
  },
  (error) => {
    const errorMsg = { responseText: error.request.responseText, requestURL: error.config.url }
    return Promise.reject(errorMsg)
  }
)

export const getDisease = (params: Params) =>
  axios.get(`${WEATHER_BASE_URL}`, {
    timeout: 100000,
    params: {
      serviceKey: process.env.REACT_APP_DISEASE_API_KEY,
      ...params,
    },
  })
