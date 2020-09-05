// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('rooms').add({
      data:{
        roomID:event.roomID,
        roomPWD:event.roomPWD,
        roomName:event.roomName
      }
    })
  } catch (error) {
    console.log('房间创建失败',error)
  }
}