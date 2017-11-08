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
        else {

        }
      } else {
        wx.navigateTo({
          url: '../test/test'
        })
      }
    }
    wx.navigateTo({
      url: '../test/test'
    })
  }
})
