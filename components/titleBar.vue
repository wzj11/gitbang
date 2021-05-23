<template>
	<view class="re-title flex-row align-center">
		<text class="text-bold text-lg">{{titleValue}}</text>
		<text class="text-gray text-xs" @click="toWholeInfo">{{moreValue}}</text>
		<text class="fa fa-angle-right text-gray text-xs" v-if="moreValue != ''"></text>
	</view>
</template>

<script>
	export default {
		name: 'titleBar',
		props: {
			titleValue: {
				type: String,
				default: ''
			},
			moreValue: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toWholeInfo:function() {
				this.$emit('entireInfo');
			},
			
		}
	}
</script>

<style>
	.re-title {
		width: 94vw;
		position: relative;
		font-size: 13px;
	}
	
	.re-title text:nth-of-type(2) {
		position: absolute;
		right: 14rpx;
	}
	
	.re-title text:nth-of-type(3) {
		position: absolute;
		right: 0;
	}
</style>
