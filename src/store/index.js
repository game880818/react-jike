import { configureStore } from "@reduxjs/toolkit";
import userReducer from './modules/userStore'

export default configureStore({
  reducer: {
    user: userReducer,
  }
})
