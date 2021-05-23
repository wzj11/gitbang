<template>
	<view class="re-card bg-white flex-column align-center radius-xs"
	@click="toCardDetail">
		<view class="card-top flex-row">
			<view class="job-name">
				<text class="text-xl">{{jobName}}</text>
			</view>
			<view class="job-salary text-bold text-blue text-right">
				<text class="text-xl">{{jobSalary}}</text>
			</view>
		</view>
		<view class="tag-list flex-row">
			<view class="tag-item bg-gray" v-for="(tagItem, index) in tagList" :key="index">
				<text>{{tagItem.name}}</text>
			</view>
		</view>
		<view class="place margin-top-xs text-gray text-xs">
			<text class="fa fa-map-marker"></text>
			<text class="margin-left-sm">{{place}}</text>
		</view>
		<view class="user-info flex-row align-center">
			<image :src="userAvatar" class="avatar-xs"></image>
			<text class="text-xs margin-left-sm text-gray">{{userName}}</text>
			<text>{{date}}</text>
		</view>
		<view class="offer-date" v-if="offerDate != ''">
			<text class="text-gray">2020-09-06 12:31</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'card',
		props: {
			jobId: {
				type: String,
				default: ''
			},
			tagList: {
				type: Array,
				default: []
			},
			date: {
				type: String,
				default: ''
			},
			jobName: {
				type: String,
				default: ''
			},
			jobSalary: {
				type: String,
				default: ''
			},
			place: {
				type: String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			},
			userAvatar: {
				type: String,
				default: ''
			},
			offerDate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toCardDetail:function() {
				this.$emit('toCardDetail');
			},
			
		}
	}
</script>

<style>
	.re-card {
		width: 94vw;
		min-height: 310rpx;
		max-height: 370rpx;
		margin-top: 20rpx;
	}
	
	.card-top {
		width: 96%;
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.card-top .job-name {
		width: 80%;
	}
	
	.card-top .job-salary {
		width: 20%;
	}
	
	.tag-list {
		width: 96%;
		height: 60rpx;
		flex-wrap: nowrap;
		overflow: hidden;
	}
	
	.tag-list .tag-item {
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 10rpx;
		font-size: 12px;
		border-radius: 5rpx;
		color: #606266;
		margin-left: 10rpx;
		margin-top: 10rpx;
		white-space: nowrap;
	}
	
	.tag-list .tag-item:first-of-type {
		margin-left: 0;
	}
	
	.place {
		width: 96%;
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.user-info {
		width: 96%;
		height: 90rpx;
		position: relative;
	}
	
	.user-info text:last-of-type {
		position: absolute;
		right: 0;
		font-size: 13px;
		color: #606266;
	}
	
	.offer-date {
		width: 96%;
		height: 60rpx;
		line-height: 60rpx;
		border-top: 1px solid #f1f1f1;
		font-size: 13px;
	}
</style>
