import { Storage } from "@plasmohq/storage"

export {}

console.log("=============background start=============")

chrome.action.onClicked.addListener(async (tab) => {
  const { url = "" } = tab
  const storage = new Storage()

  await storage.set("__TIKTOK_URL__", url)
  if (url.includes("https://www.tiktok.com/@")) {
    chrome.runtime.openOptionsPage()
  }
})
