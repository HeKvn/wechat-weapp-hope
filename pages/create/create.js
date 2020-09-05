
Page({
  data: {
    roomsID:null,
    roomsPWD:null,
    roomsName:null
  },

  roomID:function(e){
    this.data.roomsID = e.detail.value
  },
  roomPWD:function(e){
    this.data.roomsPWD = e.detail.value
  },
  roomName:function(e){
    this.data.roomsName = e.detail.value
  },

  // 创建房间，将输入的房间信息存储到数据库中
  createRoom:function(){
    const that = this
    if(that.data.roomsID == null){
      wx.showToast({
        title: '请输入一个ID号！',
        icon:'none'
      })
    }else{
      wx.cloud.callFunction({
        name:"createRooms",
        data:{
          roomID:that.data.roomsID,
          roomPWD:that.data.roomsPWD,
          roomName:that.data.roomsName
        },
        success:res=>{
          wx.showToast({
            title: '会议创建成功！',
            icon:'none'
          })
          that.setData({
            value:null
          })
        },
        fail:res=>{
          wx.showToast({
            title: '会议创建失败！',
            icon:'none'
          })
        }
      })
    }
  }
})