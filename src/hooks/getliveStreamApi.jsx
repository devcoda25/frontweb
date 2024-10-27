import Api from 'src/api/AxiosInterceptors'
import { GET_LIVE_STREAMING } from 'src/utils/api'

export const getLiveStreamingApi = {
  getLiveStreaming: requestData => {
    const { language_id, offset, limit } = requestData
    return Api.get(GET_LIVE_STREAMING, {
      params: {
        language_id,
        offset,
        limit,
      }
    })
  }
}
