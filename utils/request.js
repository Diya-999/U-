var app = getApp();
var host = 'http://118.31.61.3:8605/';

function sendData(url,postData,doSucess,doFail){
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url:'http://118.31.61.3:8605/PurchaseSellRecord/getPurchaseSellRecord/1',
    //host+url,
    // data:{
    //   username:'001',
    //   password:'abc',
    // },
    data: postData,
    method: 'POST',
    header:{
      'content-type':'application/json' //默认值
    },
    success:function(res){
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail:function(res){
      // console.log("失败");
      doFail();
    }
  })
}

function getData(url,doSucess,doFail){
  wx.request({
    url: host + url,
    header:{
      'content-type':'application/json;charset=UTF-8' //默认值
    },
    method:'GET',
    success:function(res){
      doSuccess(res.data);
    },
    fail:function(res){
      // console.log("失败");
      doFail();
    }
  })
}

/**
* module.exports用来导出代码
* js文件中通过var call = require("../util/request.js")  加载
* 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
* 项目目录不止一级，不同的js文件对应的工具类的位置不一样
*/
module.exports.request = request;
module.exports.getData = getData;
