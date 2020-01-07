import request from '../../services/request'

export default async function addNote(params) {
  return request({
    url: '/note/addNote',
    method: "POST",
    data: params
  });
}