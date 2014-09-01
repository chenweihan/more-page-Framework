/**
 * Created with Vim7.3 Ubuntu10.04
 * @fileOverview : util.js 工具类
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年11月07日 星期四 17时36分35秒
 * @filename : base/util.js
 * @version : v1.0 
 * @description : 
 */

;(function(w){

   var util = {};

   util.cloneObj = function(objA,objB) {
       for(var i in objA) {
           objB[i] = objA[i];
       }
       return objB;
   };
  
   //js获取url参数
   util.queryString = function(item){
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
   };

   //js转换时间戳
   util.unix_to_datetime = function(unix) {
      if(unix == '') return '';
      var unix = parseInt(unix/1000),
          now = new Date(parseInt(unix) * 1000);
      return now.Format('yyyy-MM-dd hh:mm:ss');
   };

   //js字符窜截取
   util.subString = function(str,length) {
         str = (str.length > length) ? str.substring(0,length)+'...' : str;
         return str;
   };  

   //关键字高亮  
   util.lightString = function(arr,str,color) {
        var pattern = '('+arr.join("|")+')';
        var reg = new RegExp(pattern,"g");
            str = str.replace(reg, "<span style='color:"+color+"'>$1</span>");
       return str;
   };

   //替换换行，空格 
   util.replaceSpace = function(str) {
        str = util.HTMLEnCode(str);
        str = str.replace(/ {4,}/g,"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        return  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+str;
   };

   //转换HTML空格
   util.HTMLEnCode = function(s) {  
            if (s.length == 0) {return "";}
            /*  
            s = str.replace(/&/g,"&gt;");  
            s = s.replace(/</g,"&lt;");  
            s = s.replace(/>/g,"&gt;");  
            s = s.replace(/ /g,"&nbsp;");  
            s = s.replace(/\'/g,"'");  
            s = s.replace(/\"/g,"&quot;");
            */
            s = s.replace(/\n/g,"<br>");  
            s = s.replace(/\r/g,"<br>");  
        return s;  
   };

   util.HTMLDeCode = function(s) {
            if (s.length == 0) {return "";}
            /* 
            s = str.replace(/&gt;/g,"&");  
            s = s.replace(/&lt;/g,"<");  
            s = s.replace(/&gt;/g,">");  
            s = s.replace(/&nbsp;/g," ");  
            s = s.replace(/'/g,"\'");  
            s = s.replace(/&quot;/g,"\"");
            */  
            s = s.replace(/<br>/g,"\n");  
            s = s.replace(/<br>/g,"\r");  
        return s;  
   }; 

   //转换HTML实体
   util.HTMLAllEnCode = function(s) {  
            if (s.length == 0) {return "";}
            s = str.replace(/&/g,"&gt;");  
            s = s.replace(/</g,"&lt;");  
            s = s.replace(/>/g,"&gt;");  
            s = s.replace(/ /g,"&nbsp;");  
            s = s.replace(/\'/g,"'");  
            s = s.replace(/\"/g,"&quot;");
            s = s.replace(/\n/g,"<br>");  
            s = s.replace(/\r/g,"<br>");  
        return s;  
   };

   util.HTMLAllDeCode = function(s) {
            if (s.length == 0) {return "";}
            s = str.replace(/&gt;/g,"&");  
            s = s.replace(/&lt;/g,"<");  
            s = s.replace(/&gt;/g,">");  
            s = s.replace(/&nbsp;/g," ");  
            s = s.replace(/'/g,"\'");  
            s = s.replace(/&quot;/g,"\"");
            s = s.replace(/<br>/g,"\n");  
            s = s.replace(/<br>/g,"\r");  
        return s;  
   }; 

   //增加js时间基类方法
   Date.prototype.Format = function (fmt) { 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

   //获取当前时间或者NUM前的时间
   util.getCurrentDate = function(num) {
       var time,
           myDate= new Date();
       if (typeof(num) == 'undefined') {
           time = myDate.Format("yyyy-MM-dd");
       } else if (num == 'all') { 
           time = myDate.Format("yyyy-MM-dd hh:mm:ss");
       } else {
           myDate = new Date((myDate) - num*24*3600*1000);
           time = myDate.Format("yyyy-MM-dd");
       }
       return time;
   };


   util.isEmail = function(email) {
        var bool = false;
            filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (filter.test(email)) {
                bool = true;
            } 
        return bool;
   }; 

   util.isLength = function(str,min,max) {
        var bool = true,len = str.length;
        if (len < min || len >max) {
              bool = false;
        }
        return bool;
   };

   //异常处理预埋管理统一接口 
   util.logError = function(obj) {
        console.log(obj) 
        //业务逻辑 
   };

   //ajax请求预埋管理统一接口
   util.ajaxControl = function(obj) {
        //业务逻辑
        return obj;
   };

   util.queryString = function(item){
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
   };
   
   //tip 小图标
   util.tip = function(str,dom,time) {
        var html = $("<div class='tip'><span>"+str+"</span></div>");
      
        if ($(dom).find('.tip').length < 1) { 
            dom.append(html);
        }

        if (time > 0 ) {
            setTimeout(function(){
               html.remove(); 
            },time);
        } 
   };


   w.util = util;     
})(window);

