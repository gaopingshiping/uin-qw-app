<template>
	<view>
		<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
		
		<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>

		<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		 <view class="goods-name">{{item.goods_name}}</view>
		 <uni-icons type="arrowright" size="16"></uni-icons>
		</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box">
		<!-- 标题区域 -->
		<view class="history-title">
		 <text>搜索历史</text>
		  <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		
		</view>
		<!-- 列表区域 -->
		<view class="history-list">
		 <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				 showSync: true,
				 searchVal: "",
				 timer: null,
				 kw: '',
				 searchResults: [],
				  historyList: ['a', 'app', 'apple']


			};
		},
		onLoad() {
		 this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
		 input(e) {
		  //用户在500ms内连续输入内容，应该清除之前的
		  clearTimeout(this.timer)
		  //开一个延时器就会有一个返回值 timer
		  this.timer = setTimeout(() => {
		      this.kw = e
		      this.getSearchList()
		  },500)
		 },
		 
		 gotoDetail(goods_id) {
		 uni.navigateTo({
		  // 指定详情页面的 URL 地址，并传递 goods_id 参数
		  url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
		 })
		 },
		 
		 
		 // 根据搜索关键词，搜索商品建议列表
		  getSearchList() {
		 // 判断关键词是否为空
		 this.saveSearchHistory()

		 },
		 
		//保存搜索关键词
		saveSearchHistory() {
		 const set = new Set(this.historyList)
		 set.delete(this.kw)
		 set.add(this.kw)
		 this.historyList = Array.from(set)
		 //调用uni.setStorageSync(key,value) 将搜索记录持久化存储到本地
		 uni.setStorageSync('kw',JSON.stringify(this.historyList))
		},
		 
		 
		 
		 //清空搜索历史记录
		 cleanHistory() {
		  //清空 data 保存的搜索历史
		  this.historyList = []
		  //清空本地存储中的搜索历史
		  uni.setStorageSync('kw','[]')
		 },
		 
		 
		 gotoGoodsList(kw) {
			
		  uni.navigateTo({
		      url:'subpkg/goods_list/goods_list?query=' + kw
		  })
		 },
		 
		

		 
		 
		
		 
		 
		},
		computed: {
		 histories() {
		     return[...this.historyList].reverse()
		 }
		}
	}
</script>

<style lang="scss">
.uni-searchbar {
/* #ifndef APP-NVUE */
display: flex;
/* #endif */
flex-direction: row;
position: relative;
padding: 16rpx;
/* 将默认的 #FFFFFF 改为 #C00000 */
background-color: #c00000;
}
.search-box {
position: sticky;
top: 0;
z-index: 999;
}
.sugg-list {
padding: 0 5px;
 
.sugg-item {
 font-size: 12px;
 padding: 13px 0;
 border-bottom: 1px solid #efefef;
 display: flex;
 align-items: center;
 justify-content: space-between;
 
 .goods-name {
   // 文字不允许换行（单行文本）
   white-space: nowrap;
   // 溢出部分隐藏
   overflow: hidden;
   // 文本溢出后，使用 ... 代替
   text-overflow: ellipsis;
   margin-right: 3px;
 }
}
}
.history-box {
padding: 0 5px;
 
.history-title {
 display: flex;
 justify-content: space-between;
 align-items: center;
 height: 40px;
 font-size: 13px;
 border-bottom: 1px solid #efefef;
}
 
.history-list {
 display: flex;
 flex-wrap: wrap;
 
 .uni-tag {
   margin-top: 5px;
   margin-right: 5px;
 }
}
}
</style>
