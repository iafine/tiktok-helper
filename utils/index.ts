import axios from "axios"
import { get } from "lodash"

const TIKTOK_URL = "https://api.tiktokv.com/aweme/v1/aweme/detail/"

// 解析TikTok视频
export const parseTikTok = async (url: string) => {
  if (!url.includes("https://www.tiktok.com")) {
    console.error("错误的TikTok链接")
    return
  }

  const matchList = url.match(/(?<=video\/)(\d+)?/)
  if (!matchList[0]) {
    console.error("未匹配到视频ID")
    return
  }

  // https://api.tiktokv.com/aweme/v1/multi/aweme/detail/?aweme_ids=%5B7104679681894386950%5D

  const res = await axios.get(`${TIKTOK_URL}?aweme_id=${matchList[0]}`, {
    // headers: {
    //   "user-agent":
    //     "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.1708 16.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.66"
    // }
  })
  const { data = {} } = res || {}
  // 无水印视频链接
  const nwmVideoUrl = get(data, "aweme_detail.video.play_addr.url_list[0]", "")
  // 有水印链接
  const wmVideoUrl = get(
    data,
    "aweme_detail.video.download_addr.url_list[0]",
    ""
  )
  // 视频标题
  const videoTitle = get(data, "aweme_detail.desc", "")
  //作者昵称
  const authorNickname = get(data, "aweme_detail.author.nickname", "")
  // 作者ID
  const authorId = get(data, "aweme_detail.author.uid", "")
  // 上传时间
  const createTime = get(data, "aweme_detail.create_time", "")
  // 视频ID
  const videoId = get(data, "aweme_detail.statistics.aweme_id", "")
  // 视频音乐标题
  const musicTitle = get(data, "aweme_detail.music.title", "")
  // 视频音乐ID
  const musicId = get(data, "aweme_detail.music.mid", "")
  // 视频音乐作者
  const musicAuthor = get(data, "aweme_detail.music.author", "")
  // 视频音乐链接
  const musicUrl = get(data, "aweme_detail.music.play_url.url_list[0]", "")
  // 评论数
  const commentCount = get(data, "aweme_detail.statistics.comment_count", "")
  // 点赞数
  const diggCount = get(data, "aweme_detail.statistics.digg_count", "")
  // 播放次数
  const playCount = get(data, "aweme_detail.statistics.play_count", "")
  // 下载次数
  const downloadCount = get(data, "aweme_detail.statistics.download_count", "")
  // 分享次数
  const shareCount = get(data, "aweme_detail.statistics.share_count", "")
  // 视频封面
  const coverUrl = get(data, "aweme_detail.cover.url_list[0]", "")
  // 视频动态封面
  const dynamicCoverUrl = get(
    data,
    "aweme_detail.dynamic_cover.url_list[0]",
    ""
  )
  // 视频原始封面
  const originCoverUrl = get(data, "aweme_detail.origin_cover.url_list[0]", "")
  //  视频话题
  const topics = get(data, "aweme_detail.text_extra", [])
    .map(({ hashtag_name }) => {
      return hashtag_name
    })
    .filter((tag) => tag)

  return {
    nwmVideoUrl,
    wmVideoUrl,
    videoTitle,
    authorNickname,
    authorId,
    createTime,
    videoId,
    musicTitle,
    musicId,
    musicAuthor,
    musicUrl,
    commentCount,
    diggCount,
    playCount,
    downloadCount,
    shareCount,
    coverUrl,
    dynamicCoverUrl,
    originCoverUrl,
    topics
  }
}

// 下载视频资源
export const downloadVideoResource = async (url) => {
  const res: any = await axios.get(url, { responseType: "blob" })
  const type = res.headers["content-type"] //请求头中文件类型
  const blob = new Blob([res.data])
  const a = document.createElement("a")

  const randomName = Math.random().toString(36).slice(-6)
  a.download = randomName + "." + type?.replace("video/", "")
  a.href = URL.createObjectURL(blob)
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}

// 下载音频资源
export const downloadAudioResource = async (url) => {
  const res: any = await axios.get(url, { responseType: "blob" })
  const type = res.headers["content-type"] //请求头中文件类型
  const blob = new Blob([res.data])
  const a = document.createElement("a")

  const randomName = Math.random().toString(36).slice(-6)
  a.download = randomName + "." + type?.replace("audio/", "")
  a.href = URL.createObjectURL(blob)
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}
