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
    method: 'POST',
    data: params
  });
}

export async function addFollow (params) {
  return request({
    url: '/member/addFollow',
    method: 'POST',
    data: params
  })
}

export async function cancelFollow (params) {
  return request({
    url: '/member/cancelFollow',
    method: 'POST',
    data: params
  })
}