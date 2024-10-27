import Api from 'src/api/AxiosInterceptors'
import { GET_PAGES } from 'src/utils/api'

export const getpagesApi = {
  getpages: requestData => {
    const { language_id, slug } = requestData
    return Api.get(GET_PAGES, {
      params: {
        language_id,
        slug,
      }
    })
  }
}
