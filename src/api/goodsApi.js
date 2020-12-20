let request = require("../utils/request");

// 查询分页商品
function getgoods(page, pagesize) {
  return request.get("/good/goodlist", {
    params: {
      page,
      pagesize,
    },
  });
}

// 查询某个商品
function details(id) {
  return request.get("/good/goodsid/" + id, {
    params: {
      id,
    },
  });
}

// 查询用户购物车数据
function getCart(user) {
  return request.get("/cart/usersid", {
    params: {
      user,
    },
  });
}

//新增购物车商品
function addcart(user, goods_id, goods_num) {
  return request.post("/cart/addcartgood", {
    user,
    goods_id,
    goods_num,
  });
}

// 删除单个商品
function delgood(id) {
  return request.delete("/cart/delcartgood" + id);
}

// 删除多个商品
function delgoods(id) {
  return request.delete("/cart/delcartgoods", {
    id,
  });
}

module.exports = {
  getgoods,
  details,
  getCart,
  addcart,
  delgood,
  delgoods,
};
