var userInfo = getApp().globalData.userInfo
var backendUrl = getApp().globalData.backendUrl
Page({
  data: {
    listData: [
    ]
  },
  onLoad: function (options) {
    var requestData = {};
    if (options.businessId) {
      requestData.callqueueBusinessId = options.businessId;
    }
    if (options.userUnionid) {
      requestData.callqueueCreateuserUnionid = options.userUnionid;
    }
    var that = this;
    debugger;
    wx.request({
      url: backendUrl + '/callqueue/queryCallQueueList',
      data: {
        callqueueBusinessId: options.businessId
      },
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
  }
})