//index.js

Page({
  data: {

  },

  onLoad:function(){
    const ui = wx.getStorageSync('userinfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/mind/mind',
      })
    }
  },

  goWrite:function(){
    wx.navigateTo({
      url: '/pages/write/write',
    })
  }
})
