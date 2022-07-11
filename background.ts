import { Storage } from "@plasmohq/storage"

export {}

console.log("=============background start=============")

chrome.action.onClicked.addListener(async (tab) => {
  const { url = "" } = tab
  const storage = new Storage()
  if (url.includes("https://www.tiktok.com/@")) {
    await storage.set("__TIKTOK_URL__", url)
  } else {
    await storage.set("__TIKTOK_URL__", "")
  }
  chrome.runtime.openOptionsPage()
})
