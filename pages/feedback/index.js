// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { name: '体验问题' },
      { name: '商品、店铺投诉' }
    ],
    activeIndex: 0,
    adTypes: [
      { name: "问题建议", isActive: false },
      { name: "购买遇到问题", isActive: false },
      { name: "性能问题", isActive: false },
      { name: "其他", isActive: false },
    ],
    chooseImages: []
  },
  /**
   * 点击导航栏事件
   */
  changeIndex(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },
  /**
   * 选择体验问题类型
   */
  chooseAdType(e) {
    const { index } = e.currentTarget.dataset
    let { adTypes } = this.data
    adTypes.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false)
    this.setData({ adTypes })
  },
  /**
   * 点击 + 选择图片
   */
  handleChooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({ chooseImages: [...this.data.chooseImages, ...result.tempFilePaths] })
      }
    });
  },
  /**
   * 删除图片
   */
  removeImage(e) {
    const { index } = e.currentTarget.dataset
    let { chooseImages } = this.data
    chooseImages.splice(index, 1)
    this.setData({ chooseImages })
  }
})