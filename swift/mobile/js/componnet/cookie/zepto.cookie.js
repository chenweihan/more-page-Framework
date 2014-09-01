
;(function(){
        
   var cookie = {
      
       /**
        *    var obj = {
                 expires : 1, 
                 path:'/',
                 //domain:'',
              };
        */ 
       setCookie : function (name,value,options) {
             var expires = new Date(); 
                 expires.setTime(expires.getTime() + (options.expires * 24 * 60 * 60 * 1000));
             //encodeURI方法的作用是进行编码，主要防治value中有特殊字符  
             var str = name + '=' + encodeURI(value)
                      + (expires ? '; expires=' + expires.toGMTString() : '')
                      + (options.path ? '; path=' + options.path : '/')
                      + (options.domain ? '; domain=' + options.domain : '');
                      //+ (options.secure ? '; secure' : '');
                      //+ (options.httpOnly ? '; HttpOnly' : '');
             //console.log(str);
             document.cookie = str;
       },

 
       getCookie : function(name) {
            var search = name + "=",offset,end; 
            if(document.cookie.length > 0) { 
                offset = document.cookie.indexOf(search);
                if(offset != -1) { 
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset); 
                    if(end == -1) {
                       end = document.cookie.length;
                    };
                    return decodeURI(document.cookie.substring(offset, end));
                } 
            }
            return "";
       },   
   

       delCookie : function(name,obj) {
            this.setCookie(name, "", obj); 
       }
   }
 
   $.cookie = cookie;
})()
