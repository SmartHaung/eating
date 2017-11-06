Page({
  data: {
    businessName: "测试商家",
    businessId: "",
    businessUniqueId: ""
  },
  onLoad: function (options) {
    this.setData({
      businessId: options.businessId,
      businessUniqueId: options.businessUniqueId,
    })
    wx.request({
      url: 'https://www.huangwenbin.xin/business/queryBusinessInfo',
      data: {
        businessId: 2,
      },
      success: function (res) {
        debugger
      }
    })
  }
})