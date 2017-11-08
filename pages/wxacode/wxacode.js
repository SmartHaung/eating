//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl




Page({

  /**
   * 页面的初始数据
   */
  data: {
    queue: "",
    business: "",
    selected: true,
    selected1: false
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var suffix = options.businessUniqueid + options.businessId
    var queue = "que_" + suffix
    var business = "bus_" + suffix
    this.setData({
      queue: backendUrl + "/picture/" + queue + ".jpg?x-oss-process=style/eating",
      business: backendUrl + "/picture/" + business + ".jpg"
    })
  },

  download: event => {
    wx.downloadFile({
      url: event.currentTarget.dataset.url,
      success:
      function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:
          function (data) {
            wx.showToast({
              title: "下载成功",
              icon: 'success',
              duration: 2000
            })
          },
          fail:
          function (err) {
            wx.showToast({
              title: "下载失败",
              icon: 'success',
              duration: 2000
            })
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