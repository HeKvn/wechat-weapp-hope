Page({

  data: {
    isOn:false,
    message:[],
  },

  isOnFn:function(){
    if(this.data.isOn){
      this.setData({
        isOn:false
      })
    }else{
      this.setData({
        isOn:true
      })
    }
  },

  //前往创建会议页面
  createMetting:function(){
    wx.navigateTo({
      url: '/pages/create/create',
    })
  },
  // 前往预约会议页面
  bookMetting:function(){
    wx.navigateTo({
      url: '/pages/book/book',
    })
  },

  //获取缓存中的信息,并存入到data中
  getStorInfo:function(){
    const that = this
    const Message = wx.getStorageSync('message')
    const RoomID = wx.getStorageSync('roomid')
    const RoomName = wx.getStorageSync('roomname')
    Message.roomID = RoomID
    Message.roomName = RoomName
    var message = this.data.message

    //数组中不重复同一房间
    if(that.data.message.length === 0){
      message.push(Message)
      that.setData({
        message:message,
      })
    }else{
      var temp = false
      for(var i=0;i<that.data.message.length;i++){
        if(that.data.message[i].roomID == RoomID){
          //动态获取的索引值设置data
          that.setData({
            ['message['+i+'].message']:Message.message
          })
          temp = false
          break
        }else{
          //循环结束后temp是true的话就说明数组中没有这个房间信息
          temp = true
        }
      }
      if(temp){
        message.push(Message)
        that.setData({
          message:message,
        })
      }
    }
  },

  onShow:function(){
    this.getStorInfo()
  },

  //点击会话框前往会议室
  goHome:function(e){
      wx.navigateTo({
        url: '/pages/room/room?id='+e.currentTarget.dataset.room_id,
      })
  }
})