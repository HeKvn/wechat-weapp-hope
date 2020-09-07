
Page({
  data: {
    allergy:null,
    hst_ill:null
  },

  allergyInput:function(e){
    this.data.allergy = e.detail.value
  },
  hstInput:function(e){
    this.data.hst_ill = e.detail.value
  },

  handleSubmit:function(e){
    // console.log(e)
    //把对象转换成数组，等下方便遍历判断
    var value = [];
    var allTrue = true;
    for(let i in e.detail.value){
      value.push(e.detail.value[i]);
    }
    value.forEach(v=>{
      // console.log(v)
      if(!v){
        allTrue = false
      }
    })
    //没有空的才给提交
    if(allTrue){
      const that = this
      wx.cloud.callFunction({
        name:"createCase",
        data:{
          name:e.detail.value.name,
          nation:e.detail.value.nation,
          sex:e.detail.value.radio_group1,
          age:e.detail.value.age,
          marriage:e.detail.value.radio_group2,
          mdc_allergy:that.data.allergy,
          history_ill:that.data.hst_ill
        }
      }).then(res=>{
        that.setData({
          value:null
        })
        wx.showToast({
          title: '提交病例成功！',
          icon:"none"
        })
      })
    }else{
      wx.showToast({
        title: '请输入完整信息！',
        icon:'none'
      })
    }
  }
})