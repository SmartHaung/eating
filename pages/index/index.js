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
      if (scene && scene.length >= 2) {
        flag = false;
        if (sceneArray[0] == "que" && scene.length >= 3) {
          wx.navigateTo({
            url: '../callqueue/callqueue?businessId=' + sceneArray[2] + '&businessUniqueId=' + sceneArray[1]
          })
        } else if (sceneArray[0] == "bus" && scene.length >= 3) {
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
                      wx.switchTab({
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
        } else if (sceneArray[0] == "login") {
          wx.showModal({
            title: '欢迎',
            content: '你确定要登录吃饭了网页管理后台码？',
            confirmText: '确定',
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: backendUrl + '/user/setLoginUserInfo',
                  data: {
                    key: sceneArray[1],
                    value: JSON.stringify(app.globalData),
                  },
                  success: function (res) {
                    if (res && res.data && res.data.code == 1) {
                      wx.showToast({
                        title: "授权成功，请稍等",
                        icon: 'success',
                        duration: 2000
                      })
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  }
                })
              } else if (res.cancel) {
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
            wx.switchTab({
              url: '../callqueuelistcustomer/callqueuelistcustomer'
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../mybusiness/mybusiness'
            })
          }
        }
      })
    }
  },
})
