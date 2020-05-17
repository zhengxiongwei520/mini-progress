import { request } from '../../request/index.js'
import { login } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获得用户信息
   */
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      if (!rawData) {
        // 拒绝获取用户信息
        return wx.showToast({
          title: '已拒绝授权用户信息',
          icon: 'none',
        });
      }
      // 获取小程序登录后的code
      const { code } = await login()
      // 发送请求，获得用户token
      const tokenParams = { encryptedData, rawData, iv, signature, code }
      console.log(code)
      // const {token} = await request({ url: '/users/wxlogin', methods: 'POST', data: tokenParams})
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})