/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 这个页面的唯一功能，就是让HTML页面模版中没有绝对路径和域名的资源引入。这样的让页面脱离固定的值，以防止后期修改初始入口引入资源的大量维护工作。 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月31日 星期四 15时23分20秒
 * @filename : millionairematch/js/load.js
 * @version : 
 * @description : 
 */



;(function(){
  var script = document.createElement("script")
      script.type = "text/javascript";
      script.src = "../js/latest.js?time="+ (Math.random()*1E9);
      document.getElementsByTagName("head")[0].appendChild(script);
})();

