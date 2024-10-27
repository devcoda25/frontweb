import Api from 'src/api/AxiosInterceptors'
import { GET_CATEGORIES } from 'src/utils/api'

export const CategoriesApi = {
  getCategories: requestData => {
    const { offset, limit, language_id, slug } = requestData
    return Api.get(GET_CATEGORIES, {
      params: {
        offset,
        limit,
        language_id,
        slug
      }
    })
  },
}
