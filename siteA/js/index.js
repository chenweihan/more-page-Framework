/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : index 模块  
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月09日 星期三 14时22分09秒
 * @filename : websiteA/js/index.js
 * @version : 
 * @description : 
 */

;(function(win){
    if (typeof(win.index) == 'undefined') { win.index = {}};
    var page = win.index;    
  
    page.init = function() {
        page.ejs();   
        page.bindEvt();
        //page.testDialog(); 
    };

    page.testDialog = function() {

        var opt = {
             type:'comfirm',
             dom:$('#index_box'),
             content:'testtetsettettetete',
             success:function(e){console.log('ok',e)},
             cancel:function(e){console.log('cancal',e)}
        }
        $.dialog.show(opt);
    };

    page.ejs = function() {
       var data = win.lang;
           dom = document.getElementById('index_ejs').innerHTML,
           html = ejs.render(dom, data);  
           document.body.innerHTML = html;     
    };
         
    page.bindEvt = function() {
         $('#index_box').find('.joinus').on('tap',function(){
              window.location.href = 'joinus.html'; 
         });
  
         $('#index_box').find('.singin').on('tap',function(){
              window.location.href = 'singin.html'; 
         });
    
    };

})(window);
