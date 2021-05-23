'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		yourid
	} = event
	const $ = db.command.aggregate
	const collection = db.collection('message')
	const res = await collection.aggregate()
	.match(db.command.or({
		userid:yourid
	},
	{
		friendid:yourid
	})
	
	)
	.sort({
		time:-1
	})
	.group({
		_id:{
			project:'$project',
			mission:'$mission',
			our:'$our'
		},
		time:$.first('$time'),
		content:$.first('$content'),
		yourName:$.first('$yourName'),
		yourImg:$.first('$yourImg'),
		yourid:$.first('$friendid'),
		myName:$.first('$myName'),
		myUrl:$.first('$myUrl'),
		userid:$.first('$userid')
	})
	.sort({
		time:-1
	})
	.end()
	
	//返回数据给客户端
	return res
};
