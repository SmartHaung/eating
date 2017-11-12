var backendUrl = getApp().globalData.backendUrl
var user = getApp().globalData

//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listData: [
    ],
    isBusiness: false,
    isCustomer: false,
    businessId: null
  },
  onLoad: function (options) {
    this.setData({ businessId: options.businessId });
    this.queryCallqueue();
    setInterval(this.queryCallqueue, 10000)
  },
  queryCallqueue() {
    var requestData = {};
    if (this.data.businessId) {
      requestData.callqueueBusinessId = this.data.businessId;
      this.setData({ isBusiness: true });
    }
    else {
      requestData.callqueueCreateuserUnionid = user.unionId;
      this.setData({ isCustomer: true });
    }
    var that = this;
    wx.request({
      url: backendUrl + '/callqueue/queryCallQueueList',
      data: requestData,
      success: function (res) {
        var title = ""
        if (res && res.data && res.data.code == 1) {
          that.setData({ listData: res.data.data })
        } else {
          wx.showToast({
            title: "查询失败",
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  updateCallqueue: function (event) {
    var that = this;
    wx.request({
      url: backendUrl + '/callqueue/handle',
      data: {
        callqueueHandlelogCallqueueid: event.target.dataset.callqueueid,
        callqueueHandlelogCreateuserUnionid: user.unionId,
        callQueueStatus: event.target.dataset.type,
        type: this.data.isBusiness ? 1 : 2
      },
      success: function (res) {
        var title = ""
        if (res && res.data && res.data.code == 1) {
          that.queryCallqueue();
          wx.showToast({
            title: "操作成功",
            duration: 2000
          })
        } else {
          wx.showToast({
            title: "操作失败",
            duration: 2000
          })
        }
      }
    })
  }

})