/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 登陆页面
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月25日 星期五 11时08分30秒
 * @filename : millionairematch/js/singin.js
 * @version : 
 * @description : 
 */

;(function(win){

    if (typeof(win.singin) == 'undefined') { win.singin = {}};
    var page = win.singin;    
  
    page.init = function() {
        page.ejs();   
        page.bindEvt(); 
        page.fromUrl(); 
    };
   
    page.fromUrl = function() {
       var val = util.queryString('type');
       if (val == 'forgetpassword') {
           $('.fixedMsg').show();
       }
    };

    page.ejs = function() {
       var data = win.lang;
           dom = document.getElementById('singin_ejs').innerHTML,
           html = ejs.render(dom, data);  
           document.body.innerHTML = html;     
    };
         
    page.bindEvt = function() {
       
         $("#singin").find('.backBtn').on('tap',function(){
            page.backPage();
         });

         $('#singin').find('.forget_password').on('tap',function(){
            win.location.href = 'forgetpw.html';
         });

         $("#singin").find('.btn-singin').on('tap',function(){
            var obj = {};
                obj.EU = $('input[name="userName"]').val();
                obj.PW = $('input[name="passWord"]').val();
            if (page.validata(obj)) {
                page.ajaxSingin(obj,this);
            }
         });
    };

    page.validata = function(data) {
         var obj = {bool:true,type:1};
         for (var i in data) {
	     if ($.trim(data[i]) == '') {
                obj.bool = false;
             }
	     obj.dom = $('.'+i);
	     obj.msg = win.lang.required; 
	     window.share.inputError(obj);
         }
         return obj.bool; 
    };

    page.callbackError = function(data) {
         for (var i in data) {
	      var obj = {
		    type : 1,
		    dom  : $('.'+i),
		    msg  : win.lang['singin_'+i], 
		    bool : bool 
	      };
	      window.share.inputError(obj);
         }
    };

    page.backPage = function() {
         win.location.href = 'index.html';
    };

    page.successPage = function() {
         alert('singin success!');
         //win.location.href = 'user.html';
    };

    page.ajaxSingin = function(obj,that) {
         win.share.ajaxStartA($(that));
         var obj = {
		 url : ENV.baseApi+'api.php',
		 type : 'POST',
		 data : obj,
		 success : function(data) {
                       win.location.href = 'user_search.html'; 
                       console.log(data);              
                 },
		 error : function(xhr, errorType, error) { 
                       var obj = {};
                           obj.type = 2;
                           obj.msg = win.lang.httpFail;         
	               win.share.inputError(obj);
                 },
                 complete : function(xhr, status) {
                       win.share.ajaxEndA($(that));
                       win.location.href = 'user_search.html';
                 }
             };
        $.ajax(util.ajaxControl(obj)); 
    }


})(window)
