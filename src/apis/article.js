import { request } from '@/utils/request'


export const getChannelsAPI = () => {
  return request({
    url: '/channels',
    method: 'GET',
  })
}