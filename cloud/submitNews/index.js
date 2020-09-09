// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('news').add({
      data:{
        message:event.message,
        voice:event.voice,
        emoji:event.emoji,
        img:event.img,
        case:event.case,
        name:event.nickName,
        avatarUrl:event.avatarUrl,
        openid:event.openid,
        YMD_time:event.ymd_time,
        HS_time:event.hs_time,
        qunID:event.qunID
      }
    })
  } catch (error) {
    console.log(error)
  }
}