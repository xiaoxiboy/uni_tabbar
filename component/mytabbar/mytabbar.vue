<template>
  <!-- 绑定高度和背景颜色 -->
  <view id="tabbar"  :style="{height:height,background:bcolor}">
    <!-- 渲染图标 -->
    <view class="icon flex" >
      <!-- 判断凸项，独特样式类名 -->
      <view @click="gopath(index)" :class="[index == uniqueindex?'unique flex iconitem':'flex iconitem']"
         v-for="(item,index) in  tabbarlist" :key="index">
         <!-- tu凸起处颜色和背景颜色一致 -->
         <!-- 动态绑定凸起处的宽度和高度 -->
         <!-- 觉得凸出形状不合适可以更改下面的计算 
         tabbarlist.length * 2 或者 部分 tabbarlist.length * 2
         配合 .tu处的样式更改效果更佳
         -->
         <view :style="{background:bcolor,width:'calc(750rpx / ('+tabbarlist.length * 2+'))',
         height:'calc(750rpx / ('+tabbarlist.length * 2+'))'}"  v-if="index == uniqueindex" class="tu">
           
         </view>
         <view :style="{background:item.dotcolor,color:item.dottcolor}" v-if="item.isnum>0" class="isnum">
           {{item.isnum}}
         </view>
         <!-- 绑定点颜色 -->
         <view :style="{background:item.dotcolor}" v-if="item.isdot" class="isdot">
         </view>
         <image  mode="heightFix" :src="index!=selindex?item.icon:item.selicon"></image>
         </view>
    </view>
    <!-- 渲染文字 -->
    <view class="text flex">
      <view @click="gopath(index)" v-for="(item,index) in tabbarlist" :key="index">
        <!-- 绑定颜色 -->
         <view :style="{color:item.color}">{{item.text}}</view>
         </view>
    </view>
  </view>
</template>

<script>
  /* 本组件 快速入门
      实现简单的自定义tabbar
      首先在注册全局变量 在main.js里面设置 tabbarlist数据源
      数据源结构可以参照 
      http://cdnfile.xiaoxiboy.cn/otherfiles/692a55b976ae418c9ffbe05b2dee6ea.png
      再将本组件注册成全局组件 main.js
      import mytabbar from './component/mytabbar/mytabbar.vue'
      Vue.component('mytabbar',mytabbar)
      
  */ 
  export default {
    name:"mytabbar",
    props:{
      // 选中的索引
      selindex:{
        type:Number,
        default:1
      },
      // 背景颜色
      bcolor:{
        type:String,
        default:'#1cd66c'
      },
      // 高度
      height:{
        type:String,
        default:'50px'
      },
      //tabbar list集合
      tabbarlist:{
        type:Array,
        default:function() {
					return [
            {
              // 是否有点
                isdot:false,
                // 是否数字 数字和点建议二选一 也可以不要点不要数字
                isnum:1,
                // 下方文字
            		text: "首页",
                // 下方文字颜色
                color:'#fff',
                // 点和数字的背景颜色
            		dotcolor: "red",
                // 数字的文字颜色
                dottcolor:"#fff",
                // 图标
                icon:"/static/logo.png",
                // 选中图标
                selicon:"/static/sellogo.png",
                path:"#"
            	}
					]
				}
      },
      // 独特的tabbar索引
      uniqueindex:{
        type:Number,
        default:0
      }
    },
    data(){
      return {
      }
    },
    methods:{
      gopath(index){
        // 点击当前页的tabbar不进行跳转
        if(this.selindex == index){
          return;
        }
        uni.redirectTo({
          url:this.tabbarlist[index].path,
          fail(e) {
            console.log(e)
          }
        })
      }
    }
  }
</script>

<style>
  /* 固定在底部，默认高度为50px 可以通过参数更改，不建议更改 */
#tabbar{
  /* 字体大小 */
  font-size:24rpx;
  z-index: 9999999;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    /* 如果觉得tabbar的行高太窄 可以把8rpx变大*/
    padding:10rpx 0;
    width: 750rpx;
   /* pointer-events:none; */
  }
  .icon{
    /* 图片区域的高度 整个icon和text合起来为100% */
    height:65%;
    width: 100%;
    /* icon区域颜色 */
    /* background: #fff; */
  }
  /* 图片占据icon部分的高度 不建议更改 */
  .icon image{
    height:100%;
  }
  .text{
    text-align: center;
    /* 文字区域的高度 整个icon和text合起来为100% */
    height:35%;
    width:100%;
    /* text区域颜色 */
    /* background: #fff; */
  }
  .icon>view,.text>view{
    /* tabbar 最小数量为3 最大为5，可以更改，但是不建议*/
    min-width: calc(100% / 5);
    max-width: calc(100% / 3);
    width: 25%;
  }
  .flex{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .iconitem{
    position: relative;
  }
  .unique image{
    /* 凸起处图片上移高度 */
    margin-top: -5rpx;
  }
  /* 凸起特效    配合动态样式一起决定凸起形状            */
  .tu{
    /* 如果遮挡可以更改此处，不建议更改 */
    z-index: -10;
    position: absolute;
    /* top凸出部分的高度 和高度有关 高度见 动态绑定处 */
    top: -50%;
    border-radius: 50%;
  }
  /* 点的特效 */
  .isdot{
    position: absolute;
    height:0;
    width: 0;
    /* top和right调整红点位置 可以负数  */
    /*   top的负数不要超过 #tabbar 的padding*/
    top:-8rpx;
    right: 25%;
    /* 圆形 */
    border-radius: 50%;
    /* 红点宽高为数值乘以2 */
    padding: 10rpx;
    z-index: 100;
  }
  /* 数字图标特效 */
  .isnum{
    position: absolute;
    line-height: 20rpx;
    width:20rpx;
    text-align: center;
    /* top和right调整红点位置 可以负数  */
    /*   top的负数不要超过 #tabbar 的padding*/
    top:-8rpx;
    right: 25%;
    border-radius: 50%;
    padding:8rpx;
    z-index: 100;
    }
</style>
