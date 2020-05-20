// pages/goods_list/index.js
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
    {
      name: '综合',
      id: 0,
      isActive: true
    },
    {
      name: '销量',
      id: 1,
      isActive: false

    },
    {
      name: '价格',
      id: 2,
      isActive: false

    }],
    goodsList: []
  },
  /**
   * 访问参数
   */
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''  
    this.getGoodsList()
  },
  /**
   * 获取商品列表数据
   */
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams })
    this.totalPages = Math.ceil(res.data.message.total / this.QueryParams.pagesize)
    // this.setData({ goodsList: res.data.message.goods })
    this.setData({
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })
    // 关闭下拉刷新动画
    wx.stopPullDownRefresh()
  },
  /**
   * 获取tbas子组件传过来的index
   */
  getTabIndex(e) {
    const index = e.detail
    let { tabs } = this.data
    tabs.forEach((el, i) => {
      el.id == index ? el.isActive = true : el.isActive = false
    })
    this.setData({ tabs: tabs })
  },
  /**
   * 下拉触底
   */
  onReachBottom() {
    if (this.QueryParams.pagenum < this.totalPages) {
      // 判断是否还有下一页，默认当前页数1。获取总页数==总total/pagesize每页多少个 向上取整
      // 有就加载 
      this.QueryParams.pagenum++
      this.getGoodsList()
    } else {
      // 没有就弹窗显示没有
      wx.showToast({
        title: '已经加载到底',
        icon: 'none',
      });

    }
  },
  /**
   * 上拉刷新
   */
  onPullDownRefresh() {
    // 刷新动画
    // wx.startPullDownRefresh();  不要再添加这个了，现在默认有动画
    // 重置商品数组
    console.log(1)
    this.setData({ goodsList: [] })
    // // 重置页数
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
})