import sxRequest from '../request'

export function getChatsList(page = 1, size = 10) {
  return sxRequest.get({
    url: '/chats',
    params: {
      page,
      size
    }
  })
}

export function saveChats(content, userId) {
  return sxRequest.post({
    url: '/chats/save',
    data: {
      content,
      userId
    }
  })
}

