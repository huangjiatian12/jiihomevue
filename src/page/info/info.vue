<template>
  <div>
    <header-view></header-view>
      <div class="content-pages detail-wrap">
        <div class="container">
          <aside role="complementary" class="product-board">
            <div class="head">
              <h1>个人中心</h1>
            </div>
            <div class="block-account">
              <div class="block-title">
                <span>个人中心</span>
              </div>
              <ul>
                <router-link 
                      v-for="(item,index) in products"
                      :key="index"
                      :to="{ path: item.path }" 
                      tag="li" 
                      active-class="active" >
                  {{ item.name }}
                </router-link>
              </ul>
            </div>
          </aside>
          <div role="main">
            <div>
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
          </div>
        </div>
        
      </div>
    <footer-view></footer-view>
  </div>
</template>

<script>

import headerView from '@/components/Header'
import footerView from '@/components/footer'

export default {
  data () {
    return {
      products: [
        {
          name: '信息',
          path: 'data',
          index: 1,
          active: false
        },
        {
          name: '地址',
          path: 'addresslist',
          index: 2,
          active: false
        },
        {
          name: '订单列表',
          path: 'list',
          index: 3,
          active: false
        }
      ],
    }
  },
  components: {
    headerView,
    footerView,
  }
}
</script>


<style lang="less" scoped>
.container {
  margin-left: 60px;
  margin-right: 60px;
}
.head {
  margin: 60px 0;
}
.head h1 {
  font-size: 30px;
  line-height: 40px;
  font-family: 'NexaBold'
}
.block-account {
  padding-left: 50px;
  padding: 20px 0;
  margin-bottom: 150px;
}
.block-account .block-title {
  width: 80%;
  font-family: "NexaBold";
  font-size: 14px;
  line-height: 24px;
  border-bottom: 0.2px solid #828282;
  padding-bottom: 15px;
}
.detail-wrap {
  margin-top: 100px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
}
.detail-left {
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 25%;
}
.product-board {
  background: #f7f7f7;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  padding-top: 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  color: black;
  font-weight: bold; 
}
.product-board li a {
  display: block;
}
div[role="main"] {
  float: left;
  width: 75%;
}
aside[role="complementary"] {
  float: left;
  width: 25%;
}
</style>

