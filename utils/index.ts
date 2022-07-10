import axios from "axios"
import { get } from "lodash"

const TIKTOK_URL = "https://api.tiktokv.com/aweme/v1/multi/aweme/detail/"

// 解析TikTok视频
export const parseTikTok = async (url: string) => {
  if (!url.includes("https://www.tiktok.com")) {
    console.error("错误的TikTok链接")
    return
  }
  const matchList = url.match(/\d+/g)
  if (!matchList[0]) {
    console.error("未匹配到视频ID")
    return
  }

  // https://api.tiktokv.com/aweme/v1/multi/aweme/detail/?aweme_ids=%5B7104679681894386950%5D

  const res = await axios.get(
    `${TIKTOK_URL}?aweme_ids=${encodeURI(`[${matchList[0]}]`)}`,
    {
      // headers: {
      //   "user-agent":
      //     "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.66"
      // }
    }
  )
  const { data = {} } = res || {}
  // 无水印视频链接
  const nwmVideoUrl = get(
    data,
    "aweme_details[0].video.play_addr.url_list[0]",
    ""
  )
  // 有水印链接
  const wmVideoUrl = get(
    data,
    "aweme_details[0].video.download_addr.url_list[0]",
    ""
  )
  // 视频标题
  const videoTitle = get(data, "aweme_details[0].desc", "")
  //作者昵称
  const authorNickname = get(data, "aweme_details[0].author.nickname", "")
  // 作者ID
  const authorId = get(data, "aweme_details[0].author.uid", "")
  // 上传时间
  const createTime = get(data, "aweme_details[0].create_time", "")
  // 视频ID
  const videoId = get(data, "aweme_details[0].statistics.aweme_id", "")
  // 视频音乐标题
  const musicTitle = get(data, "aweme_details[0].music.title", "")
  // 视频音乐ID
  const musicId = get(data, "aweme_details[0].music.mid", "")
  // 视频音乐作者
  const musicAuthor = get(data, "aweme_details[0].music.author", "")
  // 视频音乐链接
  const musicUrl = get(data, "aweme_details[0].music.play_url.url_list[0]", "")
  // 评论数
  const commentCount = get(
    data,
    "aweme_details[0].statistics.comment_count",
    ""
  )
  // 点赞数
  const diggCount = get(data, "aweme_details[0].statistics.digg_count", "")
  // 播放次数
  const playCount = get(data, "aweme_details[0].statistics.play_count", "")
  // 下载次数
  const downloadCount = get(
    data,
    "aweme_details[0].statistics.download_count",
    ""
  )
  // 分享次数
  const shareCount = get(data, "aweme_details[0].statistics.share_count", "")
  // 视频封面
  const coverUrl = get(data, "aweme_details[0].cover.url_list[0]", "")
  // 视频动态封面
  const dynamicCoverUrl = get(
    data,
    "aweme_details[0].dynamic_cover.url_list[0]",
    ""
  )
  // 视频原始封面
  const originCoverUrl = get(
    data,
    "aweme_details[0].origin_cover.url_list[0]",
    ""
  )
  //  视频话题
  const topics = get(data, "aweme_details[0].text_extra", [])
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
