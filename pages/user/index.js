// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    const collectNum = wx.getStorageSync('collect').length
    this.setData({ userInfo,collectNum })
  },
  /**
   * 获取登录信息
   */
  bindGetUserInfo(e) {
    const { userInfo } = this.data
    if (!userInfo.nickName) {
      const { userInfo } = e.detail
      wx.setStorageSync('userInfo', userInfo);
      this.setData({
        userInfo
      })
    }
  }
})