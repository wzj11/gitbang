<template>
	<view class="container flex-column bg-white">
		
		<!-- 头部用户信息展示 -->
		<view class="head">
			<view class="info-card flex-row">
				<view class="card-left flex-row">
					<view class="img-box flex-row flex-center">
						<image :src="avatarUrl" class="avatar"></image>
					</view>
					<view class="text-box flex-column justify-center">
						<text class="text-bold text-xl">{{nickName}}</text>
							<text class="login"@tap="goLogin" v-if="!isLogin">
										请登录
							</text>

					</view>
				</view>
			</view>
		</view>
		
		<!-- 简历菜单 -->
		<view class="menu-list radius-xs grid col-4 bg-white shadow-sm">
			<view class="menu-item flex-column flex-center" 
			v-for="(menuItem, index) in menuList" :key="index" @click="toOfferPage(index)">
				<image :src="menuItem.icon"></image>
				<text>{{menuItem.name}}</text>
			</view>
		</view>
		
		<!-- 功能菜单 -->
		<view class="func-list radius-xs bg-white">
			<reList v-for="(funcItem, index) in funcList" :key="index"
			:icon="funcItem.icon" :name="funcItem.name" @toFunc="toFuncPage(index)"></reList>
		</view>
	</view>
</template>

<script>
	import reList from '@/components/listItem.vue';
	export default {
		data() {
			return {
				menuList: [
					{
						icon: '../../static/all.png',
						name: '我的发布'
					},
					{
						icon: '../../static/yitoudi.png',
						name: '已收藏'
					},
					{
						icon: '../../static/pass.png',
						name: '未通过'
					},
					{
						icon: '../../static/daimianshi.png',
						name: '浏览记录'
					}
				],
				funcList: [
					{
						icon: '../static/jianli.png',
						name: '我的简历'
					},
					{
						icon: '../static/share.png',
						name: '分享推广'
					},
					{
						icon: '../static/jubao.png',
						name: '举报投诉'
					},
					{
						icon: '../static/setting.png',
						name: '设置'
					}
				],
			}
		},
		components: {
			reList
		},
		onLoad() {
		},
		computed:{
			isLogin: function() {
				return this.$store.state.login
			},
			nickName:function() {
				return this.$store.state.userName
			},
			avatarUrl:function(){
				return this.$store.state.avatarUrl
			},
		},
		methods: {
			toFuncPage:function(index) {
				switch(index) {
					case 0:
						uni.navigateTo({
							url: 'myResume/myResume'
						})
						break;
					case 1:
						uni.navigateTo({
							url: 'share/share'
						})
						break;
					case 2:
						uni.navigateTo({
							url: 'report/report'
						})
						break;
					case 3:
						uni.navigateTo({
							url: 'setting/setting'
						})
						break;
						
				}
			},
			toOfferPage:function(index) {
				switch(index) {
					case 0:
						uni.navigateTo({
							url: 'allOffer/allOffer'
						})
						break;
					case 1:
						uni.navigateTo({
							url: 'Favorite/Favorite'
						})
						break;
					case 2:
						uni.navigateTo({
							url: 'allOffer/allOffer'
						})
						break;
					case 3:
						uni.navigateTo({
							url: 'history/history'
						})
						break;	
				}
			},
			goLogin() {
				// 获取code 小程序专有，用户登录凭证。
				const that = this
				uni.login({
					provider: 'weixin',
					success(login) {
						console.log(login.code);
						let appid = 'wxaec6b551fdca52d8'
						let secret = '35167bcf78197eb6bb6d8c30377e60f5'
						let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
													login.code + '&grant_type=authorization_code';
								uni.request({
									url:url,
									success:res => {
										that.$store.commit('getopenid',res.data.openid)
										console.info(res.data.openid,' open');
									}
								})
					}
				})
				 // desc: '用于完善会员资料'  必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
				uni.getUserProfile({
					desc: '用于完善会员资料',
					lang: 'zh_CN',
					success(user) {
						that.$store.commit('login',user.userInfo)
						console.log(that.isLogin)
						that.$store.commit('adduserinfo')
					}
				})
			},
		}
	}
</script>

<style>
	.container {
		align-items: center;
	}
	.shoucang{
		width: 30rpx;
		height: 30rpx;
	}
	.btlogup{
		width: 200rpx;
		height: 80rpx;
	}
	.head {
		width: 100vw;
		height: 260rpx;
		background-color: #aa00ff;
	}
	
	.head .info-card {
		width: 94%;
		margin-left: 3%;
		height: 170rpx;
	}
	
	.info-card .card-left {
		width: 74%;
		height: 100%;
	}
	
	.info-card .card-left .img-box {
		width: 30%;
		height: 50%;
		margin-top: 40rpx;
	}
	
	.info-card .card-left .text-box {
		width: 70%;
		height: 100%;
		color: white;
	}
	
	.text-box .login{
		font-size: 50upx;
		
	}
	
	.menu-list {
		width: 94%;
		height: 160rpx;
		margin-top: -90rpx;
		
	}
	
	.menu-item {
		height: 160rpx;
	}
	
	.menu-item image {
		width: 64rpx;
		height: 64rpx;
	}
	
	.menu-item text {
		font-size: 15px;
		margin-top: 14rpx;
	}
	
	.func-list {
		width: 100vw;
		margin-top: 30rpx;
		height: 500rpx;
	}
</style>
