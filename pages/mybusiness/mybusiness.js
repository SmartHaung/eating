//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl
const util = require("../../utils/util.js")

Page({
  /**
   * 页面的初始数�
   */
  data: {
    busiArray: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
   * 前往查看二维码页�
   */
  toWxacode: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../wxacode/wxacode?businessId=' + businessId + "&businessUniqueid=" + businessUniqueid,
    })
  },

  /**
   * 门店管理�
   */
  toAdmin: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../businessadmin/businessadmin?businessId=' + businessId + "&businessUniqueid=" + businessUniqueid,
    })
  },

  /**
   * 去排队页�
   */
  toCallqueuelist: event => {
    var businessId = event.currentTarget.dataset.businessId
    var businessUniqueid = event.currentTarget.dataset.businessUniqueid
    wx.navigateTo({
      url: '../callqueuelist/callqueuelist?businessId=' + businessId + "&businessUniqueid=" + businessUniqueid,
    })
  },

  enroll: function (e) {
    var that = this
    var businessInfo = e.detail.value
    var notEmpty = util.isNotEmpty(businessInfo.businessInfoName)
    if (!notEmpty) {
      wx.showModal({
        title: "请填写商店名�,
        showCancel: false
      })
      return false
    }
    businessInfo.businessInfoCreateUserUnionId = app.globalData.unionId
    wx.request({
      url: backendUrl + "/business/create",
      method: "POST",
      header: { 'content-type': "application/x-www-form-urlencoded" },
      data: businessInfo,
      success: function (res) {
        console.log(res.data)
        var title = ""
        if (res.data.code == 1) {
          title = "注册成功"
        } else {
          title = "注册失败"
        }
        wx.showModal({
          title: title,
          showCancel: false,
          complete: () => {
            if (res.data.code == 1) {

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
            }
          }
        })
      }
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
   * 页面上拉触底事件的处理函�
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分�
   */
  onShareAppMessage: function () {

  }
})
