/**
 * 获取cookie
 */
export const getDomainCookiesWithName = async (domain, name) => {
  return new Promise((resolve) => {
    window.chrome.cookies.getAll({ url: domain, name }, function (cookie) {
      resolve(cookie)
    })
  })
}

/**
 * 通过url和name，获取某个cooike
 */
export const getCooikeWithUrlAndName = async (url, name) => {
  return new Promise((resolve) => {
    chrome.cookies.get({ url, name }, (e) => {
      const { value = "" } = e || {}
      resolve(value)
    })
  })
}
