'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
    //event为客户端上传的参数
		const {
			user,
			project
		} = event
		const collection = db.collection('collect')
		const res = await collection.where({
			user: user,
			project: project
		}).get()
		return res 
 // 获取表'unicloud-test'的集合对象
     // 获取表中的10条数据，结果为json格式
// 返回json给客户端
};