import fetch from '@/config/fetch'

/*
 *登陆
 */
export const login = data => fetch('/index/v1/login', data, 'POST');

/*
 *注册
 */
export const register = data => fetch('/index/v1/user', data, 'POST');

/*
 *退出
 */
export const logout = () => fetch('/index/v1/logout', {}, 'POST');

/*
 *获取文章列表
 */
export const getArticleList = () => fetch('/index/v1/article');

/*
 *获取文章详情
 */
export const getArticleDetail = id => fetch('/index/v1/article/' + id);


/*
 *获取商品列表
 */
export const getGoodsList = data => fetch('/index/v1/goods', data, 'POST');

/*
 *获取商品详情
 */
export const getGoodsDetail = id => fetch('/index/v1/goods/' + id);

/*
 *添加购物车
 */
export const addCart = data => fetch('/index/v1/cart', data, 'POST');

/*
 *获取购物车列表
 */
export const cartList = () => fetch('/index/v1/cart');

/*
 *删除购物车
 */
export const deleteCart = id => fetch('/index/v1/cart/' + id, {}, 'DELETE');

/*
 *获取树状地理信息
 */
export const region = () => fetch('/index/region');

/*
 *添加收货地址
 */
export const addAddress = data => fetch('/index/v1/address', data, 'POST');

/*
 *获取收货地址列表
 */
export const getAddressList = () => fetch('/index/v1/address');

/*
 *添加订单
 */
export const addOrder = data => fetch('/index/v1/order', data, 'POST');

/*
 *获取支付二维码链接
 */
export const getPayCode = data => fetch('/index/v1/getPayCode', data, 'POST');

/*
 *获取订单支付状态
 */
export const updateOrder = id => fetch('/index/v1/order/' + id, {}, 'PUT');

/*
 *获取支付二维码链接
 */
export const getEmailCode = data => fetch('/index/v1/getEmailCode', data, 'POST');

/*
 *获取品牌列表
 */
export const getBrand = () => fetch('/index/v1/brand');

/*
 *获取分类列表
 */
export const getCategory = () => fetch('/index/v1/category');
/*
 *获取地址列表
 */
export const addressList = data => fetch('/index/address', data, 'GET')

/*
 *添加地址
 */
// export const addAddress = data => fetch('/index/v1/Address', data, 'POST')

/*
 *删除地址列表
 */
export const deleteAddress = id => fetch('/index/v1/address/' + id, {}, 'DELETE');

/*
 *修改地址列表
 */
export const editAddress = (id, data) => fetch('/index/v1/Address/' + id + '/edit', data, 'GET');

/*
 *单个地址
 */
export const getAddress = id => fetch('/index/v1/address/' + id, {}, 'GET');

/*
 *区域树
 */
export const regionList = data => fetch('/index/region', data, 'GET');

/*
 *获取所有订单
 */
export const orderList = () => fetch('/index/v1/order');

/*
 *待收货
 */
export const receiptList = data => fetch('/index/v1/receiptList', data, 'POST');

/*
 *待发货
 */
export const deliveryList = data => fetch('/index/v1/deliveryList', data, 'POST');

/*
 *待支付
 */
export const payList = data => fetch('/index/v1/payList', data, 'POST');

/*
 *已完成
 */
export const completeList = data => fetch('/index/v1/completeList', data, 'POST');

/*
 *申请退货中
 */
export const returnList = data => fetch('/index/v1/returnList', data, 'POST');