//import request from '../../utils/request.js';
// var call = require("../../utils/request.js")
//获取应用实例
const app = getApp()
const config = require("../../config.js");
//
// const myPackage = require('packageName')
// const packageOther = require('packageName/other')
// pages/mine/mine.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    navTab: ['我发布的', '我卖出的', '我买到的', '我的消息'],
    currentTab: 0,
    sendList: [0, 0, 0, 0],
    orders: [],
    showShare: false,
    poster: JSON.parse(config.data).share_poster,
  },
  select: {
    page: 1,
    size: 6,
    isEnd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
  },
  gotoEvaluatePage: function (event) {
    wx.navigateTo({
      url: '../SaleEvaluate/SaleEvaluate',
    })
  },
  gotoEditPage: function (event) {
    wx.navigateTo({
      url: '../EditItem/EditItem',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // app.hidetabbar();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // app.hidetabbar();
    this.setData({
      userinfo: app.userinfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  go(e) {
    if (e.currentTarget.dataset.status == '1') {
      if (!app.openid) {
        wx.showModal({
          title: '温馨提示',
          content: '该功能需要注册方可使用，是否马上去注册',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
        return false
      }
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.go
    })
  },
  //展示分享弹窗
  showShare() {
    this.setData({
      showShare: true
    });
  },
  //关闭弹窗
  closePop() {
    this.setData({
      showShare: false,
    });
  },
  //预览图片
  preview(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.link.split(",")
    });
  },
  onShareAppMessage() {
    return {
      title: JSON.parse(config.data).share_title,
      imageUrl: JSON.parse(config.data).share_img,
      path: '/pages/start/start'
    }

  },
  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // },
  /**2021/03/30dyq start*/
  // currentTab: function (e) {
  //   if (this.data.currentTab == e.currentTarget.dataset.idx) {
  //     return;
  //   }
  //   this.setData({
  //     currentTab: e.currentTarget.dataset.idx
  //   })
  //   this.select = {
  //     page: 1,
  //     size: 6,
  //     isEnd: false
  //   }
  //   this.data.sendPage = [];
  //   this.getData()
  // },
  // getData: function () {
  //   var _this = this;
  //   if (this.select.isEnd) {
  //     return
  //   }
  //   var type = this.data.currentTab == 0 ? 'ALL' : this.data.currentTab == 1 ? 'WAIT_DELIVER' : 'DELIVER';
  //   request.request(`192.168.223.250` + type + `/` + this.select.page + `/` + this.select.size, {}, 'GET', function (res) {
  //     var content = res.data.data;
  //     _this.setData({
  //       c: (_this.data.sendPage).concat(content)
  //     })
  //     if (content.length > 0) {
  //       _this.select.page++
  //     } else {
  //       _this.select.isEnd = true
  //     }
  //   })
  // },
  /**2021/3/30dyq end*/
  /**2021/4/6dyq end*/
  onLoad: function () {
    var orders = this.loadOrders(0);
    this.setData({
      orders: orders
    });
  },
  switchNav: function (e) {
    var page = this;
    var index = e.target.dataset.current;
    if (this.data.currentTab == index) {
      return false;
    } else {
      var orders = this.loadOrders(index);
      page.setData({
        currentTab: index,
        orders: orders
      });
    }
  },
  loadOrders: function (flag) {
    var orders = new Array();
    var order = new Object();
    order.id = "5522233";
    order.name = "凤一学姐";
    order.price = "21.00";
    order.condition = "交易成功"; //成功或失败
    order.title = "数字电路 张三 第六版 有几页笔记"; //名称
    order.time = "2020-03-21 15:31:04";
    order.type = "0"; //0为发布的 1为卖出的 2为买到的
    order.address = "紫荆";
    orders.push(order);

    var order2 = new Object();
    order2.id = "55221233";
    order2.phone = "12345678911";
    order2.price = "22.00";
    order2.condition = "交易成功"; //成功或失败
    order2.photo = "../../images/order/4.jpg"
    order2.title = "数字电路 张三 第六版 有几页笔记"; //名称
    order2.time = "2020-03-21 15:31:04";
    order2.type = "1"; //0为发布的 1为卖出的 2为买到的
    orders.push(order2);

    var order3 = new Object();
    order3.id = "55221233";
    order3.buyername = "凤一学姐"
    order3.phone = "12345678911";
    order3.price = "23.00";
    order3.title = "数字电路 张三 第六版 有几页笔记"; //名称
    order3.time = "2020-03-21 15:31:04";
    order3.photo = "../../images/order/4.jpg"
    order3.condition = "交易成功"; //成功或失败
    order3.type = "2"; //0为发布的 1为卖出的 2为买到的
    orders.push(order3);

    var order4 = new Object();
    order4.id = "55221233";
    order3.name = "凤一学姐"
    order4.phone = "12345678911";
    order4.price = "23.00";
    order4.title = "数字电路 张三 第六版 有几页笔记"; //名称
    order4.time = "2020-03-21 15:31:04";
    order4.type = "0"; //0为发布的 1为卖出的 2为买到的
    order4.address = "紫荆";
    orders.push(order4);

    var order5 = new Object();
    order5.id = "55221233";
    order5.phone = "12345678911";
    order3.name = "凤一学姐"
    order5.itemphoto = "../../images/order/4.jpg"
    order5.userphoto = "../../images/indexLogo2.png"
    order5.time = "2020-03-21 15:31:04";
    order5.content = "放心放心放心"
    order5.type = "3"; //0为发布的 1为卖出的 2为买到的
    orders.push(order5);

    var result = new Array();
    for (var i = 0; i < orders.length; i++) {
      if (flag == orders[i].type) {
        result.push(orders[i]);
      }
    }
    return result;
  }
  /**2021/4/6dyq end  */
})