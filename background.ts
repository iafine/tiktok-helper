import { Storage } from "@plasmohq/storage"

export {}

console.log("=============background start=============")

const storage = new Storage()

// 打开解析视频页面
export const openParseVideoPage = async (url: string) => {
  if (url.includes("https://www.tiktok.com/@")) {
    await storage.set("__TIKTOK_URL__", url)
  } else {
    await storage.set("__TIKTOK_URL__", "")
  }
  chrome.runtime.openOptionsPage()
}

// 获取当前tab
export const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

// 点击action logo
chrome.action.onClicked.addListener(async (tab) => {
  const { url = "" } = tab
  await openParseVideoPage(url)
})

// 右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "tiktok_parse_page",
    title: chrome.i18n.getMessage("contextMenusPage"),
    contexts: ["page"],
    documentUrlPatterns: ["https://www.tiktok.com/@*"]
  })
  chrome.contextMenus.create({
    id: "tiktok_parse_video",
    title: chrome.i18n.getMessage("contextMenusVideo"),
    contexts: ["video"],
    documentUrlPatterns: ["https://www.tiktok.com/@*"]
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(info, tab)
  const { menuItemId } = info
  if (
    menuItemId === "tiktok_parse_page" ||
    menuItemId === "tiktok_parse_video"
  ) {
    const { pageUrl = "" } = info
    await openParseVideoPage(pageUrl)
  }
})

// 快捷键
chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command: ${command}`)
  if (command === "open_parse_video") {
    const tab = await getCurrentTab()
    const { url = "" } = tab
    await openParseVideoPage(url)
  }
})
