// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给的用户
      page:'pages/index/index', //点击提醒后会跳转到的页面
      data:{ //推送的内容
        name1:{
          value:event.name
        },
        date2:{
          value:event.time
        },
        thing3:{
          value:event.message
        },
        thing4:{
          value:event.ps
        }
      },
      templateId:'Ltq-bZTAY18Khvmfg31vvT8JSGzwGFWYhmEFtAbbWdQ' //收到留言模版id
    })
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}