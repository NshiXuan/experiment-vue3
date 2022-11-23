import sxRequest from '../request'

export function getGoodsList(page, size) {
  return sxRequest.get({
    url: '/goods',
    params: {
      page,
      size
    }
  })
}