<template>
  <!-- home.vue -->
  <view>
    <!-- 轮播图区域 -->
    <!-- indicator-dots:是否显示面板指示点
          autoplay:是否自动切换
          interval:自动切换时间间隔
          duration:滑动动画时长
          circular:是否采用衔接滑动
          更多配置查看微信小程序开发文档
     -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染item项 -->
     <swiper-item v-for="(item, i) in swiperList" :key="i">
         <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
           <!-- 动态绑定图片的 src 属性 -->
           <image :src="item.image_src"></image>
         </navigator>
     </swiper-item>
 

    </swiper>
	  <!-- home.vue -->
	<!-- 分类导航区域 -->
	<view class="nav-list">
	  <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
	    <image :src="item.image_src" class="nav-img"></image>
	  </view>
	</view>


  </view>
</template>


<script>
	//home.vue
	export default {
	    data() {
	      return {
	        //存放轮播图数据
	        swiperList:[],  
			 navList: [],
	      };
	    },
	    onLoad(){
	      //在小程序页面刚加载的时候，调用获取轮播图数据的方法
	      this.getSwiperList()
		      this.getNavList()

	    },
	    methods:{
			// nav-item 项被点击时候的事件处理函数
			navClickHandler(item) {
			  // 判断点击的是哪个 nav
			  if (item.name === '分类') {
			    uni.switchTab({
			      url: '/pages/cate/cate'
			    })
			  }
			},

	      //获取轮播图数据
	      async getSwiperList(){
	        //发起请求，从返回的数据中结构出data并起个res的别名
	        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
			console.log();
	        //请求失败
	     //请求失败
	     if(res.meta.status !==200) return uni.$showMsg()

	        //请求成功
	        this.swiperList=res.message
	      },
		   async getNavList() {
		        const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
		        if (res.meta.status !== 200) return uni.$showMsg()
		        this.navList = res.message
		      },
		 
	    }
	  }

</script>

<style lang="scss">
 
  swiper{
    height: 330rpx;
    .swiper_item,image {
      height:100% ;
      width: 100%;
    }
  }
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  
    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }
</style>
