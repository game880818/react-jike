import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

import { useGetChannels } from '@/hooks/useGetChannels'
import { getArticleListAPI } from '@/apis/article'
import { useEffect } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 方法2:枚舉渲染
  const statusTag = {
    1: <Tag color='warning'>待審核</Tag>,
    2: <Tag color='success'>審核通過</Tag>
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // 渲染状态标签 1 > 待審核 ;2 > 審核通過 
      // 方法1:3元條件渲染 
      render: data => statusTag[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]
  // 獲取文章頻道列表
  const channels = useGetChannels()
  // 文章列表&總數
  const [articleList, setArticleList] = useState([])
  const [articleCount, setArticleCount] = useState(0)
  // 篩選表單數據
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4,
  })

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      // console.log(res.data.results)
      setArticleList(res.data.results)
      setArticleCount(res.data.total_count)
    }
    getList()
  }, [reqData])

  // 提交篩選表單
  const onFinish = (formData) => {
    // 如果沒有選擇，則給空字串
    setReqData({
      ...reqData,
      status: formData.status,
      channel_id: formData.channel_id || '',
      begin_pubdate: formData.date?.[0]?.format('YYYY-MM-DD') || '',
      end_pubdate: formData.date?.[1]?.format('YYYY-MM-DD') || '',
    })
  }

  return (
    <div>
      {/* 文章列表篩選 */}
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待審核</Radio>
              <Radio value={2}>審核通過</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="請選擇文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channels.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表 */}
      <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>
  )
}

export default Article