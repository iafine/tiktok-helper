import { Storage } from "@plasmohq/storage"

export {}

console.log("=============background start=============")

const storage = new Storage()

// 点击action logo
chrome.action.onClicked.addListener(async (tab) => {
  const { url = "" } = tab
  if (url.includes("https://www.tiktok.com/@")) {
    await storage.set("__TIKTOK_URL__", url)
  } else {
    await storage.set("__TIKTOK_URL__", "")
  }
  chrome.runtime.openOptionsPage()
})

// 右键菜单
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
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(info, tab)
  const { menuItemId } = info
  if (
    menuItemId === "tiktok_parse_page" ||
    menuItemId === "tiktok_parse_video"
  ) {
    const { pageUrl = "" } = info
    if (pageUrl.includes("https://www.tiktok.com/@")) {
      await storage.set("__TIKTOK_URL__", pageUrl)
      chrome.runtime.openOptionsPage()
    }
  }
})
