<template>
 <div class="header">
    <div class="container">
        <a class="logo"></a>
        <h2 class="title">用户注册</h2>
        <div class="header_right">已有诺心账号?<a @click="goto" style="cursor:pointer">请登录</a>
        </div>
    </div>
 </div>
</template>

<script>
export default {
 data () {
 return {
    }
 },

 components: {},

 methods: {
   // 跳转到登录页面
    goto(){
       this.$router.push("/login");
    }
 }
}
</script>

<style scoped lang="scss">
@import '../assets/css/base.css';
@import '../assets/sass/navreg.scss';
</style>