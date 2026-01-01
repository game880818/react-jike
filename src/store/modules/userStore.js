import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import { setToken, getToken, clearToken } from '@/utils'

// 用戶模塊
const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '', // 用戶 token
    userInfo: {},
  },
  // 同步方法
  reducers: {
    // 設置用戶 token
    setUserToken(state, action) {
      state.token = action.payload
      setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUser(state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
  }
})

const { setUserToken, setUserInfo, clearUser } = userSlice.actions
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

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile');
    // 將用戶信息存到 state 中
    dispatch(setUserInfo(res.data));
  }
}


export { submitLogin, fetchUserInfo, clearUser }
export default userSlice.reducer