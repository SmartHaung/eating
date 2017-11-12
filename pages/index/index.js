//index.js
//获取应用实例
const app = getApp()
const backendUrl = app.globalData.backendUrl
var globaldata = getApp().globalData

Page({
  onLoad: function (options) {

    var flag = true;
    var scene = decodeURIComponent(options.scene)
    if (scene && scene != "undefined") {
      var sceneArray = scene.split("_");
      if (scene && scene.length >= 3) {
        flag = false;
        if (sceneArray[0] == "que") {
          wx.redirectTo({
            url: '../callqueue/callqueue?businessId=' + sceneArray[2] + '&businessUniqueId=' + sceneArray[1]
          })
        } else if (sceneArray[0] == "bus") {
          wx.showModal({
            title: '欢迎',
            content: '欢迎使用吃饭啦管理系统',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: backendUrl + '/business/adminadd',
                  data: {
                    businessAdminBusinessid: sceneArray[2],
                    businessAdminRole: 2,
                    businessAdminUnionid: app.globalData.unionId,
                    businessAdminNickname: app.globalData.userInfo.nickName
                  },
                  success: function (res) {
                    if (res && res.data && res.data.code == 1) {
                      wx.redirectTo({
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
              }
            }
          })
        }
      }
    }
    if (flag) {
      wx.showModal({
        title: '欢迎',
        content: '请选择你的身份',
        cancelText: '我是店家',
        confirmText: '我是顾客',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../callqueuelist/callqueuelist'
            })
          } else if (res.cancel) {
            wx.redirectTo({
              url: '../mybusiness/mybusiness'
            })
          }
        }
      })
    }
  },
})
