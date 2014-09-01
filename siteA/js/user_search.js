/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月29日 星期二 14时32分59秒
 * @filename : millionairematch/js/user_search.js
 * @version : 
 * @description : 
 */
;(function(win){

    if (typeof(win.user_search) == 'undefined') { win.user_search = {}};
    var page = win.user_search;    
 
    page.state = {
        scrollBottom : false
    };
 
    page.init = function() {
       page.ejs();   
       page.bindEvt();
    };
   
    page.ejs = function() {
       var data = win.lang,
           dom = document.getElementById('user_search_ejs').innerHTML,
           html = ejs.render(dom, data);  
           document.body.innerHTML = html;
       //动态获取模块页面
       $.get('../html/user_nav.ejs',function(response){
           var nav_html = ejs.render(response, data);  
           $('#user_search').append(nav_html);
           page.width640(); 
       }) 
    };

    page.width640 = function() {
       if ($(window).width() > ENV.width) {
           var wh = $(window).width(),
               nav_h = $('.user_nav').width();
           $('.user_nav').attr('display','block');
           $('.user_page').css('width',wh-nav_h+'px');
       } else {
           $('.user_nav').attr('display','none');
       }               
    };

    page.bindEvt = function() {
       if ($(window).width() < ENV.width) {               
	   $('.body').on('tap',function(){
              if ($('.user_nav').attr('display') == 'block') {
	         page.navSwith();
              }
	   });         

	   $('.userNav').on('tap',function(e){
	       page.navSwith();
	   }); 
       } else {
 	   $('.userNav').on('tap',function(e){
	       page.nav640();
	   }); 
       }

       $('.list').on('tap',function(){
           
            if ($('.user_nav').attr('display') == 'none') {
               win.location.href = 'user_info.html';
            }
       });

       $(window).on('scroll',function(e){
           var WH = $(window).height(),
               SH = $(this).scrollTop(),
               DH = $(window.document).height(); 
           if ((DH-WH-SH) < 50 && !page.state.scrollBottom) { 
               page.state.scrollBottom = true;
               //ajaxList 完成修改该状态属性
               page.ajaxList();
           }
       });
    };

    page.ajaxList = function() {
        
       win.share.ajaxStartB($('.body').find('ul'));
       var obj = {
		 url : ENV.baseApi+'api.php',
		 type : 'GET',
		 data : obj,
		 success : function(data) {
		     console.log('success!'); 
		 },
		 error : function(xhr, errorType, error) { 

		 },
		 complete : function(xhr, status) {
		     //win.share.ajaxEndB($('.body').find('ul'));
                     setTimeout(function(){
                        page.state.scrollBottom = false;
                     },500)
		 }
           };
	$.ajax(util.ajaxControl(obj)); 
    };

    page.navSwith = function() {
       if ($('.user_nav').attr('display') == 'block') {
	   
           $('.user_nav').css({
	       '-webkit-transform' : 'translate3d(-260px, 0px, 0px)'
	   });
	  
	   $('.user_page').css({
	       '-webkit-transform' : 'translate3d(0px, 0px, 0px)'
	   });

           $('.user_nav').attr('display','none');

       } else {
	  
           $('.user_nav').css({
	       '-webkit-transform' : 'translate3d(0px, 0px, 0px)'
	   });
	  
	   $('.user_page').css({
	       '-webkit-transform' : 'translate3d(260px, 0px, 0px)'
	   })

           $('.user_nav').attr('display','block');
       }
    };

    page.nav640 = function() {
       if ($('.user_nav').attr('display') == 'block') {
           $('.user_nav').css({
	       '-webkit-transform' : 'translate3d(-260px, 0px, 0px)'
	   });
	   $('.user_page').css({
	       '-webkit-transform' : 'translate3d(0px, 0px, 0px)', 
	       'width' : $(window).width()
	   });
           $('.user_nav').attr('display','none');
       } else {
           $('.user_nav').css({
	       '-webkit-transform' : 'translate3d(0px, 0px, 0px)'
	   });
	 
	   $('.user_page').css({'-webkit-transform' : 'translate3d(260px, 0px, 0px)'});
           setTimeout(function() { 
	       $('.user_page').css({'width' : $(window).width() - $('.user_nav').width()});
           },300);
           $('.user_nav').attr('display','block');
       }
    };

})(window);
