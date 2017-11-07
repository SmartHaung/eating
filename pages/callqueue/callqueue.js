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
    wx.request({
      url: backendUrl + '/consumer/addcallrequest',
      data: {
        callqueueBusinessId: this.data.businessId,
        callqueueOrderid: this.data.orderId,
        callqueueCreateuserUnionid: "1111",
        callqueueFormids: this.data.callqueueFormids,
        callqueueCreateuserOpenid: "1111",
        businessUniqueId: this.data.businessUniqueId
      },
      success: function (res) {
        var title = ""
        if (res && res.data && res.data.code == 1) {
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