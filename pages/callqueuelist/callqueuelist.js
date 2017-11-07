//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    listData: [
    ],
    isBusiness: false,
    isCustomer: false
  },
  onLoad: function (options) {
    var backendUrl = getApp().globalData.backendUrl
    var requestData = {};
    if (options.businessId) {
      requestData.callqueueBusinessId = options.businessId;
      this.setData({ isBusiness: true });
    }
    else {
      requestData.callqueueCreateuserUnionid = getApp().globalData.unionId;
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

    
  }
})