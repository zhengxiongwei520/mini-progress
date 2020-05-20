// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
    {
      name: '商品收藏',
      isActive: true,
      id: 0
    }, {
      name: '品牌收藏',
      isActive: false,
      id: 1
    }, {
      name: '店铺收藏',
      isActive: false,
      id: 2
    }, {
      name: '浏览足迹',
      isActive: false,
      id: 3
    }],
    nav: [
      { name: '全部' },
      { name: '正在热卖' },
      { name: '即将上线' },
    ],
    index: 0,
    itemIndex: 0,
    collect: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({ collect })
  },
  /**
   * tabs子组件传过来的值
   */
  getgetTabsIndex(e) {
    const index = e.detail
    const { tabs } = this.data
    tabs.forEach((v, i) => { i == index ? v.isActive = true : v.isActive = false, console.log(i, index) })
    this.setData({ index, tabs })
  },
  /**
   * nav_item点击切换
   */
  changeNavItemIndex(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ itemIndex: index })
  }
})