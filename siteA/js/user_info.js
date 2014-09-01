/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月30日 星期三 14时25分12秒
 * @filename : millionairematch/js/user_info.js
 * @version : 
 * @description : 
 */

;(function(win){

    if (typeof(win.user_info) == 'undefined') { win.user_info = {}};
    var page = win.user_info;    
 
    page.init = function() {
        page.ejs();   
        page.bindEvt();
        page.tabSwitch(0); 
        //幻灯片
        $('#slider').slider({
             sliderInit : function(data){page.sliderAfter(data)},
             sliderAfter : function(data) {page.sliderAfter(data)} 
        });
    };
  
    page.sliderAfter = function(data) {
        $('.slider-item-num').html(data.index+1+"/"+data.sliderNum);
    };
 
    page.ejs = function() {
        var data = win.lang,
            dom = document.getElementById('user_info_ejs').innerHTML,
            html = ejs.render(dom, data);  
            document.body.innerHTML = html;
    };

    page.bindEvt = function() {
        
        $('.head').on('touchmove',function(){
            console.log(41);
        });
   
        $('.backBtn').on('tap',function(){
            page.backPage();
        });
   
        $('.tabTitle').find('li').on('tap',function(){
            var index = $(this).index();
            page.tabSwitch(index);  
        });

        $('.sendButton').on('tap',function(){
            var val = $('.inputGroup').find('input').val();
            if ($.trim(val) !== '') {
                alert('send#val');
            } else {
                alert('empty');
            }
        });
    };  

    page.backPage = function() {
        win.location.href = 'user_search.html';
    };

    page.tabSwitch = function(index) {
	$('.tabInfo').find('.tabTitle').find('li').removeAttr('style');
        $('.tabInfo').find('.tabContent').css('display','none');
        $('.tabTitle').find('li').eq(index).attr('style','background:#E0B569;color:#fff;');
        $('.tabContent').eq(index).show(); 
    };

})(window);

