<template>
  <div class="block">
    <el-carousel trigger="click" height="554px" arrow="never" id="box">
      <a href="">
        <el-carousel-item v-for="(item, index) in bannermsg" :key="index">
          <img :src="item.img" alt="" style="width: 100%" />
          <transition name="myword">
            <div class="word" @change="show = !show">
              <div>
                <p
                  class="wordtitle"
                  :style="{ color: item.color }"
                  key="wordtitle"
                >
                  {{ item.title }}
                </p>
                <p
                  class="wordsmalltitle"
                  :style="{ color: item.color }"
                  key="wordsmalltitle"
                >
                  {{ item.smalltitle }}
                </p>
                <p
                  class="wordlittletitle"
                  :style="{ color: item.color }"
                  key="wordlittletitle"
                >
                  {{ item.littletitle }}
                </p>
              </div>
            </div>
          </transition>
        </el-carousel-item>
      </a>
    </el-carousel>
  </div>
</template>
<script>
import img1 from "../assets/img/home/ia_200000031.jpg";
import img2 from "../assets/img/home/ia_200000032.jpg";
import img3 from "../assets/img/home/ia_200000033.jpg";
import img4 from "../assets/img/home/ia_200000034.jpg";
import img5 from "../assets/img/home/ia_200000035.jpg";
export default {
  data() {
    return {
      show: false,
      bannermsg: [
        {
          title: "幸运蛋糕 点亮心中的希望",
          smalltitle: "圣诞蛋糕 限时立减60元",
          littletitle: "",
          img: img1,
          color: "black",
        },
        {
          title: "冬日赏[雪] 正当时",
          smalltitle: "人气雪域燕麦芝士 享限时立减",
          littletitle: "",
          img: img2,
          color: " #915c0f",
        },
        {
          title: "咔滋一口，随时元气充能！",
          smalltitle: "零食家族新品来袭 享限时折扣",
          littletitle: "",
          img: img3,
          color: " #915c0f",
        },
        {
          title: "甜蜜成双 「盒」你心意",
          smalltitle: "购指定蛋糕 赠随机款盒子蛋糕2个",
          littletitle: "",
          img: img4,
          color: "white",
        },
        {
          title: "Happy Birthday",
          smalltitle: "暖心冬日 甜蜜相伴",
          littletitle: "生日专[数] 惊喜加倍",
          img: img5,
          color: "#d20a0a",
        },
      ],
    };
  },

  components: {},
  methods: {},
  watch: {},
  created() {},
};
</script>
<style lang='scss' scoped>
.block {
  .el-carousel--horizontal {
    z-index: -1;
  }
  .el-carousel__indicators {
    position: absolute;
    left: 85%;
    bottom: 40px;
  }
}

.word {
  position: absolute;
  top: 280px;
  left: 280px;
}
.myword-enter-active {
  transition: all 0.3s ease;
}
.myword-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.myword-enter, .myword-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
a {
  text-decoration: none;
  color: black;
  cursor: pointer;
}
p {
  padding: 5px 0;
}
.wordtitle {
  font-size: 38px;
}
.wordsmalltitle {
  font-size: 24px;
}
.wordlittletitle {
  font-size: 16px;
}
</style>