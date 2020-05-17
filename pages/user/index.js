// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },
  /**
   * 获取登录信息
   */
  bindGetUserInfo(e) {
    if (!userInfo.nickName) {
      const {userInfo} = e.detail
      wx.setStorageSync('userInfo', userInfo);
      this.setData({
        userInfo
      })
    }
  }
})