/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 重构tab组件，以方便提供对外面API使用
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月18日 星期五 14时59分29秒
 * @filename : /app/www/swift/mobile/js/componnet/tab/zepto.tab_a.js
 * @version : 
 * @description : 
 */



(function(){
 
  var winWidth = window.innerWidth;  
  
  $.fn.tab = {
    
      //全局信息
      info : {
           tabs :  2,    //tab 栏目个数
           move :  0,   //初始位移
           dom  :  '#joinus_tabs', //容器
           index : 0,    //当前Tab的index 
      },
    
      init : function(opt) {
           var tthis = this;
	   for (var i in opt ) {
	       if ( typeof(this.info[i]) == 'undefined') {
		  this.info[i] = opt[i];
	       }
	   }

           $(window).bind('orientationchange',function(){
               winWidth = window.innerWidth;
               var px = -(tthis.info.index * winWidth);
               tthis.transformCSS(px,0);
           });
       },

       nextTabs : function() {
           this.gotoTabs(this.info.index+1);
       },
 
       preTabs : function() {
           this.gotoTabs(this.info.index-1);
       },

       //非触摸唯一接口
       gotoTabs : function(index) {

            var move = winWidth,
                index = this.tabIndexCondtion(index), 
                multiple = Math.abs(index-this.info.index),
                time = multiple > 1 ? 100 : 200; 
            if (index > this.info.index) {
                move = -(winWidth * multiple); 
            } else if (index < this.info.index) {
                move = winWidth * multiple; 
            } else {
                return;
            }

            this.moveTabs(move,time);
            this.info.index = index;
       },

       moveTabs : function(move,time) {
               this.info.move += move;
               move = this.tabMoveCondition(this.info.move);
               this.transformCSS(move,time);
       },

       //tab移动偏移量修正
       tabMoveCondition : function(move) {
            if (move > 0 ) {
		move = 0;
	    } else if (move <= -(winWidth * (this.info.tabs-1))) {
		move = -(winWidth * (this.info.tabs-1));
	    }
            return move;
        },

        //tab标识修正 
        tabIndexCondtion : function(index) {
            if (index < 0) {
                index = 0 ;
            } else if (index > this.info.tabs-1) {
                index = this.info.tabs-1;
            }
            return index;
        },

        //css 动画 
        transformCSS : function(move,time) {
            $(this.info.dom).attr('style','-webkit-transform: translate('+move+'px); -webkit-transition: '+time+'ms linear; -moz-transform: translate('+move+'px); -moz-transition: '+time+'ms linear;  transition: '+time+'ms linear;');
        },
  }

})();
