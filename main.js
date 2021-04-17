import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
let tabbarlist=[
          {
            isdot:false,
            isnum:1,
						text: "首页",
						dotcolor: "red",
            dottcolor:"#fff",
            color:'#fff',
            icon:"/static/logo.png",
            selicon:"/static/sellogo.png",
            path:"/pages/index/index"
					},{
            isdot:true,
            isnum:0,
						text: "购物车",
						dotcolor: "#2B2B2B",
            color:'#fff',
            icon:"/static/logo.png",
            selicon:"/static/sellogo.png",
            path:"/pages/cart/cart"
					},
          {
              isdot:true,
              isnum:0,
          		text: "分类",
          		dotcolor: "#2B2B2B",
              color:'#fff',
              icon:"/static/logo.png",
              selicon:"/static/sellogo.png",
              path:"/pages/classify/classify"
          	},
            {
                isdot:true,
                isnum:0,
            		text: "我的",
            		dotcolor: "#2B2B2B",
                color:'#fff',
                icon:"/static/logo.png",
                selicon:"/static/sellogo.png",
                path:"/pages/mycenter/mycenter"
            	}
          ]
		
Vue.prototype.$tabbarlist = tabbarlist;
import mytabbar from './component/mytabbar/mytabbar.vue'
Vue.component('mytabbar',mytabbar)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
