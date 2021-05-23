<template>
	<view class="re-search flex-row flex-center radius-xs">
		<text class="fa fa-search text-xl"></text>
		<input type="text" v-model="key_word" ref="key_word" placeholder="请输入搜索内容"
		 confirm-type="search" @confirm="searchResult" />
	</view>
</template>

<script>
	export default {
		name: 'searchBar',
		data() {
			return {
				key_word: ''
			};
		},
		methods: {
			searchResult:function() {
				this.$emit('searchClick');
			},
		}
	}
</script>

<style>
	.re-search {
		width: 94vw;
		height: 72rpx;
		background-color: #f1f2f6;
	}
	
	.re-search input {
		width: 86%;
		margin-left: 20rpx;
		font-size: 15px;
	}
</style>
