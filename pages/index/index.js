//  导入request
import {
  request
} from '../../request/index';
//Page Object
Page({
  /**
   * 页面初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorData: []
  },
  /**
   * 页面加载
   */
  onLoad: function (options) {
    this.fetchSwiperLsit(),
      this.fetchNavLsit(),
      this.fetchFloorData()
  },
  /**
   * 获取轮播图数据
   */
  async fetchSwiperLsit() {
    const res = await request({ url: '/home/swiperdata' })
    let data = res.data.message
    data = data.map(v => ({ ...v, navigator_url: v.navigator_url.replace('main', 'index') }))
    this.setData({
      swiperList: data
    })
  },
  async fetchNavLsit() {
    const res = await request({ url: '/home/catitems' })
    let data = res.data.message
    data = data.map(v => ({ ...v, navigator_url: (v.navigator_url || '').replace('main', 'index') }))
    // data = data
    this.setData({
      navList: data
    })
  },
  async fetchFloorData() {
    const res = await request({ url: '/home/floordata' })
    let data = res.data.message
    data = data.map(v => ({
      ...v,
      product_list: v.product_list.map(el => ({
        ...el,
        navigator_url: (el.navigator_url || '').replace('?', '/index?')
      }))
    }))
    this.setData({
      floorData: data
    })
  }
});