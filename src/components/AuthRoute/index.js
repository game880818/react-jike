import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

//「路由守衛」（Route Guard）是一種在路由切換前進行檢查的機制，用於確保只有授權用戶才能訪問某些路由。
//在 React 中，我們可以使用路由守衛來實現類似的功能。
// 授權路由組件的作用是在渲染子組件之前檢查用戶是否有權限訪問。
// 如果用戶有 token，則渲染子組件；如果用戶沒有 token，則導向到登錄頁面。

const AuthRoute = ({ children }) => {
  const token = getToken()
  if (token) {
    // 有 token 時，渲染子組件
    // 這個 <> ... </> 的語法在 React 中被稱為 React Fragment（片段）。
    // 它能讓你將多個元素包裹在一起，但不會在最終生成的 HTML 結構中產生任何實體節點（例如不會多出一個 <div>）。
    return <>{children}</>
  } else {
    // 無 token 時，導向到登錄頁面
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute