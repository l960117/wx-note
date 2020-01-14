import request from '../../services/request'

export async function getNoteDetail (params) {
  return request({
    url: '/note/getNoteDetail',
    method: 'POST',
    data: params
  })
}

export async function deleteNote (params) {
  return request({
    url: '/note/delete-note',
    method: 'POST',
    data: params
  })
}