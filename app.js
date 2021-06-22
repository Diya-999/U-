//app.js
// import tabbarModel from './utils/tabbar.js';
App({
  
  // ...tabbarModel.animOp,
  onLaunch: function (options) {
    var goods = wx.getStorageSync('goods');
    if (!goods) {
      goods = this.loadGoods();
    }
    wx.setStorageSync('goods', goods);
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/index/index",
          "iconPath": "icon/search-0.jpg",
          "selectedIconPath": "icon/search-1.jpg",
          "text": "首页"
        },
        {
          "pagePath": "/pages/innerpage/index",
          "iconPath": "icon/midel.png",
          "isSpecial": true,
          // "text": "发布"
        },
        {
          // "pagePath": "/pages/index/index",
          // "iconPath": "icon/search-0.jpg",
          // "selectedIconPath": "icon/search-1.jpg",
          // "text": "首页"
          "pagePath": "/pages/mine/mine",
          "iconPath": "icon/order-0.jpg",
          "selectedIconPath": "icon/order-1.jpg",
          "text": "我的"
        }
      ]
    }
  },
  loadGoods: function () {
    var goods = new Array();
    var good = new Object();
    good.id = "0"
    good.pic = '/images/order/1.jpg';
    good.name = '数字电路';
    good.price = '27.00';
    good.spec = '';
    good.count = 1;
    goods[0] = good;
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
})