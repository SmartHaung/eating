//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminArray: null,
    businessId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var businessUniqueid = options.businessUniqueid
    var businessId = options.businessId
    this.setData({
      businessId: businessId
    })
    wx.request({
      url: backendUrl + "/business/queryAdminList",
      method: "GET",
      data: { businessId: businessId },
      success: res => {
        if (res.data.code == 1) {
          that.setData({
            adminArray: res.data.data
          })
        }
      }
    })
  },

  deleteAdmin: function (event) {
    var that = this
    var businessAdminId = event.currentTarget.dataset.adminId
    var businessAdminStatus = 2
    var p = {
      businessAdminId: businessAdminId,
      businessAdminStatus: businessAdminStatus
    }
    wx.showModal({
      title: '确认删除',
      content: '',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: backendUrl + "/business/updateBusinessAdmin",
            method: "GET",
            data: p,
            success: res => {
              if (res.data.code == 1) {
                /**
                 * 重新获取管理员
                 */
                wx.request({
                  url: backendUrl + "/business/queryAdminList",
                  method: "GET",
                  data: { businessId: that.data.businessId },
                  success: res => {
                    if (res.data.code == 1) {
                      that.setData({
                        adminArray: res.data.data
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  deleteBusiness: function (event) {
    var businessId = this.data.businessId
    var p = {
      businessInfoStatus: 2,
      businessInfoId: businessId
    }
    wx.showModal({
      title: '确认删除',
      content: '',
      success: res => {
        if (res.confirm) {
          wx.request({
            url: backendUrl + "/business/update",
            method: "POST",
            data: p,
            header: { "content-type": "application/x-www-form-urlencoded" },
            success: res => {
              console.log(this)
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
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