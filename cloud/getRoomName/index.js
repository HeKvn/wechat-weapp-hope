// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('rooms').where({roomID:event.room_id}).get()
  } catch (error) {
    console.log(error)
  }  
}