import Api from 'src/api/AxiosInterceptors'
import { GET_LOCATION } from 'src/utils/api'

export const getlocationapi = {
  getlocation: requestData => {
    const { limit } = requestData
    return Api.get(GET_LOCATION, {
      params: {
        limit: limit,
      }
    })
  }
}
