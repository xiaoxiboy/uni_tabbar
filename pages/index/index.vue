
	<template>
    <view>
    <view class="app">
      <scroll-view :lower-threshold='150'  scroll-y=true  scroll-with-animation=true :refresher-threshold='150' :refresher-triggered="isup"
       @scrolltolower="jiazai"  @refresherrefresh="shuaxin" refresher-enabled=true>
	    <view class="srco">
	      <view class="srcoitem" v-for="(item,index) in listinfo" :key="index">
	        {{item.name}}
	      </view>
	      <uni-load-more :status="status" />
	    </view>
      </scroll-view>
    </view>
    <mytabbar bcolor="#1cd66c" :selindex=0 :uniqueindex=1 :tabbarlist="$tabbarlist"></mytabbar>
    </view>
	</template>
	
	<script>
	  export default {
      components: {
        
      },
	    data() {
	      return {
          isup:false,
	        status: "more",
	        // more
	        // loading
	        // noMore
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
	      // 请求第一次数据
        this.isup = true;
	      this.getlist(); 
	    },
	    methods: {
	      jiazai: function() {
	        // 加载下一页
	        this.getlist();
	      },
	      shuaxin:function(){
          this.isup = true;
	        this.page = 0;
	         this.getlist();
	      },
	      getlist: function() {
	        // 是否已经达到最大页数 是否正在加载
	        if (this.status == "loading" || this.status == "noMore") {
	          return;
	        }
	        this.page++;
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
                if(that.page == 1){
                  this.listinfo = [];
                }
	              that.listinfo = that.listinfo.length<=0?res.data.data:that.listinfo.concat(res.data.data)
	              that.total = res.data.total;
	              that.page = res.data.page;
	              that.limit = res.data.limit;
	            }else{
	              that.page--;
	              uni.showToast({
	                icon:"none",
	                title:res.data.message
	              })
	            }
	          },
	          // 请求失败或者成功都进行判断 停止加载动画
	          complete() {
              if(that.isup){
              	that.isup = false;
              }
	            if (that.page >= that.total) {
	              that.status = "noMore";
	            }
	            if (that.page < that.total) {
	              that.status = "more"
	            }
	          },
	          // 请求失败弹出消息框
	          fail() {
	            that.page--;
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
scroll-view {
	    height:100%;
	  }
	
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
    .app{
      position: fixed;
      top: 0;
      width: 100vw;
      box-sizing: border-box;
      height:calc(100vh - 60px);
    }
	</style>
	