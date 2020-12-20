<template>
  <div>
    <!-- 头部 -->
    <appHeader></appHeader>
    <div class="cartMain">
      <!-- 没有商品时的页面 -->
      <div class="no_Cart" v-show="isshowCart">
        <div class="login_status">
          <span>您还没有登录，登录后购物车的商品将保存到您的账号中!</span>
          <button @click="gotologin" style="cursor: pointer">立即登录</button>
        </div>
        <div class="yourcart">
          <h1>您的购物车<span>(<b>0</b>)</span></h1>
        </div>
        <div class="nocon">
          <img src="../../assets/img/home/no_content.png" alt="" />
          <p>
            您还没有选购商品,<a @click="gotohome" style="cursor: pointer"
              >去逛逛！</a
            >
          </p>
        </div>
      </div>
      <!-- 商品部分头部 -->
      <div class="your_Cart">
        <div class="yourcart">
          <span class="continuebuy" @click="goback"
            ><i class="el-icon-caret-left"></i> 继续购物</span
          >
          <h1>您的购物车<span>(<b>0</b>)</span></h1>
        </div>
        <!-- 购物车添加头部部分 -->
        <div class="group_list_nav">
          <div class="wrap">
            <label for="" class="child">派对必备 欢喜加倍</label>
            <span class="child">加购超值组合专享礼</span>
            <a href="javascript:void(0)" class="child">点击选购</a>
          </div>
        </div>
        <!-- 购物车添加部分 -->
        <div class="goods_list">
          <div class="group_item">
            <div class="promotion_inner">
              <span class="flag">立减</span>
              <strong>
                <span
                  >即日起，单笔订单正价购买此蛋糕2-4人食，享100元立减优惠；购5-8人食，享160元立减优惠；购10-12人食，享240元立减优惠。不与其他优惠同享（如优惠券、蛋糕券、兑换券、储值卡、银行优惠等）。</span
                >
                <b class="orange">（已减￥100）</b>
              </strong>
            </div>
            <div class="goods_item">
              <div class="item_message">
                <el-checkbox
                  v-model="checked"
                  class="check_status"
                ></el-checkbox>
                <div class="img_wrap">
                  <a href="">
                    <img
                      src="../../../src/assets/img/home2/ia_200000089.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div class="p_info">
                  <div class="p_detail">
                    <h2 class="no_wrap">
                      <a href="">雪域燕麦芝士·轻享</a>
                    </h2>
                    <h4>2-4人食</h4>
                    <div class="promotion_list">
                      <a class="toggle_btn"
                        >限时立减 低至￥198起 <i class="el-icon-arrow-down"></i
                      ></a>
                      <div class="inner">
                        <i class="arrow"></i>
                        <ul>
                          <li>
                            <el-checkbox
                              v-model="checked"
                              class="xz"
                            ></el-checkbox
                            >限时立减 低至￥198起
                          </li>
                          <li>
                            <el-checkbox
                              v-model="checked"
                              class="xz"
                            ></el-checkbox
                            >不使用促销
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="bottom_wrap">
                      <div class="price_wrap">
                        <p class="new_price"><small>￥</small>298</p>
                      </div>
                      <div class="birthday_card">
                        <span class="card_text"
                          ><i class="zhufu">填写生日祝福</i>
                          <i class="el-icon-caret-bottom"></i
                        ></span>
                        <div class="birthday_list">
                          <span class="birthday_item">不需要</span>
                          <span class="birthday_item">生日快乐</span>
                          <span class="birthday_item">Happy Birthday</span>
                          <span class="birthday_item">其他</span>
                        </div>
                      </div>
                      <div class="cut">
                        <el-checkbox v-model="checked">切分9份</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="p_edit">
                    <p class="p_price">小计：￥198</p>
                    <div class="input_wrap">
                      <el-input-number
                        v-model="num"
                        @change="handleChange"
                        :min="1"
                        :max="10"
                        label="描述文字"
                      ></el-input-number>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门推荐 -->
      <div class="cartList">
        <div class="cartListinner">
          <h1>推荐商品</h1>
          <h6>Sincerely Recommend</h6>
          <!-- 商品列表部分 -->
          <ul class="goodslist">
            <li v-for="(item, index) in listdata" :key="index">
              <img :src="item.small_img" alt="" />
              <div class="title">
                <a href="">{{ item.name }}</a>
              </div>
              <div class="tag">
                <span>{{ item.discount }}</span>
              </div>
              <div class="price"><span>￥</span>{{ item.price }}</div>
              <p class="addcart"><a href="">加入购物车></a></p>
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
        </div>
      </div>
    </div>
    <appFooter></appFooter>
    <p class="jiesuanbg"></p>
    <div class="amount">
      <div class="wrap">
        <div class="mini_width">
          <a href="" class="check_status"
            style="color:#3e3e3e"><el-checkbox v-model="checked" style="margin-right:10px"></el-checkbox>全选</a
          >
          <a href="" class="delete_btn" style="color:#3e3e3e">删除</a>
          <p class="total_count">共<b>12</b>件商品，已选择<b>12</b>件</p>
          <div class="total_amount_wrap">
            <div class="inner">
              <p>
                <span>应付(不含运费)：</span>
                ￥
                <strong class="orange">7524</strong>
              </p>
              <p>
                <span>已省：-￥3800</span>
              </p>
            </div>
          </div>
          <button class="order_btn">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "../../components/nav";
import appFooter from "../../components/footer";
import goodsApi from "../../api/goodsApi";
import { getUser } from '../../utils/auth';
export default {
  data() {
    return {
      listdata: "",
      isshowCart: false,
      checked: true,
      num: 1,
    };
  },

  components: {
    appHeader,
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
    gotohome() {
      this.$router.push("/home");
    },
    gotologin() {
      this.$router.push("/login");
    },
    goback() {
      // 从哪来到哪去
      this.$router.push("/home");
    },
    handleChange(value) {
      console.log(value);
    },
  },
  created() {
    // 发送请求渲染购物车
    let user = getUser(user);
    console.log(user);
    goodsApi.getCart(user).then(res=>{
      console.log(res);
    })
    this.fetch();
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/base.css";
@import "../../assets/sass/cart.scss";
</style>