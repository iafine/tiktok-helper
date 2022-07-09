import axios from "axios"

// 判断用户是否登录
export const userIsLogin = async () => {
  const { data } = await axios.post(
    "https://channels.weixin.qq.com/cgi-bin/mmfinderassistant-bin/auth/auth_data",
    { headers: { "wtf-Origin": "https://channels.weixin.qq.com" } }
  )
  console.log(data)
}
