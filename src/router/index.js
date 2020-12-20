import Vue from "vue";
import VueRouter from "vue-router";

//解决连续点击同个路由出bug
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  // 重定向到home
  {
    path : "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import('../views/Home'),
    meta : {
      title : '首页',
      nocheck : true,
    },
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import('../views/Reg'),
    meta : {
      title : '注册页',
      nocheck : true //不用路由守卫：谁都能看
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/Login'),
    meta : {
      title : '登录页',
      nocheck : true//不用路由守卫：谁都能看
    }
  },
  {
    path: "/cake",
    name: "cake",
    component: () => import('../views/Cakes'),
    meta : {
      title : '蛋糕页',
      nocheck : true,
    }
  },
  {
    path: "/snacks",
    name: "snacks",
    component: () => import('../views/Snacks'),
    meta : {
      title : '零食页',
      nocheck : true,
    }
  },
  {
    path: "/cooperation",
    name: "cooperation",
    component: () => import('../views/Cooperation'),
    meta : {
      title : '合作页',
      nocheck : true,
    }
  },
  {
    path: "/exchange",
    name: "exchange",
    component: () => import('../views/Exchange'),
    meta : {
      title : '兑换页',
      nocheck : true,
    }
  },
  {
    path: "/inquiryaddress",
    name: "inquiryaddress",
    component: () => import('../views/InquiryAddress'),
    meta : {
      title : '查询地址页',
      nocheck : true,
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import('../views/Cart'),
    meta : {
      title : '购物车页',
      nocheck : true,
    }
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import('../views/Detail'),
    meta : {
      title : '详情页',
      nocheck : true,
    }
  },
];




const router = new VueRouter({
  routes
});

//全局路由钩子
// router.beforeEach(function (to, from, next) {
//   console.log(to,'to');
//   console.log(from,'from');
//   window.console.log("进入全局 beforeEach钩子了");
//   next();
// })

export default router;
