import request from '../../services/request'

export async function getFriendNote (params) {
  return request({
    method: 'POST',
    data: params,
    url: '/note/getPublicNote'
  })
}

export async function getUserNoteInfo (params) {
  return request({
    method: 'POST',
    data: params,
    url: '/member/getUserNoteInfo'
  })
}

export async function sendPrivateNote (params) {
  return request({
    method: 'POST',
    data: params,
    url: ''
  })
}
