import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    inputValue: null,
    focusFlag: false
  },
  timer: -1,
  /**
   * 输入框输入时的事件
   */
  handleInput(e) {
    const { value } = e.detail
    if (!value.trim()) {
      clearTimeout(this.timer)
      this.setData({ goods: '', focusFlag: false })
      return
    }
    this.setData({ focusFlag: true })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.qsearch(value)
    }, 333)
  },
  async qsearch(value) {
    const query = value
    const res = await request({ url: '/goods/qsearch', data: { query } })
    this.setData({
      goods: res.data.message
    })
  },
  /**
   * 清空输入框
   */
  clearInput() {
    clearTimeout(this.timer)
    this.setData({ inputValue: '', goods: [], focusFlag: false })
  }
})