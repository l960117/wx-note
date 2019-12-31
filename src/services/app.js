import request from './request';

export default function loginIn(params) {
  return request({
    data: params,
    method: 'POST',
    url: '/member/login'
  })
}