import request from '../../services/request'

export default async function getNoteListByType(params) {
  return request({
    url: '/note/note-list-all',
    method: "POST",
    data: params
  });
}