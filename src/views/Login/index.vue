<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <a class="logo"></a>
      </div>
    </div>
    <div class="white"></div>
    <div class="main">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        name:form
      >
        <!-- 标题 -->
        <div class="title">
          <a
            class="phoneyzm"
            @click="gotophoneyz"
            :style="{ color: wordcolor1 }"
            >手机验证登录</a
          >
          <span class="shuxian">|</span>
          <a
            class="accountAndpsw"
            @click="gotoAct"
            :style="{ color: wordcolor2 }"
            >账户密码登录</a
          >
        </div>
        <!-- 手机验证码登录 -->
        <div class="login_con1" v-if="showphoneCon">
          <!-- 手机验证码登录 -->
          <!-- 手机号输入 -->
          <el-form-item prop="checkPhone">
            <el-input
              type="text"
              v-model="ruleForm.checkPhone"
              autocomplete="off"
              placeholder="手机号码"
              prefix-icon="el-icon-myphone"
              hide-required-asterisk="true"
              maxlength="11"
            >
            </el-input>
          </el-form-item>
          <!-- 图形验证码 -->
          <el-form-item prop="checkyzm">
            <el-input
              type="text"
              v-model="ruleForm.checkyzm"
              autocomplete="off"
              placeholder="请输入验证码"
              prefix-icon="el-icon-myyzm"
              maxlength="6"
            ></el-input>
            <div ref="vcode" class="vcode" @click="getVcode"></div>
          </el-form-item>
          <!-- 短信验证码 -->
          <el-form-item prop="msgyzm">
            <el-input
              type="text"
              v-model="ruleForm.msgyzm"
              autocomplete="off"
              placeholder="短信验证码"
              prefix-icon="el-icon-myyzm"
              maxlength="6"
            >
            </el-input>
            <el-button
              type="button"
              @click="getmsgyzm"
              class="postyzm"
              :disabled="disable"
              :class="{ btncolor: isbgcolor }"
              ><span v-show="time">发送验证码</span
              ><span v-show="!time"
                ><b> {{ this.second }} </b> 秒后重试</span
              ></el-button
            >
          </el-form-item>
          <!-- 登录 -->
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="login"
            >立即登录</el-button
          >
        </div>
        <!-- 账户密码登录  密码只能是6-30位英文、数字及“_”、“-”组成-->
        <div class="login_con2" v-else>
          <!-- 手机号输入 -->
          <el-form-item prop="checkPhone">
            <el-input
              type="text"
              v-model="ruleForm.checkPhone"
              autocomplete="off"
              placeholder="手机号码"
              prefix-icon="el-icon-myphone"
              hide-required-asterisk="true"
              maxlength="11"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              prefix-icon="el-icon-mypsw"
              placeholder="请输入密码"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <!-- 登录 -->
          <el-button
            type="primary"
            @click="submitForm2('ruleForm')"
            class="login2"
            >立即登录</el-button
          >
        </div>
        <div class="forpsw">
          <a href="" class="forgetpsw">忘记密码</a>
          <a class="noaccout"
            >还没有账号？<span @click="goto">立即注册</span></a
          >
        </div>
        <hr />
        <!-- 微信和QQ -->
        <div class="loginmethod">
          <a
            href="https://open.weixin.qq.com/connect/qrconnect?appid=wx379340473ba5e673&redirect_uri=https%3A%2F%2Fwww.lecake.com%2Fcustomer%2Fwx-callback.html&response_type=code&scope=snsapi_login&state=state#wechat_redirect"
            class="weixin"
          ></a>
          <a
            href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101417732&redirect_uri=http://wx01.lecake.com/customer/qq-callback.html&state=2d9319fa0ad8ee0d0d112d180409ec33&scope=get_user_info"
            class="qq"
          ></a>
        </div>
      </el-form>
    </div>
    <appFooter></appFooter>
  </div>
</template>

<script>
import appFooter from "../../components/footer";
import userApi from "../../api/userApi";
import { getCookie, setCookie } from "../../utils/cookie";
import { setToken, setUser } from "../../utils/auth";
export default {
  data() {
    // 验证手机号
    var validatePhone = (rule, value, callback) => {
      // 正则
      var phone = /^1[3-9]\d{9}$/;
      // 判断是否输入值并且值是否符合规则
      if (value !== "" && phone.test(value)) {
        callback();
      } else if (value == "") {
        callback(new Error("手机号不能为空！"));
      } else if (!phone.test(value)) {
        callback(new Error("手机号码格式不正确！"));
      }
    };
    // 验证验证码
    var validateyzm = (rule, value, callback) => {
      userApi.jyvcode(this.ruleForm.checkyzm).then((res) => {
        // 判断验证码是否正确
        if (value !== "" && res.data.flag) {
          callback();
        } else if (value === "") {
          callback(new Error("验证码不能为空"));
        } else if (!res.data.flag) {
          this.open2();
          // 清空验证码
          this.ruleForm.checkyzm = "";
          // 发送请求重新渲染验证码
          userApi.getvcode().then((res) => {
            this.$refs.vcode.innerHTML = res.data.data;
          });
        }
      });
    };
    // 验证短信验证码
    var validatephoneyzm = (rule, value, callback) => {
      if (this.ruleForm.msgyzm !== "") {
        callback();
      } else if (value === "") {
        callback(new Error("请输入短信验证码"));
      }
    };

    //验证密码
    var validatePass = (rule, value, callback) => {
      // 正则
      var testpass = /^(\d|\w){6,20}$/;
      if (
        this.ruleForm.checkPass !== "" &&
        testpass.test(this.ruleForm.checkPass)
      ) {
        callback();
      }

      if (value === "" && !testpass.test(this.ruleForm.checkPass)) {
        if (value === "") {
          callback(new Error("*请输入密码"));
        }
        if (!testpass.test(this.ruleForm.checkPass)) {
          this.ruleForm.checkPass = "";
          callback(new Error("*请输入格式正确的密码"));
        }
      } else {
        if (
          this.ruleForm.checkPass !== "" &&
          testpass.test(this.ruleForm.checkPass)
        )
          callback();
      }
    };
    return {
      time: true,
      second: 120,
      disable: false,
      isbgcolor: false,
      showMask: false,
      showphoneCon: true,
      wordcolor1: "#fe4320",
      wordcolor2: "#3e3e3e",
      ruleForm: {
        checkPhone: "",
        checkyzm: "",
        msgyzm: "",
        checkPass: "",
      },
      rules: {
        checkPhone: [{ validator: validatePhone, trigger: "blur" }],
        checkyzm: [{ validator: validateyzm, trigger: "submit" }],
        msgyzm: [{ validator: validatephoneyzm, trigger: "submit" }],
        checkPass: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "*密码长度只能在6-20个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取图形验证码
    getVcode() {
      // 渲染验证码
      userApi.getvcode().then((res) => {
        this.$refs.vcode.innerHTML = res.data.data;
      });
    },
    // 发送短信验证码
    getmsgyzm() {
      // 判断图形验证码是否为空,为空就返回
      if (this.ruleForm.checkyzm == "") {
        return;
      }
      this.time = false;
      this.isbgcolor = true;

      // 发送请求获取短信验证码
      userApi.msgyzm().then((res) => {
        this.$message({
          message: "您的短信验证码是" + res.data + ",请在1分钟之内完成验证",
          center: true,
        });
        // 将短信验证码保存到cookie
        setCookie("messagecode", res.data, 2);
        // 短信验证码倒计时
        let timer = setInterval(() => {
          this.second--;
          this.disable = true;
          if (this.second == 0) {
            this.time = true;
            this.disable = false;
            this.isbgcolor = false;
            clearInterval(timer);
            setCookie("messagecode", res.data, -1);
            this.second = 120;
          }
        }, 1000);
      });
    },
    // 点击登录按钮
    submitForm(form) {
      // 判断是否已经登录
      if (getCookie("user")) {
        this.$message({
          message: "您已经登录过了哟！",
          type: "warning",
        });
        return;
      }
      this.$refs[form].validate((valid) => {
        let msgcode = getCookie("messagecode");
        if (this.ruleForm.msgyzm == msgcode && this.second > 0 && valid) {
          // 发送请求查询用户是否存在
          userApi.checkName(this.ruleForm.checkPhone).then((res) => {
            if (!res.data.flag) {
              // 允许登录
              // 将用户名保存到cookie默认七天免登录
              setUser(this.ruleForm.checkPhone, 7);
              // 跳转首页
              this.$router.push("/home");
            } else if (res.data.flag) {
              this.$message.error("亲，你还没注册哦！请先去注册");
            }
          });
        } else if (
          this.ruleForm.msgyzm != msgcode &&
          this.ruleForm.msgyzm != ""
        ) {
          this.open();
          // 清空验证码
          this.ruleForm.msgyzm = "";
        }
      });
    },
    // 验证码错误提示
    open2() {
      this.$alert("验证码错误,请重新输入", "提示信息", {
        confirmButtonText: "确定",
      });
    },
    // 手机验证码错误提示
    open() {
      this.$alert("手机验证码错误", "提示信息", {
        confirmButtonText: "确定",
      });
    },
    //跳转至注册页面
    goto() {
      console.log(1);
      this.$router.push("/reg");
    },
    // 点击去账户密码登录
    gotoAct() {
      this.showphoneCon = false;
      this.wordcolor1 = "#3e3e3e";
      this.wordcolor2 = "#fe4320";
    },
    // 点击去手机验证登录
    gotophoneyz() {
      this.showphoneCon = true;
      this.wordcolor2 = "#3e3e3e";
      this.wordcolor1 = "#fe4320";
      // 渲染验证码
      userApi.getvcode().then((res) => {
        this.$refs.vcode.innerHTML = res.data.data;
      });
    },

    // 账户密码登录按钮
    submitForm2(form) {
      // 判断是否已经登录
      if (getCookie("user")) {
        this.$message({
          message: "您已经登录过了哟！",
          type: "warning",
        });
        return;
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 发送请求查询用户是否存在
          userApi.checkName(this.ruleForm.checkPhone).then((res) => {
            if (res.data.flag) {
              this.$message.error("亲，你还没注册哦！请先去注册");
            }
            let pass = this.$md5(this.ruleForm.checkPass);
            // 允许登录
            userApi
              .login(this.ruleForm.checkPhone, pass)
              .then((res) => {
                // 判断登录是否成功
                if(!res.data.flag){
                  this.$message.error('用户名或密码错误！');
                  return;
                }
                // 将token放到本地
                setToken(res.data.token)
                // 将用户名保存到cookie默认七天免登录
                setUser(this.ruleForm.checkPhone, 7);
                // 跳转首页
                this.$router.push("/home");
              });
          });
        }
      });
    },
  },
  components: {
    appFooter,
  },
  created() {
    // 渲染验证码
    userApi.getvcode().then((res) => {
      this.$refs.vcode.innerHTML = res.data.data;
    });
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/css/base.css";
@import "../../assets/sass/login.scss";
</style>