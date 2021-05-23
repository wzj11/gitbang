<template>
	<view class="re-swiper">
		<swiper class="swiper_content square-dot" indicator-dots="true"
		circular="true" autoplay="true" interval="5000" duration="500" 
		next-margin="50rpx" previous-margin="50rpx">
		  <swiper-item v-for="(swiperItem,index) in swiperList" :key="index">
		    <image class="swiper_img radius-xs"
			 :src="swiperItem"></image>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'swiperCard',
		props: {
			swiperList: {
				type: Array,
				default: [
					'https://images.pexels.com/photos/3829603/pexels-photo-3829603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
					'https://images.pexels.com/photos/4233783/pexels-photo-4233783.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
					'https://images.pexels.com/photos/3150553/pexels-photo-3150553.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
				]
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style>
	.re-swiper {
		width: 100vw;
		height: 280rpx;
		margin-top: 20rpx;
	}
	
	.re-swiper .swiper_content {
		width: 100%;
		height: 280rpx;
	}
	
	.swiper_img {
		width: 100%;
		height: 280rpx;
		transform: scale(0.96);
		transition: all .4s linear;
	}
</style>
