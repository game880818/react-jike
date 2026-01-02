import { request } from '@/utils/request'

// 1. 獲取文章種類頻道列表
export const getChannelsAPI = () => {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

// 2.提交表單數據
export const createArticleAPI = (formData) => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data: formData
  })
}

export const getArticleListAPI = (params) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}