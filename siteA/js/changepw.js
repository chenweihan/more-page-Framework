/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月26日 星期六 11时00分58秒
 * @filename : millionairematch/js/changepw.js
 * @version : 
 * @description : 
 */

;(function(win){

    if (typeof(win.changepw) == 'undefined') { win.changepw = {}};
    var page = win.changepw;    
  
    page.init = function() {
       page.ejs();   
       page.bindEvt(); 
    };

    page.ejs = function() {
       var data = win.lang;
           dom = document.getElementById('changepw_ejs').innerHTML,
           html = ejs.render(dom, data);  
           document.body.innerHTML = html;     
    };

    page.bindEvt = function() {

       $('#changepw').find('.backBtn').on('tap',function(){
           win.location.href = 'history.go(-1)';
       });

       $("#changepw").find('.btn-changepw').on('tap',function(){
            var obj = {};
                obj.passwordN = $('input[name="passwordN"]').val();
                obj.passwordC = $('input[name="passwordC"]').val();
            
            if (page.validata(obj)) {
                page.ajaxChangePW(obj,this);
            }
            
            console.log(obj);
       });
    };
    
    page.validata = function(data) {
         var obj = {bool:true,type:1};
         for (var i in data) {
	     if ($.trim(data[i]) == '') {
                obj.bool = false;
	        obj.msg = win.lang.required; 
             } else if (!util.isLength(data[i],6,18)) {
                obj.bool = false;
                obj.msg = win.lang.password_format_error+'[6-18].';
             } else if (i == 'passwordC'){
                 if(data['passwordC'] !== data['passwordN']) {
                    obj.bool = false;
                    obj.msg = win.lang.passwordConfirm;
                 } 

             }
	     obj.dom = $('.'+i);
	     window.share.inputError(obj);
         }

         return obj.bool; 
    };


})(window);
