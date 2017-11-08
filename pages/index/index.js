//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl
var user = getApp().globalData

Page({
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    if (scene) {
      var sceneArray = scene.split("_");
      if (scene && scene.length >= 3) {
        if (sceneArray[0] == "que") {
          wx.navigateTo({
            url: '../callqueue/callqueue?businessId=' + sceneArray[2] + '&businessUniqueId=' + sceneArray[1]
          })
        } else if (sceneArray[0] == "bus") {
          wx.request({
            url: backendUrl + '/business/adminadd',
            data: { businessAdminBusinessid: sceneArray[2], businessAdminRole: 2, businessAdminUnionid: user.unionId },
            success: function (res) {
              if (res && res.data && res.data.code == 1) {
                wx.navigateTo({
                  url: '../mybusiness/mybusiness'
                })
              } else {
                wx.showToast({
                  title: "添加管理员失败",
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
          wx.navigateTo({
            url: '../mybusiness/mybusiness'
          })
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
