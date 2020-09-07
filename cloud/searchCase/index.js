// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 使用模糊查询的时候记得开启数据库权限，和watch一样
    // 多元素模糊查询时记得加_.or([])
    return await db.collection('case').where(_.or([
    {
      age:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      name:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      nation:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      sex:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      marriage:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      mdc_allergy:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    },
    {
      history_ill:db.RegExp({
        regexp:event.search,
        options:'i'
      })
    }])).get()
  } catch (error) {
    console.log(error)
  }
}