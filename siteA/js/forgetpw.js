/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月25日 星期五 17时42分48秒
 * @filename : millionairematch/js/forgetpw.js
 * @version : 
 * @description : 
 */

;(function(win){

    if (typeof(win.forgetpw) == 'undefined') { win.forgetpw = {}};
    var page = win.forgetpw;    
  
    page.init = function() {
       page.ejs();   
       page.bindEvt(); 
    };

    page.ejs = function() {
       var data = win.lang;
           dom = document.getElementById('forgetpw_ejs').innerHTML,
           html = ejs.render(dom, data);  
           document.body.innerHTML = html;     
    };

    page.bindEvt = function() {

       $('#forgetpw').find('.backBtn').on('tap',function(){
             win.location.href = 'singin.html' ;
       });

       $("#forgetpw").find('.btn-forgetpw').on('tap',function(){
            var obj = {};
                obj.email = $('input[name="email"]').val();
            if (page.validata(obj)) {
                page.ajaxSendEmail(obj,this);
            }
       });

    };

    page.singinPage = function() {
         win.location.href = 'singin.html?type=forgetpassword';
    };

    page.validata = function(data) {
         var obj = {bool:true,type:1};
	     if ($.trim(data.email) == '') {
		 obj.bool = false;
             } else if (!util.isEmail(data.email)) {
                 obj.bool = false;
             }
	     obj.dom = $('.email');
    	     obj.msg = win.lang.forgetpw_email;
	     window.share.inputError(obj);

         return obj.bool; 
    };

    page.ajaxSendEmail = function(obj,that) {
 
         win.share.ajaxStartA($(that));
         var obj = {
		 url : ENV.baseApi+'api.php',
		 type : 'POST',
		 data : obj,
		 success : function(data) {
                       page.singinPage();           
                 },
		 error : function(xhr, errorType, error) {
                       console.log(xhr,errorType,error); 
                       var obj = {};
                           obj.type = 2;
                           obj.msg = win.lang.httpFail;         
	               win.share.inputError(obj);
                 },
                 complete : function(xhr, status) {
                       win.share.ajaxEndA($(that));
                 }
             };
        $.ajax(util.ajaxControl(obj)); 
    };

})(window);
