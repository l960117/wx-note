import request from '../../services/request'

export default async function getNoteList(params) {
  return request({
    url: '/note/note-list',
    method: "POST",
    data: params
  });
}