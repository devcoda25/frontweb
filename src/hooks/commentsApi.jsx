import Api from 'src/api/AxiosInterceptors'
import { GET_COMMENT_BY_NEWS } from 'src/utils/api'

export const getCommentByNewsApi = {
  getCommentByNews: requestData => {
    const { offset, limit, news_id } = requestData
    return Api.get(GET_COMMENT_BY_NEWS, {
      params: {
        news_id,
        offset,
        limit
      }
    })
  }
}
