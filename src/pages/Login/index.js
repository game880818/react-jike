import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { submitLogin } from '@/store/modules/userStore'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (userData) => {
    // console.log(userData)
    // 提交表單數據到服務器
    try {
      await dispatch(submitLogin(userData));
      // 顯示成功消息
      message.success('登录成功');
      // 跳轉到首頁
      navigate('/');

    } catch (error) {
      // 這裡會捕捉到 submitLogin 中 throw 的錯誤
      console.error('登录失败:', error);
      // 顯示失敗消息
      message.error(error.response?.data?.message || '登录失败');
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单  */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          {/* 設置驗證規則 rules */}
          <Form.Item
            name='mobile'
            rules={
              [
                { required: true, message: '請輸入手機號碼' },
                { pattern: /^1[3-9]\d{9}$/, message: '請輸入手機號碼格式正確' }
              ]
            }
          >
            <Input size="large" placeholder="請輸入手機號碼" />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[{ required: true, message: '請輸入驗證碼' }]}
          >
            <Input size="large" placeholder="請输入驗證碼" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login