<template>
	<view  class="container flex-column align-center">
		<view class="post-card bg-white radius-xs margin-top-lg flex-row flex-center">
			<textarea placeholder="请输入投诉内容" />
		</view>
		
		<view class="re-btn bg-blue text-white re-btn-lg">
			提交投诉
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.post-card {
		width: 94%;
		height: 400rpx;
	}
	
	.post-card textarea {
		width: 94%;
		height: 360rpx;
		line-height: 40rpx;
	}
	
	.re-btn {
		margin-top: 80rpx;
	}
</style>
