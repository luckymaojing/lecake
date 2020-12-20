let request = require('../utils/request');

// 验证用户名
function checkName(username) {
    return request.get('/user/checkname',{
        params:{
            username
        }
    })
}

// 注册
function regin(username,password) {
    return request.post('/user/regin',{
        username,
        password
    })
}

// 登录
function login(username,password) {
    return request.get('/user/login',{
        params:{
            username,
            password
        }
    })
}

// 验证token
function checkToken(token) {
    return request.get('/user/verify',{
        params:{
            token,
        }
    })
}

// 修改密码
function editpsw(id,password) {
    return request.put('/user/edit/'+id,{
        password
    })
}

// 查询用户列表数据
function getlist(page,pagesize,search){
    return request.get('/user/list',{
        params:{
            page,
            pagesize,
            search
        }
    })
}

// 删除某个用户
function deluser(id){
    return request.delete('/user/del/'+id)
}

// 获取验证码
function getvcode(){
    return request.get('/user/vcode');
}

// 校验验证码
function jyvcode(vcode){
    // console.log("yzm=",vcode)
    return request.post('/user/jyvcode',{
        vcode,
    })
}

// 获取短信验证码
function msgyzm(){
    return request.get('/user/phoneyzm')
}

module.exports = {
    checkName,
    regin,
    login,
    checkToken,
    editpsw,
    getlist,
    deluser,
    getvcode,
    jyvcode,
    msgyzm
}