<template>
	<view class="">
		<sl-filter :ref="'slFilter'" :topFixed="true" :isTransNav="true" :navHeight="0" :color="titleColor" themeColor="#000000" :menuList="menuList"
				         @result="aaa"></sl-filter>
		<uni-list v-for="(row, index) in tlllist" :key="index">
		    <uni-list-item :title="row.type" :note="row.address + '  ' + row.time" :rightText="row.price" to="../detail/detail"></uni-list-item>
		</uni-list>
  </view>
	
</template>

<script>
	import slFilter from "../../components/songlazy-sl-filter/sl-filter/sl-filter.vue"
	export default{
		components: {
			 slFilter
		},
		data(){
			return{
				tllist:[],
				tlllist:[],
				xtl:[],
				result:{},
				menuList: [
				    {
				        'title': '结算方式',
				        'detailTitle': 'lll',
				        'isMutiple': false,
				        'key': 'key_1',
				        'detailList': [
									{
									    'title': '不限',
									    'value': '不限'
									},
				            {
				                'title': '日结',
				                'value': '日结'
				            },
				            {
				                'title': '次结',
				                'value': '次结'
				            },
				            {
				                'title': '月结',
				                'value': '月结'
				            }
				        ]
				    },
				    {
				        'title': '薪酬',
				        'detailTitle': '子标题2',
				        'key': 'key_2',
				        'isMutiple': false,
				        'detailList': [
									{
									    'title': '不限',
									    'value': 0
									},
				            {
				                'title': '100以下',
				                'value': 1
				            },
				            {
				                'title': '100-500',
				                'value': 2
				            },
				            {
				                'title': '500-1000',
				                'value': 3
				            },
										{
										    'title': '1000-1500',
										    'value': 4
										},
										{
										    'title': '1500-2000',
										    'value': 5
										},
										{
										    'title': '2000-3000',
										    'value': 6
										},
										{
										    'title': '3000以上',
										    'value': 7
										}
				        ]
				    },
						{
						    'title': '兼职时间',
						    'detailTitle': '子标题2',
						    'key': 'key_3',
						    'isMutiple': false,
						    'detailList': [
						        {
						            'title': '不限',
						            'value': 0
						        },
						        {
						            'title': '全天',
						            'value': 1
						        },
						        {
						            'title': '2小时内',
						            'value': 2
						        },
										{
										    'title': '2-4小时',
										    'value': 3
										},
										{
										    'title': '4-6小时',
										    'value': 4
										},
						    ]
						},
				    {
				        'title': '排序',
				        'detailTitle': '子标题3',
				        'key': 'key_4',
				        'isSort': true,
				        'isMutiple': false,
				        'detailList': [
									{
									    'title': '默认排序',
									    'value': 0
									},
				            {
				                'title': '距离远近',
				                'value': 1
				            },
				            {
				                'title': '价格高低',
				                'value': 2
				            },
				            {
				                'title': '时间长短',
				                'value': 'val_3_3'
				            }
				        ]
				    }
				],
			}
		},
		onLoad(option) {
			const that = this
			console.log(option.name)
			uni.showLoading({

			})
			uniCloud.callFunction({
				name:'findtype',
				data:{
					id:'wzj',
					value:option.name
				},
				success(res) {
					console.log(res.result.data,'内容')
					that.tllist = res.result.data
					that.tlllist = res.result.data
					that.xtl = res.result.data
					that.tllist.forEach((item, index) => {
						if (item.money_type == "日结") {
							item.price = item.price + "/日"
						}
					})
				},
				complete() {
					uni.hideLoading()
				}
			})
		},
		methods:{
			sortKey(array,key){
				return array.sort(function(a,b){
					let x = a[key];
					let y = b[key];
					return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
					})
			  },
			getmoneytype(){
				const that = this
				that.tllist.forEach((item,index) => {
					if (item.money_type == that.result.key_1||that.result.key_1=="") {
						that.tlllist.push(item)
					}
				})
			},
			cheakprice(x,y){
				const that = this
				let num = [];
				that.tlllist.forEach(item => {
					num.push(parseInt(item.price.slice(1,-2)))
				})
				console.log(that.result)
				let price = []
				that.tlllist.forEach((item,index)  => {
					if (x < num[index] && num[index] <= y) {
						price.push(item)
					}
				})
				that.tlllist = price
			},
			sorttl(){
				const that = this
				switch(that.result.key_4){
					case 0: break;
					case 2:
					  let num1 = []
					  that.tlllist.forEach((item,index) => {
					  	num1.push(item)
							num1[index].price = parseInt(num1[index].price.slice(1,-2))
							console.log(num1)
					  })
					  num1 = that.sortKey(num1,'price')
						num1.forEach((item, index) => {
							if (item.money_type == "日结") {
								item.price = "¥" + item.price + "/日"
							}
						})
						that.tlllist = num1
						break;
				}
			},
			getnumber(){
				const that = this
				switch(that.result.key_2){
					case 0: break;
					case 1: 
					console.log(that.tlllist)
					  that.cheakprice(0,100)
						break;
					case 2:
					  that.cheakprice(100,500)
					  break;
					case 3:
					  that.cheakprice(500,1000)
					  break;
					case 4:
					  that.cheakprice(1000,1500)
					  break;
					case 5:
					  that.cheakprice(1500,2000)
					  break;
					case 6:
					  that.cheakprice(2000,3000)
					  break;
					case 7:
					  that.cheakprice(3000,99999999)
					  break;
				}
			},
			aaa(e){
				const that = this
				this.result = e;
				that.tlllist = []
				that.getmoneytype()
				that.getnumber()
				that.sorttl()
			}
		}
	}
</script>

<style>
</style>
