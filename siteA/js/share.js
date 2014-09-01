/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 站点内公用函数 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月25日 星期五 11时39分50秒
 * @filename : millionairematch/js/share.js
 * @version : 
 * @description : 
 */


;(function(win){
    if (typeof(win.share) == 'undefined') { win.share = {}};
    var page = win.share;    
    /** 
	 obj = {
	    type:
	     dom:
	     msg:
	    bool:
	 }

     */
    page.inputError = function(obj) {
         switch(obj.type) {
               //错误渲染方式
               case 1:
                     var dom = obj.dom;
		     if (dom.next().hasClass('err')) {
			 dom.next().remove();
			 dom.find('input').removeAttr('style').removeClass('input_err');
		     }

		     if (!obj.bool) {
			 dom.after("<div class='err'>"+obj.msg+"</div>");
			 dom.find('input').css('borderColor','#f00').addClass('input_err');
		     }

               break;
               case 2:
                     alert(obj.msg);
               break;
         }
    };

    page.ajaxStartA = function(dom) {
           dom.parent().find('.ajaxLoading').remove();
           var html = $("<div class='ajaxLoading'></div>");
	   dom.after(html);
    };

    page.ajaxEndA = function(dom) {
           dom.parent().find('.ajaxLoading').remove();
    };

    page.ajaxStartB = function(dom) {
           var html = $("<div class='ajaxListLoading'></div>");
	       dom.append(html);
    };

    page.ajaxEndB = function(dom) {
           dom.find('.ajaxListLoading').remove();
    };

    page.ages = function(str) {   
        var r =  str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
        if(r==null)return false;     
        var d= new  Date(r[1],r[3]-1,r[4]);     
        if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
        {   
              var Y = new Date().getFullYear();   
              return (Y-r[1]);   
        }   
        return "error";   
    }; 
})(window);

