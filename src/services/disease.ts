import { axios } from 'hooks/worker'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
// 해당변수는 호스트가 localhost에서 클라이언트 서버를 열면 값이 없지만 다른 호스트를 사용시에는 netlify.toml에 설정해둔
// proxy값을 할당 받는다.

const DISEASE_BASE_URL = `${PROXY}/api/B551182/diseaseInfoService/getDissNameCodeList`

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

    if (res.data.response.body.items === '' || !res.data.response.body.items.item)
      return {
        data: '',
      }

    return { data: res.data.response.body.items.item }
  },
  (error) => {
    const errorMsg = { responseText: error.request.responseText, requestURL: error.config.url }
    return Promise.reject(errorMsg)
  }
)

export const getDisease = (params: Params) =>
  axios.get(`${DISEASE_BASE_URL}`, {
    timeout: 100000,
    params: {
      serviceKey: process.env.REACT_APP_DISEASE_API_KEY, // decoding 키
      ...params,
    },
  })
