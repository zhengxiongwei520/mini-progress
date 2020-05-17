import { openSetting, getSetting, chooseAddress } from '../../utils/util.js';
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.getPayInfo()
  },
  /**
   * 添加地址
   */
  async handleAddress() {
    // 打开设置和选择地址都是异步请求
    try {
      const res1 = await getSetting()
      const scope = res1.authSetting["scope.address"]
      if (scope === false) {
        openSetting()
      }
      const res2 = await chooseAddress()
      wx.setStorageSync('address', res2);
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 获取支付的所有信息
   */
  getPayInfo() {
    const address = wx.getStorageSync('address');
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    const cart = wx.getStorageSync('cart') || [];
    const filterCart = cart.filter(v => v.checked === true)
    let totalPrice = 0
    let totalNum = 0
    filterCart.forEach(v => totalPrice += v.goods_price * v.num)
    filterCart.forEach(v => totalNum += v.num)
    this.setData({
      cart: filterCart,
      address,
      totalPrice,
      totalNum
    })
  },
  /**
   * 支付事件
   * 1.判断是否有token，有就继续，没有要获得token
   */
  async pay() {
    try {
      const { cart, totalPrice, address } = this.data
      if (cart.length == 0) {
        wx.showToast({
          title: '你还没有选择商品',
          icon: 'none'
        });
        return
      }
      if (!address.userName) {
        wx.showToast({
          title: '请选择地址',
          icon: 'none'
        });
        return
      }

      // 判断缓存中是否有token √
      const token = await wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          // 跳转获得token页面
          url: '/pages/auth/index',
        });
        return
      }
      // 有token创建订单
      // header参数
      const header = { Authorization: token }
      // 请求体参数
      const order_price = totalPrice
      const consignee_addr = address.all
      let goods = []
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.goods_number,
          goods_price: v.goods_price
        })
      })
      const data = { order_price, consignee_addr, goods }
      // 创建订单完成会返回一个订单编号
      const { order_number } = await request({ url: '/orders/create', methos: 'POST', data: data, header: header })
      console.log(order_number, 'order_number');  

      // 使用token和订单编号来访问预支付接口，返回一个微信支付需要的对象
      const { pay } = await request({ url: '/my/orders/req_unifiedorder', header, data: { order_number } })
      console.log(pay, 'pay');
      // 有了pay就发起微信支付
      wx.requestPayment({
        ...pay,
        success: (result) => {
          console.log("支付成功")
        }
      });
      // 查询订单状态
      const status = await request({ url: '/my/orders/chkOrder', header, data: { order_number } })
      console.log(status, 'status');

      // 手动删除已购买的商品 √
      let newCart = cart.filter(v => v.checked != true)
      wx.setStorageSync('cart', newCart);
      // 跳转页面 √
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch (error) {
      console.log(error)
    }
  }
})