//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:"health-vsebq"
    })
  },
})