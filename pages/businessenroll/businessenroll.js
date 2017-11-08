//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl

const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  enroll: function(e) {
    var businessInfo = e.detail.value
    var notEmpty = util.isNotEmpty(businessInfo.businessInfoName)
    if (!notEmpty) {
      wx.showModal({
        title: "请填写商店名称",
        showCancel: false
      })
      return false
    }
    businessInfo.businessInfoCreateUserUnionId = app.globalData.unionId
    wx.request({
      url: backendUrl +"/business/create",
      method: "POST",
      header: { 'content-type':"application/x-www-form-urlencoded"},
      data: businessInfo,
      success: function(res) {
        console.log(res.data)
        var title = ""
        if (res.data.code == 1){
          title = "注册成功"
        } else {
          title = "注册失败"
        }
        wx.showModal({
          title: title,
          showCancel: false,
          complete: () => {
            if (res.data.code == 1) {
              wx.redirectTo({
                url: '../mybusiness/mybusiness',
              })
            }
          }
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