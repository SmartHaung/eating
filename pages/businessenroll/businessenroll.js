var userInfo = getApp().globalData.userInfo
var backendUrl = getApp().globalData.backendUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  enroll: function(e) {
    var businessInfo = e.detail.value
    businessInfo.businessInfoCreateUserUnionId = userInfo.unionId
    wx.request({
      url: backendUrl +"/business/create",
      data: businessInfo,
      success: function(res) {
        console.log(res.data)
        var title = ""
        if (data.result == 1){
          title = "注册成功"
        } else {
          title = "注册失败"
        }
        wx.showToast({
          title: title,
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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