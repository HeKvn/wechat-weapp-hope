import {users} from "../../utils/usersOpenid.js"
Page({

  data: {
    roomID:null,
    roomName:null,
    time:'',
    date:''
  },

  roomName:function(e){
    this.data.roomName = e.detail.value
  },
  roomID:function(e){
    this.data.roomID = e.detail.value
  },

  //日期选择器：
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //时间选择器：
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
    // const Date = this.data.date +' '+ this.data.time
    // console.log(Date)
    // const project = this.data.roomName + '会议：' + this.data.roomID
    // console.log(project)
  },

  //获取用户订阅消息授权
  requestSubscribe:function(){
    wx.requestSubscribeMessage({
      tmplIds: [
        'Ltq-bZTAY18Khvmfg31vvT8JSGzwGFWYhmEFtAbbWdQ', //预约消息模版id
      ],
    })
  },

  //发送订阅消息给用户
  sendSubscribe:function(item){
    const ui = wx.getStorageSync('userinfo');
    const date = this.data.date +' '+ this.data.time
    const project = this.data.roomName + '会议：' + this.data.roomID
    wx.cloud.callFunction({
      name:"send_subscribeMessage",
      data:{
        openid:item,
        name:ui.nickName,
        time:date,
        message:project,
        ps:'没有密码'
      }
    }).then(res=>{
      // console.log("发送成功",res)
    }).catch(res=>{
      console.log("发送失败",res)
    })
  },
  
  //点击提交预约
  submitBook:function(){
    const that = this
    //调用方法，订阅消息提醒
    this.requestSubscribe()
    var ID = this.data.roomID
    var Name = this.data.roomName
    var date = this.data.date
    var time = this.data.time
    if(ID == null || Name == null || date == '' || time == ''){
      wx.showModal({
        title:'提示',
        content:'请输入完整预约信息',
        cancelColor: '#000000',
      })
    }else{
      //发送订阅消息
      var openid = new users()
      openid.forEach(item=>{
        that.sendSubscribe(item)
        console.log('发送成功')
      })
      // console.log('全部发送成功')
      wx.showToast({
        title: '预约成功',
        icon:'success'
      })
    }
  }
})