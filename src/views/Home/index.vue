<template>
  <div>
    <!-- 头部 -->
    <appNav></appNav>
    <!-- 轮播图部分 -->
    <appBanner></appBanner>
    <main>
      <!-- 开通会员部分 -->
      <div class="MembershipClub">
        <div class="MembershipClub_inner">
          <div class="MembershipClub_inner_detail">
            <img src="../../assets/img/home/ia_200000036.png" alt="" />
            <p class="upgradeMenber">尊贵礼遇享不停，升级aha会员</p>
            <p class="saveMony">
              预计可省￥358+，<a href="" class="more">了解更多</a>
            </p>
            <a href="" class="OpenMembership"> 立即开通￥99/年 </a>
          </div>
          <div class="MembershipClub_inner_logo">
            <img src="../../assets/img/home/ia_200000037.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 广告banner部分 -->
      <div class="advertisement">
        <div class="bg">
          <el-carousel
            height="410px"
            direction="vertical"
            indicator-position="none"
          >
            <el-carousel-item v-for="(item, index) in bgbanner" :key="index">
              <transition name="el-fade-in">
                <div class="home_banner" v-show="showbanner">
                  <div class="home_banner_inner">
                    <p class="title">{{ item.title }}</p>
                    <div class="smalltitle">{{ item.smalltitle }}</div>
                    <a href="" class="readNow">{{ item.readNow }}</a>
                  </div>
                </div>
              </transition>
              <a href="" style="cursor: pointer" class="bannerImg"
                ><img :src="item.img" alt=""
              /></a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 商品列表部分 -->
      <ul class="goodslist clear_fix">
        <li v-for="(item, index) in listdata" :key="index" @click="gotoDetail(item._id)">
          <img :src="item.small_img" alt="" />
          <div class="tag">
            <span>{{ item.discount }}</span>
          </div>
          <div class="title">
            <a href="">{{ item.name }}</a>
          </div>
          <div class="smalltitle">{{ item.small_title }}</div>
          <div class="price"><span>￥</span>{{ item.price }}</div>
          <img
            src="../../assets/img/home/cornerMark.png"
            alt=""
            class="hot"
            v-if="item.hot"
          />
          <div class="corner_mark" v-if="item.hot">
            <span class="hotword">{{ item.hot }}</span>
          </div>
        </li>
      </ul>
      <!-- 评论部分 -->
      <div class="comment">
        <h2>-热门评论-</h2>
        <el-carousel trigger="click" height="240px">
          <el-carousel-item
            v-for="(item, index) in commentimg"
            :key="index"
            class="lunbo_inner"
          >
            <a class="comment_con" href="">
              <div class="comment_content">
                <p class="phone">
                  <span class="phonenum">156***0681</span
                  ><span class="time">2020-12-12</span>
                </p>
                <p class="comments">
                  口味真是没得说，很好吃，尤其上面的马卡龙味道口感都不错！
                </p>
              </div>
              <img
                :src="item.img1"
                alt=""
                style="width: 360px; height: 240px; float: left"
              />
            </a>
            <a class="comment_con" href="">
              <div class="comment_content">
                <p class="phone">
                  <span class="phonenum">156***0681</span
                  ><span class="time">2020-12-12</span>
                </p>
                <p class="comments">
                  口味真是没得说，很好吃，尤其上面的马卡龙味道口感都不错！
                </p>
              </div>
              <img
                :src="item.img2"
                alt=""
                style="width: 360px; height: 240px; float: left"
              />
            </a>
            <a class="comment_con" href="">
              <div class="comment_content">
                <p class="phone">
                  <span class="phonenum">156***0681</span
                  ><span class="time">2020-12-12</span>
                </p>
                <p class="comments">
                  口味真是没得说，很好吃，尤其上面的马卡龙味道口感都不错！
                </p>
              </div>
              <img
                :src="item.img3"
                alt=""
                style="width: 360px; height: 240px; float: left"
              />
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </main>
    <appFooter></appFooter>
    <router-view />
  </div>
</template>

<script>
import appNav from "../../components/nav";
import appFooter from "../../components/footer";
import appBanner from "../../components/banner";
import img1 from "../../assets/img/home/ia_200000038.jpg";
import img2 from "../../assets/img/home/ia_200000039.jpg";
import goodsApi from "../../api/goodsApi";
import commentimg1 from "../../assets/img/home/ia_200000095.jpg";
import commentimg2 from "../../assets/img/home/ia_200000099.jpg";
import commentimg3 from "../../assets/img/home/ia_200000100.jpg";
import { getUser } from "../../utils/auth";
export default {
  data() {
    return {
      bgbanner: [
        {
          title: "至臻醇享 经典之作",
          smalltitle: "国际金奖加冕 口碑 TOP",
          readNow: "立即查看",
          img: img1,
        },
        {
          title: "先领券 后下单",
          smalltitle: "有优惠 更美味",
          readNow: "立即查看",
          img: img2,
        },
      ],
      showbanner: true,
      listdata: [],
      commentimg: [
        {
          img1: commentimg1,
          img2: commentimg2,
          img3: commentimg3,
        },
        {
          img1: commentimg1,
          img2: commentimg2,
          img3: commentimg3,
        },
      ],
      isshowhot: false,
    };
  },

  components: {
    appNav,
    appBanner,
    appFooter,
  },

  methods: {
    fetch() {
      goodsApi.getgoods(1, 12).then((res) => {
        this.listdata = res.data.data;
        // 判断数据中是否有hot有就渲染没有就不渲染
        res.data.data.forEach((item) => {
          if (!item.hot) {
            this.isshowhot = false;
          }
          this.showhot = true;
        });
      });
    },
    gotoDetail(id) {
      // 判断用户是否登录
      let loginuser = getUser();
      if (loginuser) {
        // 将商品id携带过去
        this.$router.push({path:"/detail",query:{id:id}})
      } else {
        let msg = confirm("您还未登录,请登录");
        if (msg==true) {
          this.$router.push("/login");
        }else{
          return false;
        }
      }
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style scpoed lang='scss'>
@import "../../assets/sass/home.scss";
</style>