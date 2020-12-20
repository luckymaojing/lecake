<template>
  <div>
    <appHeader></appHeader>
    <div class="Regmain">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
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
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="el-icon-mypsw"
            placeholder="6-20位密码"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="确认密码"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <JcRange :successFun="changestatus"></JcRange>
        <el-form-item prop="phoneyzm">
          <el-input
            type="text"
            v-model="ruleForm.phoneyzm"
            autocomplete="off"
            placeholder="手机验证码"
            prefix-icon="el-icon-myyzm"
            maxlength="6"
          >
          </el-input>
          <el-button
            type="button"
            @click="sendphonecode('ruleForm')"
            class="postyzm"
            >发送验证码</el-button
          >
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="reg"
          >立即注册</el-button
        >
      </el-form>
      <p class="agreement">
        <input type="checkbox" v-model="ischecked" /><label for=""
          >我已阅读并同意</label
        >
        <a href="">《诺心lecake用户服务协议》</a>
      </p>
    </div>
    <appFooter></appFooter>
  </div>
</template>

<script>
import appHeader from "../../components/navreg";
import appFooter from "../../components/footer";
import JcRange from "../../components/slider";
import userApi from "../../api/userApi";
export default {
  data() {
    // 验证手机号
    var validatePhone = (rule, value, callback) => {
      // 正则
      var phone = /^1[3-9]\d{9}$/;
      // 判断是否输入值并且值是否符合规则
      if (value !== "" && phone.test(value)) {
        callback();
      }
      callback(new Error("*请检查你的手机号"));
    };
    //验证密码
    var validatePass = (rule, value, callback) => {
      // 正则
      var testpass = /^(\d|\w){6,20}$/;
      if (this.ruleForm.checkPass !== "" && testpass.test(this.ruleForm.pass)) {
        this.$refs.ruleForm.validateField("checkPass");
        callback();
      }

      if (value === "" && !testpass.test(this.ruleForm.pass)) {
        if (value === "") {
          callback(new Error("*请输入密码"));
        }
        if (!testpass.test(this.ruleForm.pass)) {
          this.ruleForm.pass = "";
          callback(new Error("*请输入格式正确的密码"));
        }
      } else {
        if (
          this.ruleForm.checkPass !== "" &&
          testpass.test(this.ruleForm.pass)
        ) {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 再次验证密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("*请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("*两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateyzm2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("*请输入验证码"));
      } else {
        if (this.ruleForm.checkyzm2 !== "") {
          this.$refs.ruleForm.validateField("checkyzm2");
        }
        callback();
      }
    };
    return {
      ischecked: false,
      ruleForm: {
        checkPhone: "",
        pass: "",
        checkPass: "",
        phoneyzm: "",
        state: false,
      },
      rules: {
        checkPhone: [
          {
            validator: validatePhone,
            trigger: "blur",
            parttern: /1[3-9]\d{9}/,
          },
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "*密码长度只能在6-20个字符之间",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phoneyzm: [{ validator: validateyzm2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 点击发送手机验证码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 判断表单有值且协议框勾选
        if (valid && this.ischecked && !this.rangeStatus) {
          // 符合就发送请求验证是否存在，存在清空输入框
          userApi.checkName(this.ruleForm.checkPhone).then((res) => {
            if (!res.data.flag) {
              this.$message.error("您已注册了哟！");
              this.ruleForm.checkPhone = "";
            }
            const pass = this.$md5(this.ruleForm.pass);
            userApi.regin(this.ruleForm.checkPhone, pass).then(() => {
              this.$message({
                message: "注册成功",
                type: "success",
              });
            });
          });
        } else if (!valid) {
          //如果表单无值
          this.$message.error("注册失败，您已注册或手机号或密码填写错误！");
          return false;
        } else if (!this.ischecked) {
          //如果协议未被勾选
          this.$message.error("请勾选协议！");
          return false;
        }
      });
    },
    changestatus() {
      this.state = true;
    },
  },
  components: {
    appHeader,
    appFooter,
    JcRange,
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/reg.scss";
</style>