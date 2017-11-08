//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl

Page({
  /**
   * 页面的初始数据
   */
  data: {
    busiArray:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: backendUrl +"/business/businessadminbyunionId",
      data: { unionId: app.globalData.unionId},
      success: res => {
        if (res.data.code == 1) {
          that.setData({
            busiArray: res.data.data
          })
        }
      }
    })
  },

  /**
   * 前往查看二维码页面
   */
  toWxacode: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../wxacode/wxacode?businessId='+businessId+"&businessUniqueid="+businessUniqueid,
    })
  },

  /**
   * 门店管理员
   */
  toAdmin: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../businessadmin/businessadmin?businessId=' + businessId + "&businessUniqueid=" + businessUniqueid,
    })
  },

  /**
   * 去排队页面
   */
  toCallqueuelist: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../callqueuelist/callqueuelist?businessId=' + businessId + "&businessUniqueid=" + businessUniqueid,
    })
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
    var that = this
    wx.request({
      url: backendUrl + "/business/businessadminbyunionId",
      data: { unionId: app.globalData.unionId },
      success: res => {
        if (res.data.code == 1) {
          that.setData({
            busiArray: res.data.data
          })
        }
      }
    })
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
