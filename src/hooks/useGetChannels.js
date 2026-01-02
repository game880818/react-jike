import { useEffect, useState } from "react"
import { getChannelsAPI } from "@/apis/article"

const useGetChannels = () => {
  // 文章頻道列表
  const [channels, setChannels] = useState([])
  useEffect(() => {
    const getChannels = async () => {
      const res = await getChannelsAPI()
      setChannels(res.data.channels)
    }
    getChannels()
  }, [])

  return channels
}

export { useGetChannels }