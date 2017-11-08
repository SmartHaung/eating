//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    if (scene) {
      var sceneArray = scene.split("_");
      if (scene && scene.length > 0) {
        if (sceneArray[0] == "que") {

        } else if (sceneArray[0] == "bus") {

        }

      }
    }
    wx.showModal({
      title: '欢迎',
      content: '请选择你的身份',
      cancelText: '我是店家',
      confirmText: '我是顾客',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../callqueuelist/callqueuelist'
          })
        } else if (res.cancel) {
          wx.navigateTo({
            url: '../mybusiness/mybusiness'
          })
        }
      }
    })
  }
})
