<template>
    <view class="body">
			<u-input :type="text" placeholder="wzj" :clearable="true"/>
        <form>
            <view class="cu-bar bg-white margin-top">
                <view class="action">
                    图片上传
                </view>
                <view class="action">
                    {{imgList.length}}/4
                </view>
            </view>
            <view class="cu-form-group">
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                     <image :src="imgList[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>
            
        </form>
		</view>
</template>
<script>
    export default {
        data() {
            return {
                imgList: [],
            //  modalName: null,
            };
        },
        methods: {
        
            ChooseImage() {
                uni.chooseImage({
                    count: 4, //默认
                    success: (res) => {
											if (this.imgList.length != 0) {
											                            this.imgList = this.imgList.concat(res.tempFilePaths)
											                        } else {
											                            this.imgList = res.tempFilePaths
											                        }
                        if (res.tempFilePaths.length > 0) {
                            uni.showLoading({
                            	title:'上传中...'
                            })
														let filepath = res.tempFilePaths[0]
														uniCloud.uploadFile({
															filePath:filepath,
															cloudPath:Date.now() + '.jpg',
															success(res) {
																let imageUrl = res.fileID
																console.log(imageUrl,'url')
																uniCloud.callFunction({
																	name:'addImage',
																	data:{
																		imageUrl: imageUrl,
																		createtime: Date.now()
																	},
																	success(res) {
																		console.log(res)
																	}
																})
															}
														})
                        }
                    },
										complete() {
											uni.hideLoading()
										}
                });
            },
            ViewImage(e) {
                uni.previewImage({
                    urls: this.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            //删除
            DelImg(e) {
                uni.showModal({
                    title: '删除',
                    content: '确定要删除这张图片？',
                    cancelText: '取消',
                    confirmText: '删除',
                    success: res => {
                        if (res.confirm) {
                            this.imgList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
        }
    }
</script>

<style>
@import "../../colorui/main.css";
@import "../../colorui/icon.css";
.cu-form-group .title {
   min-width: calc(4em + 15px);
}
.body {
	background-color: #FFFFFF;
}
</style>
