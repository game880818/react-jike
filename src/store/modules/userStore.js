import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import { setToken, getToken, clearToken } from '@/utils'

// 用戶模塊
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '', // 用戶 token
  },
  // 同步方法
  reducers: {
    // 設置用戶 token
    setUserToken(state, action) {
      state.token = action.payload
      setToken(action.payload)
    }
  }
})

const { setUserToken } = userSlice.actions
// 撰寫異步方法
const submitLogin = (userData) => {
  return async (dispatch) => {
    try {
      const res = await request.post('/authorizations', userData);
      // 將 token 存到 state 中
      dispatch(setUserToken(res.data.token));
    } catch (error) {
      // 這裡非常重要：必須把錯誤 throw 出去，前端的 onFinish 才能捕捉到
      throw error;
    }
  }
}


export { submitLogin, setUserToken }
export default userSlice.reducer