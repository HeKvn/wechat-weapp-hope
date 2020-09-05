
Page({
  data: {

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

  go:function(){
    wx.navigateTo({
      url: '/pages/room/room',
    })
  }



})