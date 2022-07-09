export {}

console.log("=============background start=============")

const iframeHosts = ["qq.com"]

// 修改请求头
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: iframeHosts.map((h, i) => i + 1),
  addRules: iframeHosts.map((h, i) => ({
    id: i + 1,
    condition: {
      domains: [chrome.runtime.id],
      urlFilter: `||${h}/`,
      resourceTypes: ["sub_frame"]
    },
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        { header: "X-Frame-Options", operation: "remove" },
        { header: "Frame-Options", operation: "remove" }
      ]
    }
  }))
})
