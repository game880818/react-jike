import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import Editor from './Editor'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getChannelsAPI, createArticleAPI } from '@/apis/article'
import './index.scss'

const { Option } = Select

const Publish = () => {
  // 文章頻道列表
  const [channels, setChannels] = useState([])
  // 封面類型
  const [imageType, setImageType] = useState(1)
  const [imageList, setImageList] = useState([])
  useEffect(() => {
    const getChannels = async () => {
      const res = await getChannelsAPI()
      setChannels(res.data.channels)
    }
    getChannels()
  }, [])


  const submitForm = async (formValue) => {
    console.log(formValue)
    const { title, content, channel_id } = formValue
    const formatData = {
      title,
      content,
      cover: {
        type: 0,
        images: []
      },
      channel_id,
    }
    await createArticleAPI(formatData)
  }
  // 圖片上傳成功回調
  const onUploadChange = (info) => {
    console.log(info)
    setImageList(info.fileList)
  }
  // 封面類型改變回調
  const onTypeChange = (e) => {
    console.log(e.target.value);
    setImageType(e.target.value)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={submitForm}
        >
          {/* 輸入文章標題 */}
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          {/* 選擇文章頻道 */}
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          {/* 選擇圖片區域 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType: picture-card 展示圖片卡片列表 
            showUploadList 展示上傳列表
            action 上傳地址
            name 上傳表單名稱
            onChange 上傳成功回調
            maxCount 限制上傳圖片數量
            */}
            {imageType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name='image'
                onChange={onUploadChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          {/* 简单编辑器 rich text 编辑器 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* rich text 编辑器 */}
            <Editor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish