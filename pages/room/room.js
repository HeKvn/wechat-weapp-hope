const DB = wx.cloud.database()
var util = require('../../utils/util.js');
// 获取全局唯一的录音管理器 RecorderManager
var recorder = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext() //获取播放对象

Page({
  data: {
    list:[],
    isTabs: '',
    isOn: false,
    Height: '',
    emoji_list:[{
      name:'[开心]',
      imgSrc:'../../img/1.png'
    },{
      name:'[眨眼]',
      imgSrc:'../../img/2.png'
    },{
      name:'[笑]',
      imgSrc:'../../img/3.png'
    },{
      name:'[尴尬]',
      imgSrc:'../../img/4.png'
    },{
      name:'[斜眼]',
      imgSrc:'../../img/5.png'
    },{
      name:'[难过]',
      imgSrc:'../../img/6.png'
    },{
      name:'[面无表情]',
      imgSrc:'../../img/7.png'
    },{
      name:'[奸笑]',
      imgSrc:'../../img/8.png'
    },{
      name:'[愤怒]',
      imgSrc:'../../img/9.png'
    },{
      name:'[晕]',
      imgSrc:'../../img/10.png'
    },{
      name:'[酷]',
      imgSrc:'../../img/11.png'
    },{
      name:'[中毒]',
      imgSrc:'../../img/12.png'
    },{
      name:'[哭]',
      imgSrc:'../../img/13.png'
    },{
      name:'[笑哭]',
      imgSrc:'../../img/14.png'
    },{
      name:'[吃惊]',
      imgSrc:'../../img/15.png'
    },{
      name:'[思考]',
      imgSrc:'../../img/16.png'
    }],
    room_id:null,
    room_name:null
  },

  // 点击录音开始播放事件
  my_audio_click: function (e) {
    var src = e.currentTarget.dataset.src;
    console.log('url地址', src);
    innerAudioContext.src = src
    innerAudioContext.play();
    innerAudioContext.seek(0);
  },

  //发送消息
  sendOut:function(e){
    const that = this
    // console.log(e)
    let message = e.detail.value
    if(message == ''){
      wx.showToast({
        title: '请输入内容',
        icon:'none'
      })
    }else{
      wx.cloud.callFunction({
        name:"submitNews",
        data:{
          message:message,
          nickName:wx.getStorageSync('userinfo').nickName,
          avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
          openid:wx.getStorageSync('userinfo').openid,
          ymd_time:util.formatTime(new Date()),
          hs_time:util.formatTime1(new Date()),
          qunID:that.data.room_id
        },
        success:res =>{
          console.log('发送成功',res)
          that.setData({
            input_value:''
          })
          //这样写可以的，不用先定义data中的input_value
        }
      })
    }
  },

  // 使用watch记得在数据库开放所有用户可读，创建者可读写的权限
  onMsg:function(){
    const that = this
    const watcher = DB.collection('news')
    .where({
      qunID:that.data.room_id
    })
    .watch({
      onChange: function(snapshot){
        // console.log(snapshot)
        var listArr = snapshot.docs;
        listArr.forEach((item,index) =>{
          item.userType = wx.getStorageSync('userinfo').openid == item.openid ? 1 : 2;
        })
        that.setData({
          list:listArr
        })
        //将最新一条存入缓存，让消息页面调用
        wx.setStorageSync('message', that.data.list[that.data.list.length-1])
      },
      onError:function(err){
        console.error('----------err',err)
      }
    })
  },

  //获取会议名称，并将ID和名称存入缓存中
  getRoomInfo:function(){
    const that = this
    wx.cloud.callFunction({
      name:"getRoomName",
      data:{
        room_id:that.data.room_id
      },
      success:res=>{
        that.setData({
          room_name:res.result.data[0].roomName
        })
        // console.log(res.result.data[0].roomName)
        //存入缓存
        wx.setStorageSync('roomname', res.result.data[0].roomName)
        wx.setStorageSync('roomid', that.data.room_id)
      },
      fail:res=>{
        console.log('获取房间名称失败')
      }
    })
  },

  onLoad:function(e){
    // console.log(e.id)
    this.data.room_id = e.id
    this.getRoomInfo()
    this.onMsg()
  },

  //录音开始
  Touch_voice_start:function(){
    // 手指按住录音
    wx.showToast({
      title: '按住录音，松开发送',
      icon:'none'
    })
    this.setData({
      voice_start_date:new Date().getTime(), //记录开始点击的时间
    })
    const options = {
      duration: 10000, //指定录音的时长，单位 ms
      sampleRate: 8000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 24000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      audioSource: 'auto',
      frameSize: 12, //指定帧大小，单位 KB
    }
    recorder.start(options) //开始录音
  },

  onReady: function () {
    this.on_recorder();
  },

  //渲染成功后一直监听页面中的录音事件
  on_recorder:function(){
    const that = this;
    // console.log('录音监听事件');
    recorder.onStart((res) => {
      console.log('监听录音开始事件,开始录音')
    })
    recorder.onStop((res) => {
      let {tempFilePath} = res;
      console.log('停止录音,临时路径', tempFilePath);
      var x = new Date().getTime() - this.data.voice_start_date
      if(x > 1000){
        let timestamp = new Date().getTime();
        wx.cloud.uploadFile({
          cloudPath: "sounds/" + timestamp + '.mp3',
          filePath: tempFilePath,
          success:res =>{
            console.log('上传成功', res)
            that.setData({
              soundUrl: res.fileID,
            })
            // 调用云函数上传
            wx.cloud.callFunction({
              name:"submitNews",
              data:{
                voice: res.fileID,
                nickName:wx.getStorageSync('userinfo').nickName,
                avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                openid:wx.getStorageSync('userinfo').openid,
                ymd_time:util.formatTime(new Date()),
                hs_time:util.formatTime1(new Date()),
                qunID:that.data.room_id
              },
              success:res=>{
                console.log('语音上传成功',res)
              },
              fail:res=>{
                console.log('语音上传失败',res)
              }
            })
          },
        })
      }
    })
  },

  //松开录音按钮
  Touch_voice_end:function(){
    console.log('手指松开录音')
    var x = new Date().getTime() - this.data.voice_ing_start_date
    if (x < 1000) {
      console.log('录音停止，说话小于1秒！')
      wx.showModal({
        title: '提示',
        content: '说话要大于1秒！',
      })
      recorder.stop();
    } else {
      // 录音停止，开始上传
      recorder.stop();
    }
  },

  // 打开emoji
  onEmoji:function(){
    if(this.data.isOn == false){
      this.setData({
        isTabs:'emoji',
        isOn:true,
        Height:this.data.Height - 130
      })
    }else if(this.data.isOn){
      if(this.data.isTabs == "features"){
        this.setData({
          isTabs:'emoji'
        })
      }else{
        this.setData({
          isOn:false,
          Height: this.data.Height + 130
        })
      }
    }
  },

  // 发送表情
  sendEmoji:function(e){
    const that = this
    var src = e.currentTarget.dataset.src
    wx.cloud.callFunction({
      name:"submitNews",
      data:{
        emoji:src,
        nickName:wx.getStorageSync('userinfo').nickName,
        avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
        openid:wx.getStorageSync('userinfo').openid,
        ymd_time:util.formatTime(new Date()),
        hs_time:util.formatTime1(new Date()),
        qunID:that.data.room_id
      },
      success:res =>{
        console.log('表情路径上传成功',res)
      },
      fail:res=>{
        console.log('上传表情路径失败',res)
      }
    })
  },

  // 升起更多
  onMore:function(){
    if(this.data.isOn == false){
      this.setData({
        isTabs:'features',
        isOn:true,
        Height:this.data.Height - 130
      })
    }else if(this.data.isOn){
      if(this.data.isTabs == "emoji"){
        this.setData({
          isTabs:'features'
        })
      }else{
        this.setData({
          isOn:false,
          Height: this.data.Height + 130
        })
      }
    }
  },

  // 发送图片
  upPhoto:function(){
    var that = this
    // 选择一张图片
    wx.chooseImage({
      success:chooseResult =>{
        let timestamp = new Date().getTime();
        //将图片上传至云存储空间
        wx.cloud.uploadFile({
          //指定上传到的云路径
          cloudPath: "photos/" + timestamp + '.png',
          //指定要上传文件的临时路径
          filePath: chooseResult.tempFilePaths[0],
          //成功回调
          success:res =>{
            console.log('上传成功',res)
            let imgUrl = res.fileID
            // 将云存储中的图片路径保存到数据库
            wx.cloud.callFunction({
              name:"submitNews",
              data:{
                img: imgUrl,
                nickName:wx.getStorageSync('userinfo').nickName,
                avatarUrl:wx.getStorageSync('userinfo').avatarUrl,
                openid:wx.getStorageSync('userinfo').openid,
                ymd_time:util.formatTime(new Date()),
                hs_time:util.formatTime1(new Date()),
                qunID:that.data.room_id
              },
              success:res =>{
                console.log('图片上传成功',res)
              },
              fail:res=>{
                console.log('图片上传失败',res)
              }
            })
          }
        })
      }
    })
  },

  // 点击图片放大
  handlePrevewImage:function(e){
    // console.log(e)
    wx.previewImage({
      urls: [e.currentTarget.dataset.imgurl],
    })
  }
})