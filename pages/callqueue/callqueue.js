var backendUrl = getApp().globalData.backendUrl
var user = getApp().globalData
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    businessName: "",
    businessId: "",
    businessUniqueId: "",
    orderId: "",
    callqueueFormids: "",
    noticeCount: 1
  },
  orderInput: function (e) {
    this.setData({
      orderId: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.data.callqueueFormids += e.detail.formId + ",";
    this.data.noticeCount++;
    this.setData({ noticeCount: this.data.noticeCount })
  },
  createCallQueue: function () {
    this.data.noticeCount--;
    this.setData({ noticeCount: this.data.noticeCount })
    var that = this;
    wx.showToast({
      title: "提交中",
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.request({
        url: backendUrl + '/consumer/addcallrequest',
        data: {
          callqueueBusinessId: that.data.businessId,
          callqueueOrderid: that.data.orderId,
          callqueueCreateuserUnionid: user.unionId,
          callqueueFormids: that.data.callqueueFormids,
          callqueueCreateuserOpenid: user.openId,
          businessUniqueId: that.data.businessUniqueId
        },
        success: function (res) {
          if (res && res.data && res.data.code == 1) {
            wx.navigateTo({
              url: '../callqueuelist/callqueuelist'
            })
          } else {
            wx.showToast({
              title: "提交失败",
              icon: 'success',
              duration: 2000
            })
          }

        }
      })
    }, 500)

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