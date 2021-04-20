
	<template>
    <view>
    <view class="app">
      
      <!-- 
        scroll-view 容器解析
        lower-threshold 下拉刷新阈值 下拉到多少px执行刷新事件    @refresherrefresh
        scroll-y 准许y轴滚动
        scroll-with-animation 动画效果
        refresher-threshold  上滑加载的阈值 上拉到距离底部多少px执行下拉加载事件 @scrolltolower
        refresher-triggered  是否正在加载 就是下拉刷新 有个转圈的 如果是 true 就会有个转圈动画 
        @scrolltolower 触底事件 上滑事件 加载新数据
        @refresherrefresh 下拉刷新 触发刷新事件
        refresher-enabled 是否开启下拉加载 不开启不会执行对应的下拉事件之类的
       -->
      <scroll-view :lower-threshold='150'  scroll-y=true  scroll-with-animation=true :refresher-threshold='150' :refresher-triggered="isup"
       @scrolltolower="jiazai"  @refresherrefresh="shuaxin" refresher-enabled=true>
	    <view class="srco">
	      <view class="srcoitem" v-for="(item,index) in listinfo" :key="index">
          <!-- {{item.name}} -->
	       <image mode="heightFix" :src="item.name"></image>
	      </view>
	      <uni-load-more :status="status" />
	    </view>
      </scroll-view>
    </view>
    <!-- 自己写tabbar 先不管 -->
    <mytabbar bcolor="#1cd66c" :selindex=0 :uniqueindex=1 :tabbarlist="$tabbarlist"></mytabbar>
    </view>
	</template>
	
	<script>
    // 
    // 逻辑分析
    // 首先进入页面会触发 加载事件 
    // 加载事件会
    // 请求分页的第一页的数据作为初始数据
    // 然后下拉上滑会执行对应的事件达到加载的效果
    // 
	  export default {
      components: {
        
      },
	    data() {
	      return {
          // 是否刷新
          isup:false,
          // uniapp 自带的加载组件绑定
          // more 更多
          // loading 加载中
          // noMore 没有更多
	        status: "more",
	        // 当前页数
	        page: 0,
	        // 最大页数
	        total: 1,
	        // 每页数量
	        limit: 5,
	        // 数据集合
	        listinfo: [
	
	        ]
	      }
	    },
	    onLoad() {
        // 加载事件 就是加载更多数据中的 请求第一页数据
	      // 请求第一次数据
	      this.getlist(); 
	    },
	    methods: {
	      jiazai: function() {
	        // 加载下一页
	        this.getlist();
	      },
	      shuaxin:function(){
          // 刷新
          this.isup = true;
	        this.page = 0;
	         this.getlist();
	      },
	      getlist: function() {
	        // 是否已经达到最大页数 是否正在加载
	        if (this.status == "loading" || this.status == "noMore") {
	          return;
	        }
          // 页数加一 
	        this.page++;
          // 开启加载动画
	        this.status = "loading";
	        let that = this;
	        // 加请求
	        uni.request({
	          url: "http://test.xiaoxiboy.cn/",
	          method: "get",
	          data: {
	            page: that.page,
	            limit: that.limit
	          },
	          success(res) {
	            if(res.data.status===0){
                // 如果是第一页就是刷新之类的，就直接请求结果赋值 否则执行拼接
	              that.listinfo = that.page<=1?res.data.data:that.listinfo.concat(res.data.data)
                // 更新最大页数
	              that.total = res.data.total;
                // 更新当前请求页数 与后台保持一致 （如果后台给出了这个数据）
	              that.page = res.data.page;
                // 更新当前请求的每页数量 与后台保持一致 （如果后台给出了这个数据）
	              that.limit = res.data.limit;
	            }else{
                // 如果请求失败（后台认定的失败) 页数减去1
	              that.page--;
                // 弹出消息
	              uni.showToast({
	                icon:"none",
                  // res.data.message根据后台判断
	                title:res.data.message
	              })
	            }
	          },
	          // 请求失败或者成功都进行判断 停止加载动画
	          complete() {
              // 如果在刷新 就停止刷新动画
              if(that.isup){
              	that.isup = false;
              }
              // 判断当前页是否 大于 总数量  是的话 就每有更多数据
	            if (that.page >= that.total) {
	              that.status = "noMore";
	            }
              // 判断当前页是否 小于于 总数量  是的话 就有多数据
	            else {
	              that.status = "more"
	            }
	          },
	          // 请求失败弹出消息框 (这个失败是指网络错误等)
	          fail() {
              // 页数减去1
	            that.page--;
              // 弹出消息框
	            uni.showToast({
	              icon: "none",
	              title: "获取失败"
	            })
	          }
	        })
	      }
	    }
	  }
	</script>
	
	<style>
    /* 给scroll-view一个高度 是父元素的高度 */
scroll-view {
	    height:100%;
	  }
    /*  */
	  .srco {
	    height:100%;
      color: pink;
	  }
	  .srcoitem{
	    /* 高度为20% 意味着可以放5个元素 正好对应 limit */
	    height:20%;
	    font-size:12px;
	    color: #fff;
	    box-sizing: border-box;
	    margin:10rpx;
	    display: flex;
	    border-radius: 30rpx;
	    justify-content: center;
	    align-items: center;
	    word-break:break-all;
	    background-color: #467b96;
	    text-align: center;
	  }
    .srcoitem>image{
      height: 100%;
    }
    /* 配合mytabbar使用的 先不管 */
    .app{
      position: fixed;
      top: 0;
      width: 100vw;
      box-sizing: border-box;
      height:calc(100vh - 60px);
    }
	</style>
	