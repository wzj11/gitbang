<template>
	<view class="contaner">
		<view class="head">
			<view class="">
				<image class="logo" :src="imageurl"></image>
			</view>
			<view class="message">
				<text>昵称: {{nickname}}</text>
				<text>性别: {{gender}}</text>
				<text>手机号</text>
			</view><view class="note">
				<van-icon name="bell" size="90rpx" @click="toNotes"/>
			</view>
		</view>
		<view class="goto">
			<van-button type="default" @click="toClass" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)">
				创建班级
			</van-button>
		</view>
		<view class="goto">
			<van-button type="default" @click="toClass" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)">
				加入班级
			</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function (options) {
			const that = this
			console.log(options)
			that.nickname = options.nickname
			that.imageurl = options.imageurl
			that.gender = options.gender
		},
		data: function () {
			return {
				nickname: '',
				imageurl: '',
				gender: ''
			}
		},
		methods: {
			toClass: function () {
				uni.redirectTo({
					url: '../choose/choose'
				})
			},
			scan: function () {
				uni.scanCode({
					success: function (res) {
					  console.log('条码类型：' + res.scanType);
					  console.log('条码内容：' + res.result);
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: url('http://172.81.235.134:8080/atest/bac.png');
	}
	
	
	.head {
		display: flex;
		flex-direction: row;
		background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596021209439&di=c972464609d0a89107ea8f5c55f97773&imgtype=0&src=http%3A%2F%2Fwww.waibao123.com%2FUploads%2Fphoto%2F2014-07-04%2F672faa193b52a51505d641027081f5b4_big.jpg')
	}
	
	.body {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	.note {
		display: flex;
		align-items: center;
		line-height: 102rpx;
	}
	
	.goto {
		margin: 80rpx;
		text-align: center;
	}
	
	.logo {
		height: 160rpx;
		width: 160rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-bottom: 50rpx;
		border-radius: 50%;
	}
	
	.message {
		display: flex;
		flex-direction: column;
		margin: 40rpx;
		width: 300rpx;
	}
	
	.message text {
		font-size: 28rpx;
	}
</style>