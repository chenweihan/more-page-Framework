/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 弹出对话框 支持comfirm dialog 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年08月05日 星期二 14时38分32秒
 * @filename : swift/mobile/js/componnet/dialog/zepto.dialog.js
 * @version : 
 * @description : 
 */

;(function(){

   var dialog = {

       show : function(opt) {
            switch(opt.type) {
               case 'comfirm':
                   this.comfirmDialog(opt);
               break;
            }
       },
        
       hide : function() {

       },
     
       backgroundCover : function(type) {
           var html = "<div class='bodyCover'></div>";
           if ($('body').find('.bodyCover').length < 1 && type) { 
               $('body').append(html);
           } else if (!type) {
               $('body').find('.bodyCover').remove();         
           }
       },
 
       comfirmDialog : function(opt) {
           var dom = opt.dom,
               comtemt = opt.content,
	       html =  "<div class='comfirmDialog'>"+
                       "     <div class='bgOpacity'></div>"+
		       "     <div class='comfirmTitle'></div>"+ 
		       "     <div class='comfirmContent'></div>"+ 
		       "     <div class='comfirmSubmit'>"+
		       "          <span class='comfirm'>YES</span> <span class='cancel'>NO</span>"+
		       "     </div>"+ 
		       "</div>";
               html = $(html);

               html.find('.comfirm').bind('tap',function(e){
                       html.remove(); 
                       opt.success(e);               
               });

               html.find('.cancel').bind('tap',function(){
                       html.remove();
                       opt.cancel(e);                
               });

           if (opt.cover) {
               this.backgroundCover(true);
           }

           if (dom.find('.comfirmDialog').length < 1) { 
                dom.append(html);
           }
       }
   }; 
   
   $.dialog = dialog;
})()

