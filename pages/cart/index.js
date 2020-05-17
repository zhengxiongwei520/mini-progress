// 导入utils
import { openSetting, getSetting, chooseAddress } from '../../utils/util.js';

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  onShow() {
    this.setData({
      address: wx.getStorageSync('address')
    })
    this.getCartFromStorage()
  },
  /**
   * 添加地址
   */
  async handleAddress() {
    try {
      const res1 = await getSetting()
      const scope = res1.authSetting["scope.address"]
      if (scope === false) { // 拒绝访问
        openSetting()
      }
      const res2 = await chooseAddress()
      wx.setStorageSync('address', res2);
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 从缓存中获取购物车信息
   */
  getCartFromStorage() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      cart: cart
    })
    this.setCardData()
  },
  /**
   * 商品选中/不选择
   */
  checkboxEdit(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    cart.forEach(v => v.goods_id === goods_id ? v.checked = !v.checked : v.checked = v.checked)
    this.setCardData()
  },
  /**
   * 设置购物车页面数据
   * 总价格 总数量 是否全选中
   */
  setCardData() {
    let { cart } = this.data
    // 设置全选按钮
    let allChecked = cart.length ? cart.every(v => v.checked === true) : false
    // 总价格/总数量
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }
    })
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart);
  },
  /**
   * 全选
   */
  seletctAll() {
    let { allChecked, cart } = this.data
    allChecked = !allChecked
    cart.map(v => v.checked = allChecked)
    this.setCardData()
  },
  /**
   * 减少
   */
  decreaseNum(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].num--
    // 数量为0的时候
    if (cart[index].num === 0) {
      cart.splice(index, 1)
    }
    this.setCardData()
  },
  /**
   * 增加商品数量
   */
  increaseNum(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].num++
    this.setCardData()
  },
  /**
   * 结算
   */
  settlement() {
    const { address, cart } = this.data
    // 判断是否选择地址
    if (!address.userName) {
      // 没选择地址
      wx.showToast({
        title: '请选择地址',
        icon:''
      });
      return
    }
    // 判断是否有商品
    if (cart.length===0) {
      // 没有商品
      wx.showToast({
        title: '您还没有选择商品',
        icon:''
      });
      return 
    }
    // 跳转
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})