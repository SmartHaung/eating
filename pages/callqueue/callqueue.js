var userInfo = getApp().globalData.userInfo
var backendUrl = getApp().globalData.backendUrl
Page({
  data: {
    businessName: "",
    businessId: "",
    businessUniqueId: "",
    orderId: "",
    callqueueFormids: ""
  },
  orderInput: function (e) {
    this.setData({
      orderId: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.callqueueFormids += e.detail.formId + ","
  },
  createCallQueue: function () {
    for (var i = 0; i < 10; i++) {
      this.formSubmit();
    }
    wx.request({
      url: backendUrl + '/consumer/addcallrequest',
      data: {
        callqueueBusinessId: this.businessId,
        callqueueOrderid: this.orderId,
        callqueueCreateuserUnionid: "1111",
        callqueueFormids: this.callqueueFormids
      },
      success: function (res) {
        var title = ""
        if (res && res.data && res.data.id == 1) {
          title = "提交成功"
        } else {
          title = "提交失败"
        }
        wx.showToast({
          title: title,
          icon: 'success',
          duration: 2000
        })
      }
    })


  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      businessId: options.businessId,
      businessUniqueId: options.businessUniqueId,
    })
    wx.request({
      url: backendUrl + '/business/queryBusinessInfo',
      data: {
        businessId: options.businessId,
      },
      success: function (res) {
        if (res && res.data && res.data.data && res.data.data.businessInfoName) {
          that.setData({
            businessName: res.data.data.businessInfoName
          })
        }
      }
    })
  }
})