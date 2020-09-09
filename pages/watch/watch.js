Page({

  data: {
    navbar:['设备数据','化验数据'],
    currentTab:0,
    caseList:[],
    showCase:null
  },

  onShow:function(){
    const that = this
    wx.cloud.callFunction({
      name:"getCase"
    }).then(res =>{
      that.setData({
        caseList:res.result.data,
        showCase:res.result.data[0]
      })
    })
  },

  //next点击
  click :0,
  nextCase:function(e){
    const that = this
    //判断有无上一条
    if(this.click===0&&e.currentTarget.dataset.operation===-1){
      wx.showToast({
        title: '没有上一份病例',
        icon:'none'
      })
    }else{
      if(that.click === that.data.caseList.length-1&&e.currentTarget.dataset.operation===1){
        wx.showToast({
          title: '已经是最后一份病例了',
          icon:'none'
        })
      }else{
        this.click+=e.currentTarget.dataset.operation
      }
    }
    this.setData({
      showCase:that.data.caseList[that.click]
    })
  },

  navbarTap:function(e){
    // console.log(e)
    this.setData({
      currentTab:e.currentTarget.dataset.idx
    })
  },

})