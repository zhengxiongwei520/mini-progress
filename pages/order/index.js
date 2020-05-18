import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
    {
      name: '全部',
      id: 0,
      isActive: true
    },
    {
      name: '待付款',
      id: 1,
      isActive: false

    },
    {
      name: '待发货',
      id: 2,
      isActive: false

    }, {
      name: '退款/退货',
      id: 3,
      isActive: false

    }],
    type: 1,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options

    const { tabs } = this.data
    tabs.forEach((v, i) => {
      i === type - 1 ? v.isActive = true : v.isActive = false
    })
    this.setData({
      type: type,
      tabs
    })
  },
  onShow: function () {
    this.getOorders()
  },
  /**
   * 
   * 切换
   * e.detail是tbas子组件穿过来的index
   */
  getTabIndex(e) {
    const index = e.detail
    const { tabs } = this.data
    tabs.map(v => v.isActive = false)
    tabs[index].isActive = true
    this.setData({
      type: index + 1,
      tabs
    })
    this.getOorders()
  },
  /**
   * 获取订单信息
   */
  async getOorders() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        // 跳转获得token页面
        url: '/pages/auth/index',
      });
      wx.showToast({
        title: '你没有登录，请前往登录！',
        icon: 'none'
      });
      return
    }
    const header = { Authorization: token }
    const { type } = this.data
    console.log(type)
    const res = await request({ url: '/my/orders/all', header, data: { type } })
    let orders = res.data.message.orders
    orders = orders.map(v => ({
      ...v,
      time_cn: (new Date(v.update_time * 1000)).toLocaleString()
    }))

    this.setData({
      orders: orders
    })
  }
})