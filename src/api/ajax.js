import request from '@/plugins/axios'

/**
 * 用于ajax请求演示
 *
 * @export
 * @param {*} date 向服务器发送的'日期'演示参数
 * @returns
 */
export function AjaxDemo (date) {
  return request({
    url: `/ajax-demo`,
    method: 'get',
    params: {
      date: date
    }
  })
}

/**
 * 通过向服务器传入所做的选项的id，来获取下一步的内容
 *
 * @export
 * @param {*} index 选项的id
 */
export function GetNextMove (index) {
  return request({
    url: `/next-move`,
    method: 'get',
    params: {
      index: index
    }
  })
}

/**
 * 将选择的答案发送给服务器
 *
 * @export
 * @param {*} anwser 发送的答案
 */
export function SendAnwser (hero, timeline) {
  return request({
    url: '/get-anwser',
    method: 'get',
    params: {
      hero: hero,
      timeline: timeline
    }
  })
}