// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('case').add({
      data:{
        name:event.name,
        nation:event.nation,
        sex:event.sex,
        age:event.age,
        marriage:event.marriage,
        mdc_allergy:event.mdc_allergy,
        history_ill:event.history_ill
      }
    })
  } catch (error) {
    console.log('提交病例失败')
  }
}