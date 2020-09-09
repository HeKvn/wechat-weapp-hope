Page({
  data: {
    room_id:null,
    room_pwd:null,
    IDs:[]
  },

  roomID:function(e){
    // console.log(e)
    this.data.room_id = e.detail.value
  },
  roomPWD:function(e){
    this.data.room_pwd = e.detail.value
  },

  onLoad:function(){
    wx.loadFontFace({
      family: 'word1',
      source: 'url(https://6865-health-vsebq-1303000269.tcb.qcloud.la/%E9%92%9F%E9%BD%90%E7%8E%8B%E5%BA%86%E5%8D%8E%E6%AF%9B%E7%AC%94%E7%AE%80%E4%BD%93.TTF?sign=b28cfe55ad3e8d55dd922fb274f5bbdd&t=1598881107)',
      success: res =>{
        console.log('ok',res)
      },
      fail:error =>{
        console.log('err',error)
      }
    })
  },

  onShow:function(){
    const that = this
    wx.cloud.callFunction({
      name:"getRoomsID",
      success:res=>{
        that.setData({
          IDs:res.result.data
        })
      },
      fail:res=>{
        console.log('获取会议id失败')
      }
    })
    wx.loadFontFace({
      family: 'word2',
      source: 'url(https://6865-health-vsebq-1303000269.tcb.qcloud.la/Sofia.otf?sign=63544993ff50355eb30f8ddfe345765b&t=1598882078)',
      success:res=>{
        console.log('english',res)
      },
      fail:err=>{
        console.log('fuck',err)
      }
    })
  },

  //前往会议室
  go:function(){
    const that = this
    if(that.data.room_id == null){
      wx.showToast({
        title: '请输入参加的会议ID！',
        icon:'none'
      })
    }else{
      var success = false
      for(var i=0;i<that.data.IDs.length;i++){
        if(that.data.IDs[i].roomID === that.data.room_id){
          success = true
          break
        }
      }
      if(success){
        wx.navigateTo({
          url: '/pages/room/room?id='+that.data.room_id,
        })
        that.setData({
          value:null,
          room_id:null,
          room_pwd:null
        })
      }else{
        wx.showToast({
          title: '没有此会议室',
          icon:'none'
        })
      }
    }
  }


})