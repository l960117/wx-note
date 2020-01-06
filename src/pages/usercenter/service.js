import request from '../../services/request'

export async function getRecommend(params) {
  return request({
    url: '/member/getRecommend',
    method: "POST",
    data: params
  });
}

export async function getFollowAndFens(params) {
  return request({
    url: '/member/getFollowAndFens',
    method: "POST",
    data: params
  });
}