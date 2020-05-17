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
    floorData:[]
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
    this.setData({
      swiperList: res.data.message
    })
  },
  async fetchNavLsit() {
    const res = await request({ url: '/home/catitems' })
    this.setData({
      navList: res.data.message
    })
  },
  async fetchFloorData() {
    const res = await request({ url: '/home/floordata' })
    this.setData({
      floorData: res.data.message
    })
  }
});