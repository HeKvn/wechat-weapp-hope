
Page({
  data: {
    case:[],
    search_input:null,
    isIndex:true,
    searchData:[]
  },

  search_input:function(e){
    this.data.search_input = e.detail.value
  },

  //检索
  search:function(){
    const that = this
    if(that.data.search_input == null){
      wx.showToast({
        title: '请输入检索信息',
        icon:'none'
      })
    }else{
      var txt = that.data.search_input
      //模糊检索
      wx.cloud.callFunction({
        name:"searchCase",
        data:{
          search:txt
        }
      }).then(res =>{
        // console.log(res)
        that.setData({
          search_value:null,
          search_input:null,
          searchData:res.result.data,
          isIndex:false
        })
      })
    }
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
  },

  //获取case数据库病例 
  getCase:function(){
    const that = this
    wx.cloud.callFunction({
      name:"getCase",
    }).then(res=>{
      that.setData({
        case:res.result.data
      })
    })
  },

  onShow:function(){
    this.getCase()
  },

  back:function(){
    this.setData({
      isIndex:true
    })
  }
})
