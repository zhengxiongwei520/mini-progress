import { request } from '../../request/index';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })
    const data = res.data.message
    this.goodsInfo = data
    this.setData({
      goodsDetail: {
        // 加载优化 用到什么数据就加载什么数据
        pics: data.pics,
        goods_name: data.goods_name,
        goods_price: data.goods_price,
        // 后端传过来的有webp图片格式，但是部分苹果手机不接受
        // 所以叫后端都改成jpg png 实在不行在替换
        goods_introduce: data.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },
  // 轮播图点击预览
  previewImage(e) {
    const urls = this.goodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.current
    wx.previewImage({
      current: current,
      urls: urls
    });
  },
  // 加入购物车
  addToCart() {
    // 判断是否购物车存在当前商品
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
      // 购物车不存在当前商品
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
      wx.setStorageSync('cart', cart);
    } else {
      // 当前商品存在
      cart[index].num++
      wx.setStorageSync('cart', cart);
    }
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      mask: false,
    });
  }
})