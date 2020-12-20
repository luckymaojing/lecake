<template>
  <div>
    <appNav class="detail_header"></appNav>
    <div class="detail_main" v-for="(item, index) in goodlist" :key="index">
      <!-- 大图 -->
      <div class="goods_img">
        <el-carousel trigger="click" height="520px">
          <el-carousel-item v-for="bg in 4" :key="bg">
            <img :src="item.big_img" alt="" />
          </el-carousel-item>
        </el-carousel>
        <!-- 新来用户订单 -->
        <div class="order_guide">
          <!-- 用户订单信息 -->
          <div class="text_tips">
            <!-- 用户头像 -->
            <!-- <img src="" alt=""> -->
            <p class="order_con">
              最新订单来自天津的aha会员，<span class="time">5</span> 秒前
            </p>
          </div>
        </div>
      </div>
      <!-- 商品详情上部分 -->
      <div class="goodsDetail">
        <div class="left_wrap">
          <div class="title_wrap">
            <div class="titleAndprice">
              <span class="title">{{ item.name }}</span>
              <span class="price"><b>￥</b>{{ item.price }}</span>
            </div>
            <div class="tast_title">{{ item.flavor }}</div>
            <a href="">
              <div class="aha_entrance">
                <img src="../../assets/img/home/aha_link.png" alt="" />
                <span class="desc_text">开通仅¥99 预计可省¥358</span>
                <span class="btn_text">立即开通</span>
              </div>
            </a>
          </div>
          <div class="promotion_wrap">
            <h4><i></i>优惠立减</h4>
            <div class="cuxiao">
              <p class="tag"><b>赠品</b>赠任意款盒子蛋糕2个</p>
              <p class="tag"><b>立减</b>限时立减 低至￥198起</p>
            </div>
          </div>
          <h6>查看促销详情</h6>
        </div>
        <div class="right_wrap">
          <div class="eat_num">
            <p class="spec_notice">建议食用人数</p>
            <div class="notice_tag">
              <a
                v-for="(eat, index) in item.eat_people"
                :key="index"
                :class="{ changeBorder: index == num }"
                @click="changeBorder(index)"
              >
                <strong>{{ eat.people_title }}</strong>
              </a>
            </div>
          </div>
          <div class="spec">
            <p>
              <i class="knif"></i>
              <span>含5套餐具</span>
            </p>
            <p>
              <i class="size"></i>
              <span>含5套餐具</span>
            </p>
            <p>
              <i class="weight"></i>
              <span>含5套餐具</span>
            </p>
            <p>
              <i class="sweet"></i>
              <span>含5套餐具</span>
            </p>
          </div>
          <div class="btn_wrap">
            <el-button plain class="addcart" @click="addcart"
              >加入购物车+</el-button
            >
            <el-button type="danger" class="buynow" @click="buyNow">立即购买</el-button>
          </div>
        </div>
      </div>
      <!-- 商品详情下部分 -->
      <div class="groupListWrap">
        <div class="goods_main">
          <div class="img_wrap">
            <img src="../../../src/assets/img/home2/ia_200000091.jpg" alt="" />
            <h6>环游世界</h6>
          </div>
        </div>
        <!-- 加号 -->
        <div class="grouop_add">
          <i class="el-icon-plus"></i>
        </div>
        <div class="group_list_package">
          <h2 class="division">派对必备 欢喜加倍</h2>
          <div class="list_wrap">
            <div class="list_inner">
              <ul class="swiper-wrapper">
                <li class="swiper-slide">
                  <div class="img_wrap">
                    <img
                      src="../../../src/assets/img/home2/ia_300000037.jpg"
                      alt=""
                    />
                  </div>
                  <h3>金喜满满生日礼包</h3>
                  <div class="prices">
                    <span class="nowprice">￥59</span>
                    <s class="oldprice">￥79</s>
                    <el-radio v-model="radio" label=""></el-radio>
                  </div>
                </li>
                <li class="swiper-slide">
                  <div class="img_wrap">
                    <img
                      src="../../../src/assets/img/home2/ia_300000038.jpg"
                      alt=""
                    />
                  </div>
                  <h3>金喜满满生日礼包</h3>
                  <div class="prices">
                    <span class="nowprice">￥59</span>
                    <span class="oldprice">￥79</span>
                    <el-radio v-model="radio2" label=""></el-radio>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 加号 -->
        <div class="grouop_add">
          <i class="el-icon-plus"></i>
        </div>
        <div class="group_list">
          <div class="division">超值组合专享礼</div>
          <!-- 商品走马灯 -->
          <div class="list_wrap">
            <el-carousel
              trigger="click"
              height="157px"
              class="list_inner"
              indicator-position="none"
              :autoplay="false"
              ref="left_arrow"
            >
              <el-carousel-item v-for="(item, index) in countimg" :key="index">
                <ul class="swiper-wrapper">
                  <li
                    class="swiper-slide"
                    v-for="(item, index) in item"
                    :key="index"
                  >
                    <div class="img_wrap"><img :src="item" alt="" /></div>
                    <h3>金喜满满生日礼包</h3>
                    <div class="prices">
                      <span class="nowprice">￥59</span>
                      <span class="oldprice">￥79</span>
                      <el-radio v-model="radio" label=""></el-radio>
                    </div>
                  </li>
                </ul>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <!-- 等于 -->
        <div class="grouop_add">
          <i>=</i>
        </div>
        <!-- 结果 -->
        <div class="result_wrap">
          <h4>已添加<b>0</b>项加购商品</h4>
          <a href=""><el-button type="danger">立即购买</el-button></a>
          <a href="" class="bemenber">升级aha会员<br />尊享礼遇</a>
        </div>
      </div>
      <!-- 商品详情图 -->
      <!-- <img src="" alt=""> -->
      <!-- 原材料 -->
      <div class="material_desc">
        <h2 class="no_wrap">主要原材料</h2>
        <h4>Main raw materials</h4>
        <div class="sp_1">&nbsp;</div>
        <div class="inner">
          <h5>
            <span class="food_con"> 食材配比 </span>
            <span class="originAdress"> 产地 </span>
          </h5>
          <p>
            <span class="foood">原味燕麦露</span>
            <span class="foood">原味燕麦露</span>
          </p>
          <p>
            <span class="foood">原味燕麦露</span>
            <span class="foood">原味燕麦露</span>
          </p>
          <p>
            <span class="foood">原味燕麦露</span>
            <span class="foood">原味燕麦露</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appNav from "../../components/nav";
import listimg1 from "../../assets/img/home2/ia_300000039.jpg";
import listimg2 from "../../assets/img/home2/ia_300000040.jpg";
import listimg3 from "../../assets/img/home2/ia_300000042.jpg";
import listimg4 from "../../assets/img/home2/ia_300000043.jpg";
import listimg5 from "../../assets/img/home2/ia_300000044.jpg";
import listimg6 from "../../assets/img/home2/ia_300000045.jpg";
import listimg7 from "../../assets/img/home2/ia_300000047.jpg";
import listimg8 from "../../assets/img/home2/ia_300000048.jpg";
import listimg9 from "../../assets/img/home2/ia_300000050.jpg";
import listimg10 from "../../assets/img/home2/ia_300000049.jpg";
import goodsApi from "../../api/goodsApi";
import { getUser } from "../../utils/auth";
export default {
  data() {
    return {
      radio: "1",
      radio2: "1",
      countimg: [
        { img1: listimg1, img2: listimg2, img3: listimg3 },
        { img1: listimg4, img2: listimg5, img3: listimg6 },
        { img1: listimg7, img2: listimg8, img3: listimg9 },
        { img1: listimg10 },
      ],
      goodlist: "",
      num: 0,
    };
  },

  components: {
    appNav,
  },

  methods: {
    changeBorder(index) {
      this.num = index;
    },
    addcart() {
      let user = getUser(user);
      let goods_id = this.$route.query.id;
      // console.log(user,goods_id);
      goodsApi.addcart(user, goods_id, 1).then((res) => {
        if (res.data.flag) {
          this.$message({
            message: "商品添加成功",
            type: "success",
          });
        }
      });
    },
    buyNow(){
      this.$router.push('/cart');
    }
  },
  created() {
    // 一进入页面渲染详情页
    goodsApi.details(this.$route.query.id).then((res) => {
      this.goodlist = res.data.data;
    });
  },
};
</script>

<style scoped lang="scss">
@import "../../../src/assets/css/base.css";
@import "../../../src/assets/sass/detail.scss";
</style>