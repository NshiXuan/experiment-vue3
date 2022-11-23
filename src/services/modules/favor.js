import sxRequest from '../request'

export function getFavorList() {
  return sxRequest.get({
    url: '/favors'
  })
}

export function addFavor(goodId, userId) {
  return sxRequest.post({
    url: '/favors/save',
    data: {
      goodId,
      userId
    }
  })
}

export function deleteFavor(id) {
  return sxRequest.post({
    url: `/favors/remove?id=${id}`,
  })
}