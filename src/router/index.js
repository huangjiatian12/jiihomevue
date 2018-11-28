import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/page/home')), 'Home');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const cart = r => require.ensure([], () => r(require('@/page/cart')), 'cart');
const pay = r => require.ensure([], () => r(require('@/page/pay')), 'pay');
const confirmOrder = r => require.ensure([], () => r(require('@/page/confirmOrder')), 'confirmOrder');
const goodsList = r => require.ensure([], () => r(require('@/page/shop/index')), 'goodsList');
const goodsDetail = r => require.ensure([], () => r(require('@/page/shop/detail')), 'goodsDetail');
const designList = r => require.ensure([], () => r(require('@/page/design/index')), 'designList');
const designDetail = r => require.ensure([], () => r(require('@/page/design/detail')), 'designDetail');
const customizeList = r => require.ensure([], () => r(require('@/page/customize/index')), 'customizeList');
const info = r => require.ensure([], () => r(require('@/page/info/info')), 'info');
const addresslist = r => require.ensure([], () => r(require('@/page/info/detail/addresslist')), 'addresslist');
const data = r => require.ensure([], () => r(require('@/page/info/detail/data')), 'data');
const list = r => require.ensure([], () => r(require('@/page/info/detail/list')), 'list');
const addAddress = r => require.ensure([], () => r(require('@/page/info/detail/addAddress')), 'addAddress');
const editAddress = r => require.ensure([], () => r(require('@/page/info/detail/editAddress')), 'editAddress');

const routes = [
	{
		path: '/',
		component: Home,
	},
    {
        path: '/login',
        component: login,
    },
    {
        path: '/register',
        component: register,
    },
    {
        path: '/goodsList',
        component: goodsList,
    },
    {
        path: '/goodsDetail',
        component: goodsDetail,
    },
    {
        path: '/designList',
        component: designList,
    },
    {
        path: '/designDetail',
        component: designDetail,
    },
    {
        path: '/cart',
        component: cart,
    },
    {
        path: '/confirmOrder',
        component: confirmOrder,
    },
    {
        path: '/pay',
        component: pay,
    },
    {
        path: '/customizeList',
        component: customizeList,
    },
    {
        path: '/info',
        component: info,
        children: [{
               path: '/data',
               component: data,
            },
            {
                path: '/addresslist',
                component: addresslist,
            },
            {
                path: '/addAddress',
                component: addAddress,
            },
            {
                path: '/editAddress',
                component: editAddress,
            },
            {
                path: '/list',
                component: list,
            },
        ]
    },
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})