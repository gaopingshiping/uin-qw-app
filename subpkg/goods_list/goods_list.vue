<template>
<view>
<view class="goods-list">
<block v-for="(item, i) in goodsList" :key="i">
 <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
 <my-goods :goods="item"></my-goods>
</block>
</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				 isloading: false,

			};
			
		},
		// 获取商品列表数据的方法
		async getGoodsList() {
		// 发起请求
		const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
		if (res.meta.status !== 200) return uni.$showMsg()
		 
		// 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
		this.goodsList = [...this.goodsList, ...res.message.goods]
		this.total = res.message.total
		},
		// 触底的事件
		onReachBottom() {
		// 让页码值自增 +1
		this.queryObj.pagenum += 1
		// 重新获取列表数据
		this.getGoodsList()
		},

		
	}
</script>

<style lang="scss">

</style>
