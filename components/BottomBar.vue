<template>
	<view class="re-bottom bg-white shadow-sm flex-row">
		<view class="bottom-left flex-row">
			<view class="home text-center">
				<text class="fa fa-home"></text>
			</view>
			<view class="share text-center">
				<text class="fa fa-share-square"></text>
			</view>
		</view>
		<view class="bottom-right text-center bg-blue text-white text-bold">
			投递简历
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BottomBar',
		props: {
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.re-bottom {
		width: 100vw;
		height: 100rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	
	.bottom-left {
		width: 40%;
	}
	
	.bottom-left .home, .share {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 40rpx;
	}
	
	.bottom-left .home {
		border-right: 1px solid #f1f1f1;
		border-radius: 20rpx 0 0 0;
	}
	.bottom-left .home:active, .share:active {
		background-color: rgba(0,0,0,.1);
	}
	
	.bottom-right {
		width: 60%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0 20rpx 0 0;
	}
	
	.bottom-right:active {
		opacity: 0.9;
	}
</style>
