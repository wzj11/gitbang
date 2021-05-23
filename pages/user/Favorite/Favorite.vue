<template>
	<view>
		<u-toast ref="uToast" type="success"/>
		<uni-list v-for="(row, index) in tllist" :key="index" >
		   <uni-list-item :title="row.type" :note="row.content" :rightText="row.price" @click="toDe(row)" clickable="true"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tllist:[]
			}
		},
		methods: {
			toDe:function(item) {
				let str=JSON.stringify(item);
				uni.navigateTo({
					url:'../../detail/detail?jsonStr=' + str
				})
				console.log('yes')
				console.log(item)
			}
		},
		onLoad() {
			const that = this
			if (this.$store.state.login) {
				uniCloud.callFunction({
					name:'getcollect',
					data:{
						user:this.$store.state.openid
					},
					success(res) {
						console.log(res)
						res.result.data.forEach(item => {
							that.tllist = that.tllist.concat(item.project)
						})
					}
				})
			} else {
				this.$refs.uToast.show({
					title:'请先登录',
					type:'error',
					back:'true'
				})
			}
			
		}
	}
</script>

<style>

</style>
