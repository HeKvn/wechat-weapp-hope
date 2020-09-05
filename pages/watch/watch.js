Page({

  data: {
    navbar:['设备数据','化验数据'],
    currentTab:0,
  },

  navbarTap:function(e){
    // console.log(e)
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },

})