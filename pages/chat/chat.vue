<template>
	<uni-list>
	    <uni-list :border="true" v-for="(item,index) in uselist" :key="index">
	        <!-- 显示圆形头像 -->
	        <!-- 右侧带角标 -->
	        <uni-list-chat :title="isyou(item)?item.yourName:item.myName" :time="item.time" :avatar="isyou(item)?item.yourImg:item.myUrl" :note="item.content"  badge-text="2" @click="tomsg(item)" clickable="true"></uni-list-chat>
	    </uni-list>
	</uni-list>
</template>

<script>
	export default {
	    components: {},
	    data() {
	        return {
	            avatarList: [{
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }, {
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }, {
	                url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
	            }],
							chatlist: [{
								id:1,
								name:"王之君",
								time:"2021-02-02 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"10"
								},{
								id:2,
								name:"sasda",
								time:"2021-04-09 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"8"
								},{
								id:3,
								name:"我孙",
								time:"2021-02-09 20:20",
								avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
								num:"2"
								}],
								uselist:[],
								infolist:[],
								userlist:[],
								timer:null,
								real:[],
								img:'',
								yourN:''
	        }
	    },
			onShow() {
				this.fresh()
				this.timer = setInterval(this.fresh,100)
			},
			onHide() {
				if(this.timer) {  
					clearInterval(this.timer);  
					this.timer = null;  
				}  
			},
			methods:{
				fresh:function() {
					const that = this
					let length = that.userlist.length
					const yourid = this.$store.state.openid
					that.infolist = []
					that.userlist = []
					uniCloud.callFunction({
						name:'getyourMsg',
						data:{
							yourid
						},
						success(res) {
						console.log(res)
							if (!that.compare(that.uselist,res.result.data)) {
								that.uselist = res.result.data
								that.uselist.forEach(item => {
									item.time = new Date(item.time).toLocaleString()
								})
							}
							
						}
					})
				},
				isyou(item) {
					if (item.userid == this.$store.state.openid) {
						return true
					} else {
						return false
					}
				},
				show() {
					this.uselist.forEach(item => {
						item.ye = 'zzy'
					})
					this.$forceUpdate()
				},
				compare(item1, item2) {
					if (item1.length == 0) {
						return false
					}
					let num = 0
					item1.forEach((it,index) => {
						if (it.project == item2[index].project && it.mission == item2[index].mission && it.time == new Date(item2[index].time).toLocaleString()) {
							num += 1
						}
					})
					if (num == item1.length) {
						return true
					} else {
						return false
					}
					
				},
				tomsg:function(e) {
					console.log(e)
					let str = JSON.stringify(e)
					uni.navigateTo({
						url:"../testmessage/testmessage?Jsonstr=" + str + "&type=your" 
					})
				}
			}
	}
</script>

<style>
	.chat-custom-right {
	    flex: 1;
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: flex-end;
	}
	
	.chat-custom-text {
	    font-size: 12px;
	    color: #999;
	}
</style>
