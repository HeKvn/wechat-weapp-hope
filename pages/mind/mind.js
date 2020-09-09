// pages/mind/mind.js
Page({
  data: {
    userinfo:{},
    openid:null
  },

  onLoad: function (options) {
    // 从缓存获取用户信息
    const ui = wx.getStorageSync('userinfo');
    this.setData({
      userinfo:ui,
      openid:ui.openid
    })
  },

  login:function(e){
    var _this = this
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        _this.setData({
          openid:res.result.openid,
          userinfo:e.detail.userInfo
        })
        _this.data.userinfo.openid=_this.data.openid
        wx.setStorageSync('userinfo', _this.data.userinfo);
      },
      fail:res=>{
        console.log("fail");
      }
    })
  },

  openSetting:function(){
    wx.openSetting({
      complete: (res) => {},
    })
  }
  
})