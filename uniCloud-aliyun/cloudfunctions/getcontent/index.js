'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userid,
		friendid,
		mission,
		ski
	} = event
	console.log('event : ', event)
	const dbCmd = db.command
	const collection = db.collection('message')
	const res = collection.where(dbCmd.or({
		userid:userid,
		friendid:friendid,
	},
	{
		userid:friendid,
		friendid:userid
	})).orderBy('time','desc').limit(ski).get()
	
	//返回数据给客户端
	return res
};
