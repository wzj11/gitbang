<template>
	<view class="container bg-white flex-column align-center">
		<view class="menu-list">
			<reList :icon="'../static/xieyi.png'" :name="'平台协议'"></reList>
		</view>
		<view class="re-btn bg-red text-white re-btn-lg" @click="logout" v-if="isLogin">
			退出登录
		</view>
		<text v-if="!isLogin">您尚未登录</text>
		<u-toast ref="uToast" type="success"/>
	</view>
</template>

<script>
	import reList from '@/components/listItem.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			reList
		},
		computed:{
			isLogin:function() {
				return this.$store.state.login
			}
		},
		methods: {
			logout:function() {
				this.$store.commit('logout')
				this.$refs.uToast.show({
					title:'成功退出',
					type:'success'
				})
			}
		}
	}
</script>

<style>
	.menu-list {
		width: 100%;
		height: auto;
	}
	
	.re-btn {
		margin-top: 100rpx;
	}
</style>
