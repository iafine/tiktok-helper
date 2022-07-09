import { Button, Input } from "antd"
import cssText from "data-text:~/contents/tiktok.css"
import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://www.tiktok.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const TikTok = () => {
  let count = 0
  let text = ""
  const timer = setTimeout(() => {
    count++
    const text = document.getElementsByClassName("css-scfv15")[0].textContent
    console.log(text)
    if (text || count > 5) {
      clearTimeout(timer)
    }
  }, 500)

  return (
    <div className="w-full p-6 flex items-center">
      <Input className="w-96" placeholder="请输入TikTok链接" value={text} />
      <div className="ml-3">
        <Button type="primary">下载视频</Button>
      </div>
    </div>
  )
}

export default TikTok
