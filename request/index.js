// 统计发送了几个异步请求
let ajaxTimes = 0

export const request = params => {

  // 定义公共URL
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    ajaxTimes++
    // 显示加载动画
    wx.showLoading({
      title: '加载中',
      mask: true // 是否显示蒙版,有蒙版用户无法进行其他操作
    });

    // 发送请求
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: result => {
        resolve(result)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        // 判断是否异步请求都结束了
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}

// reqTask = wx.request({
//   url: '',
//   data: {},
//   header: {'content-type':'application/json'},
//   method: 'GET',
//   dataType: 'json',
//   responseType: 'text',
//   success: (result)=>{

//   },
//   fail: ()=>{},
//   complete: ()=>{}
// });