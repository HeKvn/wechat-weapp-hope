Page({

  data: {
    isOn:false,
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
  }
})