<template>
	<!-- 总容器 -->
	<view class="char-container" id="">
		<!-- 聊天头部导航栏 -->
		<view class="char-top-bar" id="topbar">
			<view class="char-top-bar-left">
				<image src="../../common/images/back.png" class="autoImg" mode="" @click="goBack"></image>
			</view>
			<view class="char-top-bar-center" >
				<text class="name">{{yourName}}</text>
			</view>
			<view class="char-top-bar-right">
				<image src="../../common/images/kana/11.jpg" class="autoImg" mode=""></image>
			</view>
		</view>
		<view style="height: 88rpx;"></view>
		<scroll-view id="scrollview" scroll-y="true" :style="{height: style.contentViewHeight + 'px'}"  scroll-with-animation="true" :scroll-top="scrollTop" :scroll-into-view="childrenId"
		 
																														:refresher-threshold="45"
																															:refresher-enabled="true"
																															:refresher-triggered="refresherTriggered"
																															@refresherrefresh="refresherrefresh"
																															@refresherrestore="refresherrestore"
																															@refresherabort="refresherabort"
																														>
			<view id="chatC" class="chat-infor-container" >
				<!-- 朋友聊天 -->
				<view v-for="(item,index) in contentlist" :key="index" :class="{ 'friends-char-informations-container': item.friend, 'user-char-informaations-container': item.user }" :id="'id-' + index">
					<view class="time-container">
						<text class="time">{{item.time}}</text>
					</view>
					<view class="info">
						<view class="username">
							{{item.name}}
						</view>
						<view class="left">
							<rich-text class="informations" v-if="item.user" style="word-break:break-all;">{{item.content}}</rich-text>
							<image :src="item.img" class="autoImg" mode="" v-if="item.friend"></image>
						</view>
						<view class="right" >
							<rich-text class="informations" v-if="item.friend" style="word-break:break-all;">{{item.content}}</rich-text>
							<image :src="item.img" class="autoImg" mode="" v-if="item.user"></image>
						</view>
					</view>

				</view>
				<!-- 用户聊天 -->
				<!--<view class="user-char-informaations-container" >
					<view class="time-container" >
						<text class="time">2020/11/11</text>
					</view>
					<view class="info">
						<view class="username">
							{{myName}}
						</view>
						
						<view class="left">
							<text class="informations">别叫了，再叫就烦了</text>
						</view>
						<view class="right">
							<image :src="imaUrl" class="autoImg" mode=""></image>
						</view>
					</view>
				</view>-->
				<!-- 感觉上图片的插入应该使用脚本比较好 -->
			</view>
			<view :style="{height: addHeight}"></view>
		</scroll-view>
		<!-- 底部容器 -->
		<view class="bottom-all-container">
			<!-- 底部表情 即输入框 -->
			<view class="char-bottom-container" id="char_bottom">
				<view class="left" >
					<!--<image src="../../common/images/jp.png" @click="talk" class="autoImg" mode=""></image>-->
					<u-icon name="chat" @click="talk" class="autoImg" size="60"></u-icon>
				</view>
				<!-- <view class="left" >
					<image src="../../common/images/talk.png" @click="talk" class="autoImg" mode=""></image>
				</view> -->
				<view class="center" >
					<input type="text"  class="inputText" value="" v-model="yourtext" />
					<button class="but" @click="addmsg">发送</button>
					<!-- <button type="default" >按住说话</button> -->
				</view>
				
				<view class="right">
					<!--<image src="../../common/images/emoji.png" @click="clickEmoji" class="emoji" mode=""></image>-->
					<u-icon name="moments" @click="clickEmoji" class="emoji" size="60"></u-icon>
					<u-icon name="plus-circle" @click="clickMore" class="add" size="60"></u-icon>
					<!--<image src="../../common/images/add.png" @click="clickMore" class="add" mode=""></image>-->
				</view>
			</view>
			<!-- 点击图标加载表情 -->
			<!-- <view class="emojiBlock" v-show="emojiStatus">
				<swiper :indicator-dots="true" :duration="1000">
					<swiper-item >
						<view class="emojiList" v-for="(item,index) in emoji.slice(0,3)" :key="index">
							<view class="emoji" v-for="(one,index) in item" :key="index" @click="addEmojiToInputs(one)">
								{{one}}
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="emojiList" v-for="(item,index) in emoji.slice(3,6)" :key="index">
							<view class="emoji" v-for="(one,index) in item" :key="index" @click="addEmojiToInputs(one)">
								{{one}}
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="emojiList" v-for="(item,index) in emoji.slice(6,)" :key="index">
							<view class="emoji" v-for="(one,index) in item" :key="index" @click="addEmojiToInputs(one)">
								{{one}}
							</view>
						</view>
						
					</swiper-item>
				</swiper>
			</view> -->
			<!-- 点击图标加载更多 -->
			<!-- 本来以为列表能省事些，发现并不行，因为我们得给每个不同的设置一个事件 -->
			<!-- 但后来想想 用个中转站处理事件就行，就懒得改了。 -->
			<!-- <view class="more" v-show="moreStatus">
				<view class="container" v-for="(item,index) in more" :key="index" @click="Transfer(index)">
					<view class="content">
						<image :src="item.imgurl" class="autoImg"></image>
					</view>	
					<view class="text">
						{{item.descText}}
					</view>
				</view>
				
			</view> -->
		</view>
		<!-- 用于撑开该脱离文档流的高度 -->
		<!-- 这个应该要跟随点击时的高度变化 -->
		<!-- 内容容器 -->
	</view>

</template>

<script>
	//import transTime from '../../common/js/transTimestamp.js'
	export default {
		data() {
			return {
				info:{},
				yourName:'',
				yourImg:'',
				yourtext:'',
				yourid:'',
				isfriend:true,
				isuser:false,
				pos:'id-0',
				mission:'',
				contentlist:[],
				timer:null,
				childrenId:'',
				temp:[],
				num:0,
				our:[],
				skip:10,
				refresherTriggered: false,
				_refresherTriggered: false,
				style: {
							pageHeight: 0,
							contentViewHeight: 0,
							footViewHeight: 90,
							mitemHeight: 0,
						},
				scrollTop : 0
			}
		},
		computed:{
			isfriend:function() {
				return function(item){
					const userid = item.userid
					if (userid == this.yourid) {
						return true
					}
					return false
				}
			},
			isuser:function() {
				return function(item) {
					const userid = item.userid
					if (userid == this.yourid) {
						return false
					}
					return true
				}
			}
		},
		created() {
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
				this.style.pageHeight = res.windowHeight;
				this.style.contentViewHeight = res.windowHeight - 100;
		},
		methods: {
			addmsg:function() {
				const that = this
				if (that.yourtext.length != 0 ) {
					uniCloud.callFunction({
						name:'addcontent',
						data:{
							userid:that.$store.state.openid,
							friendid:that.yourid,
							content:that.yourtext,
							time:Date.now(),
							myName:this.$store.state.userName,
							myUrl:this.$store.state.avatarUrl,
							yourName:this.yourName,
							yourImg:this.yourImg,
							project:that.project,
							our:that.our
						},
						success(res) {
							console.log(res,'addyes')
							that.yourtext = ''
							that.skip += 1
							that.num = 0
						}
					})
				}
				
			},
			setScroll(num) {
				let len = this.contentlist.length;
				this.childrenId = 'id-' + num
			},
			scrollToBottom() {
				let that = this;
				let query = uni.createSelectorQuery();
				query.selectAll('.cu-chat').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					hat.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40) //获取所有内部子元素的高度
					// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这定时器
					setTimeout(() => {
			 
						if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) { //判断子元素高度是否大于显示高度
						    that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
					    }
					}, 100)
				})
			},
			getMsg:function() {
				const that = this
				console.log(that.project._id)
				uniCloud.callFunction({
					name:'getcontent',
					data:{
						userid:that.$store.state.openid,
						friendid:that.yourid,
						mission:that.project._id,
						ski:that.skip
					},
					success(res) {
						console.log(res)
						if (!that.compare(that.contentlist, res.result.data)) {
							that.contentlist = res.result.data
							that.contentlist.forEach(item => {
								if (item.userid == that.yourid) {
									item.friend = true
									item.user = false
									item.name = that.yourName
									item.img = that.yourImg
								} else {
									item.friend = false
									item.user = true
									item.name = that.myName
									item.img = that.imaUrl
								}
								item.time = new Date(item.time).toLocaleString()
							})
							if (that.num == 0) {
								that.setScroll(0)
								that.num = 1
							}
							
						}
						
					}
				})
			},
			compare(item1, item2) {
				if (item1.length == 0) {
					return false
				}
				if (item1.length != item2.length) {
					return false
				}
				let num = 0
				item1.forEach((it,index) => {
					if (it.time == new Date(item2[index].time).toLocaleString()) {
						num += 1
					}
				})
				if (num == item1.length) {
					return true
				} else {
					return false
				}
				
			},
			refresherrefresh(){
					console.log("自定义下拉刷新被触发");
					let _this = this;
					if (_this._refresherTriggered) {
						return;
					}
					_this._refresherTriggered = true;
					//界面下拉触发，triggered可能不是true，要设为true
					if (!_this.refresherTriggered) {
						_this.refresherTriggered = true;
					}
					this.loadStoreData();
				},
				refresherrestore(){
					console.log("自定义下拉刷新被复位");
					let _this = this;
					_this.refresherTriggered = false;
					_this._refresherTriggered = false;
				},
				refresherabort(){
					console.log("自定义下拉刷新被中止	");
					let _this = this;
					_this.refresherTriggered = false;
					_this._refresherTriggered = false;
				},
				loadStoreData() {
					let _this = this;
					this.listData();
					setTimeout(() => {
						_this.refresherTriggered = false;//触发onRestore，并关闭刷新图标
						_this._refresherTriggered = false;
						_this.setScroll(_this.contentlist.length)
					}, 1000)
				},
				listData() {
					let _this = this;
					_this.skip += 10
					//这里是调用后台接口的方法数据
				},
		},
		onLoad: function(option){
			const that = this
			let object=JSON.parse(option.Jsonstr);
			if (option.type == "my") {
				
				this.project = object
				if (this.$store.state.openid != this.project.openid) {
					that.our = that.our.concat(this.$store.state.openid)
					that.our = that.our.concat(this.project.openid)
				}
				this.info = object
				uniCloud.callFunction({
					name:'getinfo',
					data:{
						openid:object.openid,
					},
					success(res) {
						that.yourName =res.result.data[0].userName
						that.yourImg =res.result.data[0].avatarUrl
						that.yourid =res.result.data[0].openid
						
					}
				})
				
				that.timer = setInterval(that.getMsg,100)
			} else if(option.type == "your"){
				console.log(object,'123')
				this.project = object._id.project
				if (this.$store.state.openid == object.userid) {
					
					
					that.yourName = object.yourName
					that.yourImg = object.yourImg
					that.yourid = object.yourid
					if (this.$store.state.openid != this.project.openid) {
						that.our = that.our.concat(this.$store.state.openid)
						that.our = that.our.concat(this.project.openid)
						console.log(that.our)
					} else {
						that.our = that.our.concat(object.yourid)
						that.our = that.our.concat(this.$store.state.openid)
					}
				} else {
					
					
					that.yourName = object.myName
					that.yourImg = object.myUrl
					that.yourid = object.userid
					if (this.$store.state.openid != this.project.openid) {
						that.our = that.our.concat(this.$store.state.openid)
						that.our = that.our.concat(this.project.openid)
					} else {
						that.our = that.our.concat(object.userid)
						that.our = that.our.concat(this.$store.state.openid)
					}
				}
				
				
				console.log(that.yourName)
						
				that.timer = setInterval(that.getMsg,100)
			}
			
			
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		computed:{
			myName:function() {
				return this.$store.state.userName
			},
			imaUrl:function() {
				return this.$store.state.avatarUrl
			}
		}
	}
</script>

<style lang="scss" scoped>
	.autoImg {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.but {
		width: 20%;
		font-size: 10px;
		margin: 0;
	}
	.char-container {
		
		min-height: 100vh;
		width: 100%;
		background-color: #f4f4f4;

		.char-top-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 88rpx;
			padding: 0 32rpx;
			background-color: #f4f4f4;
			z-index: 999;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $uni-border-color;

			.char-top-bar-left {
				height: 48rpx;
				width: 48rpx;
				padding: 20rpx 0;
			}

			.char-top-bar-center {
				padding: 16rpx 0;
				font-family: PingFangSC-Regular;
				font-size: 20px;
				color: black;
				line-height: 56rpx;
				letter-spacing: -0.69px;
			}

			.char-top-bar-right {
				padding: 8rpx 0 12rpx 0;
				border-radius: 16rpx;
				height: 68rpx;
				width: 68rpx;
			}
		}


		.chat-infor-container {
			padding: 40rpx 32rpx 0 32rpx;
			display: flex;
			flex-direction: column-reverse;

			.friends-char-informations-container {
				display: flex;
				flex-direction: column;

				.time-container {
					padding: 10rpx 0;
					text-align: center;

					.time {
						color: grey;
						font-size: 24rpx;
						line-height: 34rpx;
						letter-spacing: -0.82rpx;
					}
				}

				.info {
					display: flex;
					position: relative;
					.left {
						width: 80rpx;
						height: 80rpx;
					}
					.username{
						position: absolute;
						font-size: 24rpx;
						color: grey;
						top: -40rpx;
						left: 0;
						max-width: 100rpx;
					}
					.right {
						margin-left: 16rpx;
						max-width: 480rpx;
						background-color: #ffffff;
						border-radius: 0px 10px 10px 10px;

						.informations {
							display: inline-block;
							padding: 16rpx 22rpx 16rpx 24rpx;
							font-family: PingFangSC-Regular;
							font-size: 32rpx;
							color: #272832;
							text-overflow: ellipsis;
							letter-spacing: -0.55px;
						}
					}
					.img{
						margin-left: 16rpx;
						height: 320rpx;
						width: 284rpx;
						image{
							border-radius: 20rpx;
						}
					}
				}

			}
		}

		.user-char-informaations-container {
			display: flex;
			flex-direction: column;

			.time-container {
				padding: 10rpx 0;
				text-align: center;

				.time {
					color: grey;
					font-size: 24rpx;
					line-height: 34rpx;
					letter-spacing: -0.82rpx;
				}
			}

			.info {
				display: flex;
				justify-content: flex-end;
				position: relative;
				.username{
					position: absolute;
					font-size: 24rpx;
					color: grey;
					top: -40rpx;
					right: 0;
					max-width: 100rpx;
				}
				.left {
					display: inline-block;
					max-width: 480rpx;
					margin-right: 16rpx;
					border-radius: 10px 0px 10px 10px;
					background-color: white;
					
					.informations {
						display: inline-block;
						padding: 16rpx 22rpx 16rpx 24rpx;
						font-family: PingFangSC-Regular;
						font-size: 32rpx;
						color: #272832;
						text-overflow: ellipsis;
						letter-spacing: -0.55px;
					}
					
				}

				.right {
					width: 80rpx;
					height: 80rpx;
				}
				.img{
					margin-right: 16rpx;
					height: 320rpx;
					width: 284rpx;
					image{
						border-radius: 20rpx;
					}
				}
				.map{
					margin-right: 16rpx;
				}
				.video{
					margin-right: 16rpx;
				}
			}

		}

		.bottom-all-container {
			display: flex;
			flex-direction: column;
			position: fixed;
			bottom:0;
			left: 0;
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;
			z-index: 999;
			.char-bottom-container {
				display: flex;
				text-align: center;
				justify-content: space-between;
				background-color: #f4f4f4;
				z-index: 999;
				
				.left {
					width: 56rpx;
					padding: 18rpx 24rpx 18rpx 0;
					padding-right: 0;
				}

				.center {
					width: 600rpx;
					padding: 14rpx 20rpx 12rpx 20rpx;
					display: flex;
					
					.inputText {
						width: 80%;
						height: 72rpx;
						background-color: #ffffff;
						border-radius: 10rpx;
					}

					button {
						height: 72rpx;
						line-height: 72rpx;
						text-align: center;
						font-weight: bold;
						background-color: #ffffff;
						border-radius: 10rpx;
					}
				}

				.right {
					display: flex;

					image {
						width: 56rpx;
						height: 56rpx;
					}

					.add {
						padding: 18rpx 0 18rpx;
					}

					.emoji {
						padding: 18rpx 24rpx 18rpx 0;
						padding-right: 0;
					}
				}
			}

			.emojiBlock {
				background-color: #f4f4f4;
				z-index: 999;
				height: 400rpx;
				width: 100%;
				.emojiList{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					width: 100%;
					.emoji{
						width: 12.5%;
						font-size: 30px;
					}
				}
			}
			.more{
				background-color: #f4f4f4;
				z-index: 999;
				height: 400rpx;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.container{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 224rpx;
					box-sizing: border-box;
					padding: 20rpx;
					.content{
						height: 120rpx;
						width: 120rpx;
					}
					.text{
						height: 30rpx;
						font-size: 24rpx;
						color: grey;
						line-height: 30rpx;
					}
				}
			}
		
		}

	}
</style>


