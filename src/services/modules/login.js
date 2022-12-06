import sxRequest from '../request'

export function loginApi(username, password, captcha) {
  // console.log(username, password, captcha);
  return sxRequest.post({
    url: '/users/login',
    data: {
      captcha,
      password,
      username,
    }
  })
}

export function getCaptcha() {
  return sxRequest.get({
    url: '/users/captcha'
  })
}

export function logoutApi() {
  return sxRequest.post({
    url: '/users/logout'
  })
}
