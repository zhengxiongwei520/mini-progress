//  引入 request.js
import { request } from '../../request/index';
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    categoriesList: []
  },
  changeIndex(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates');
    if (!cates) {
      // 缓存中没有cates
      this.fetchCategories()
    } else {
      // 有cates
      if (Date.now() - cates.time < 1000 * 60 * 5) {
        // 缓存存在事件小于5min
        this.setData({
          categoriesList: cates.data
        })
      } else {
        this.fetchCategories()
      }

    }

  },
  async fetchCategories() {
    const res = await request({ url: '/categories' })
    this.setData({
      categoriesList: res.data.message
    })
    wx.setStorageSync('cates', {
      time:Date.now(),
      data:res.data.message
    });
  },

})