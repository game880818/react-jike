import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单  */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          {/* 設置驗證規則 rules */}
          <Form.Item
            name='phone'
            rules={
              [
                { required: true, message: '請輸入手機號碼' },
                { pattern: /^09\d{8}$/, message: '請輸入手機號碼格式正確' }
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