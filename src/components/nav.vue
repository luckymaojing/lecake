<template>
  <div class="header">
    <div class="header_con">
      <div class="container">
        <a class="logo"></a>
        <ul class="header_nav">
          <li v-for="(item, index) in headerNav" :key="index">
            <a :class="{ active: index == num }" @click="wrodColor(index)">{{
              item
            }}</a>
          </li>
          <el-dropdown placement="top" style="font-size: 16px">
            <span class="el-dropdown-link"> 合作专区 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>银行活动</el-dropdown-item>
              <el-dropdown-item>企业采购</el-dropdown-item>
              <el-dropdown-item>大客户区</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </ul>
        <div class="header_right">
          <div class="yourAddress">
            <i class="el-icon-location-outline size"></i>
            <span class="address size"><a href="">广州</a></span>
            <span class="searchAddress"><a href="">查询地址</a></span>
          </div>
          <a
            ><i
              ref="searchWidth"
              class="icon_search size"
              @click="showSearch"
            ></i
          ></a>
          <transition name="mybox">
            <div class="searchbox" v-show="isshowSearch">
              <i
                class="el-icon-close close"
                style="font-size: 30px"
                @click="closeSearch"
              ></i>
              <input type="text" class="search" />
            </div>
          </transition>

          <a href="" @mouseenter="change1" @mouseleave="change1">
            <i class="size icon_user"></i>
          </a>
          <ul
            class="loginAndreg"
            v-show="islogin"
            @mouseenter="isCheck"
            @mouseleave="isCheck2"
          >
            <i
              class="el-icon-caret-bottom xiaosanjiao1"
              v-show="isdisplay1"
            ></i>
            <li class="login" @click="login">登录</li>
            <li class="reg" @click="reg">注册</li>
          </ul>
          <a @mouseenter="change2" @mouseleave="change2">
            <i class="icon_car size" @click="tocar"></i>
          </a>
          <div
            class="yourcar"
            v-show="isshowcar"
            @mouseenter="showcar"
            @mouseleave="showcar2"
          >
            <i
              class="el-icon-caret-bottom xiaosanjiao2"
              v-show="isdisplay2"
            ></i>
            <span>购物车还没有商品,赶紧选购吧</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerNav: ["首页", "蛋糕", "OK零食", "立即兑换"],
      active: "active",
      num: 0,
      isdisplay1: false,
      isdisplay2: false,
      islogin: false,
      isshowcar: false,
      isshowSearch: false,
    };
  },

  components: {},

  methods: {
    //  改变导航栏文字颜色
    wrodColor(index) {
      this.num = index;
    },
    // 小三角的展示和隐藏
    change1() {
      this.isdisplay1 = !this.isdisplay1;
      this.islogin = !this.islogin;
    },
    change2() {
      this.isdisplay2 = !this.isdisplay2;
      this.isshowcar = !this.isshowcar;
    },
    // 移入登录和注册元素
    isCheck() {
      this.islogin = true;
      this.isdisplay1 = true;
    },
    isCheck2() {
      this.islogin = false;
      this.isdisplay1 = false;
    },
    showcar() {
      this.isdisplay2 = true;
      this.isshowcar = true;
    },
    showcar2() {
      this.isdisplay2 = false;
      this.isshowcar = false;
    },
    // 关闭搜索框
    closeSearch() {
      this.isshowSearch = false;
    },
    // 点击显示搜索框
    showSearch() {
      this.isshowSearch = !this.isshowSearch;
    },
    // 登录
    login() {
      this.$router.push("/login");
    },
    // 注册
    reg() {
      this.$router.push("/reg");
    },
    //去购物车
    tocar() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped>
@import "../assets/sass/nav.scss";
</style>