export default {
  data: {

  },
  animOp: {
    hidetabbar() {
      wx.hideTabBar({
        fail: function () {
          setTimeout(function () { // 做了个延时重试一次，作为保底。
            wx.hideTabBar()
          }, 500)
        }
      });
    },
    getSystemInfo: function () {
      let t = this;
      wx.getSystemInfo({
        success: function (res) {
          t.globalData.systemInfo = res;
        }
      });
    },
  }

}