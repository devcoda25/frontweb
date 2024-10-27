import Api from 'src/api/AxiosInterceptors'
import { GET_NEWS, SET_NEWS_VIEW, getLanguage } from 'src/utils/api'

// let { id: language_id } = getLanguage()
export const getNewsApi = {

  getNews: requestData => {
    const {
      offset,
      limit,
      id,
      get_user_news,
      search, // {optional}
      language_id,
      category_id,
      category_slug,
      subcategory_id,
      subcategory_slug,
      slug,
      tag_id,
      tag_slug,
      latitude,
      longitude
    } = requestData
    return Api.get(GET_NEWS, {
      params: {
        offset,
        limit,
        id,
        get_user_news,
        search, // {optional}
        language_id,
        category_id,
        category_slug,
        subcategory_id,
        subcategory_slug,
        slug,
        tag_id,
        tag_slug,
        latitude,
        longitude
      }
    })
  },
  setNewsView: requestData => {
    const { news_id } = requestData
    return Api.post(SET_NEWS_VIEW, {
      news_id
    })
  }
}
