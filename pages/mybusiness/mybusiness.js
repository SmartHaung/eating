var userInfo = getApp().globalData.userInfo
var backendUrl = getApp().globalData.backendUrl

Page({
  /**
   * 页面的初始数据
   */
  data: {
    busiArray:[{businessInfoName:"1111"},
                {businessInfoName:"2222"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.request({
    //   url: backendUrl +"/business/list",
    //   data: { unionid: userInfo.unionId},
    //   success: res => {
    //     if (res.data.result == 1) {
    //       that.setData({
    //         busiArray: res.data.data
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
