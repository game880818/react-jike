import { request } from '@/utils/request'

// 1.登陸請求
export const loginAPI = (userData) => {
  return request({
    url: 'authorizations',
    method: 'POST',
    data: userData
  })
}


// 2.用戶信息請求
export const getProfileAPI = () => {
  return request({
    url: 'user/profile',
    method: 'GET',
  })
}