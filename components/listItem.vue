<template>
	<view class="re-list flex-row align-center" @click="toFuncPage">
		<image :src="icon"></image>
		<text>{{name}}</text>
		<text class="fa fa-angle-right"></text>
	</view>
</template>

<script>
	export default {
		name: 'reList',
		props: {
			icon: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				
			}
		},
		methods: {
			toFuncPage:function() {
				this.$emit('toFunc');
			}
		}
	}
</script>

<style>
	.re-list {
		width: 100%;
		height: 100rpx;
		position: relative;
	}
	
	.re-list:active {
		background-color: rgba(0,0,0,.1);
	}
	
	.re-list image {
		width: 52rpx;
		height: 52rpx;
		margin-left: 20rpx;
	}
	
	.re-list text:first-of-type {
		margin-left: 14rpx;
	}
	
	.re-list .fa-angle-right {
		position: absolute;
		right: 20rpx;
		font-size: 40rpx;
	}
</style>
