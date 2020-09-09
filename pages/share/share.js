var util = require('../../utils/util.js');
Page({
  data: {
    Case:[],
    room_id:null
  },

  onLoad:function(e){
    this.data.room_id = e.roomid
  },

  onShow:function(){
    const that = this
    wx.cloud.callFunction({
      name:"getCase"
    }).then(res =>{
      that.setData({
        Case:res.result.data
      })
    })
  },

  shareCase:function(e){
    const that = this
    var shareID = e.currentTarget.dataset.caseid
    // console.log(e)
    wx.cloud.callFunction({
      name:"shareCase",
      data:{
        id:shareID
      }
    }).then(res =>{
      // console.log(res)
      wx.cloud.callFunction({
        name:"submitNews",
        data:{
          case: res.result.data,
          nickName:wx.getStorageSync('userinfo').nickName,
          avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
          openid:wx.getStorageSync('userinfo').openid,
          ymd_time:util.formatTime(new Date()),
          hs_time:util.formatTime1(new Date()),
          qunID:that.data.room_id
        }
      }).then(res =>{
        wx.navigateTo({
          url: '/pages/room/room?id='+that.data.room_id,
        })
      })
    })
  }

})