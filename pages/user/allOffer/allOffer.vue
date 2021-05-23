<template>
	<view class="container">
		
		<!-- 顶部菜单栏 -->
		<uni-list v-for="(row, index) in tllist" :key="index" >
		   <uni-list-item :title="row.type" :note="row.content" :rightText="row.price" @click="toDe(row)" clickable="true"></uni-list-item>
		</uni-list>
		<u-toast ref="uToast" type="success"/>
	</view>
</template>

<script>
	import card from '@/components/card.vue';
	
	export default {
		data() {
			return {
				currentIndex: 0,
				tabList: ['全部', '已投递', '待面试', '未通过'],
				tllist:[]
				
			}
		},
		components: {
			card
		},
		onLoad(e) {
			const that = this
			this.currentIndex = e.index;
			if (!this.$store.state.login) {
				this.$refs.uToast.show({
					title:'请先登录',
					type:'error',
					back:'true'
				})
			} else {
				uniCloud.callFunction({
					name:'getyourcon',
					data:{
						user:this.$store.state.openid
					},
					success(res) {
						let newlist = res.result.data
						newlist.forEach((item, index) => {
							if (item.money_type == "日结") {
								item.price = item.price + "/日"
							} else if (item.money_type == "月结") {
								item.price = item.price + "/月"
							}
						})
						that.tllist = that.tllist.concat(newlist)
					}
				})
			}
			
		},
		methods: {
			tabSelect:function(index) {
				this.currentIndex = index;
			},
			toDe:function(item) {
				let str=JSON.stringify(item);
				uni.navigateTo({
					url:'../../detail/detail?jsonStr=' + str
				})
				console.log('yes')
				console.log(item)
			}
		}
	}
</script>

<style>
	.head-tab {
		width: 100%;
		height: 100rpx;
	}
	
	.head-tab .tab-item {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: relative;
	}
	
	.head-tab .active {
		color: #4B7BEC;
	}
	
	.head-tab .active::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 8rpx;
		background-color: #4B7BEC;
		top: 92rpx;
		left: 50%;
		transform: translate(-50%);
		border-radius: 8rpx;
	}
	
	.main {
		height: calc(100vh - 100rpx);
	}
	
	.main .offer-list {
		width: 100%;
		height: auto;
	}
	
	card:last-of-type {
		margin-bottom: 30rpx;
	}
</style>
