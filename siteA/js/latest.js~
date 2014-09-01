/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 这个页面的唯一功能，保持配置是最新的，不合并到config.js里面的原因是，加载器有依赖顺序问题。 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月31日 星期四 15时23分20秒
 * @filename : millionairematch/js/latest.js
 * @version : 
 * @description : 
 */

//全局环境变量
var ENV = {
	    //环境配置
	    type : "development",
        //domain :
        domain : "http://127.0.0.1/",
	    //api请求Base 
	    baseApi : "http://127.0.0.1/api/",
	    //远程路径
	    remoteFile : "http://127.0.0.1/more-page-Framework/swift/mobile/",
	    //本地路径
	    localFile : "../",
	    //version版本
	    version : "2.0",
	    //浏览器信息 
	    browser : '',//getBrowserInfo();
	    //语言包 先从cookie中获取，否，默认为英语。
	    lang : 'en',//getLang();
	    //debug
	    debug : true,
	    //分隔界限
	    width :640 
};

;(function(){
  var script = document.createElement("script")
      script.type = "text/javascript";     
  var url = ENV.remoteFile+"js/base/LAB.min.js?v="+ENV.version;
      script.src = url+(ENV.debug ? ((/\?.*$/.test(url) ? "&_" : "?_") + ~~(Math.random()*1E9) + "=") : "");
      document.getElementsByTagName("head")[0].appendChild(script);
})();

