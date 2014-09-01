/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : tab滑动效果 由主窗口偏移量实现 缺点：跳转跨TAB切换显示问题。 组件通用化不足，需要重构 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月18日 星期五 14时30分50秒
 * @filename : /app/www/swift/mobile/js/componnet/tab/zepto.tab.js
 * @version : 
 * @description : 
 */

(function(){


  $.fn.tabs = function(opt) {
           
	var touch={}, opt = opt || {}, tthis = this;
	  
	var defaults = {
              tabs : 3,
              after:function(){}
	};
                 
        for (var i in defaults ) {
           if ( typeof(opt[i]) == 'undefined') {
              opt[i] = defaults[i];
           }
        }

        touch.move = 0;
        touch.index = 0;
        touch.multiple = 1;

        var winWidth = window.innerWidth;  
        var timeS = 0,timeE = 0;
        var bool = false;          

        


 	$(tthis).bind('touchstart',function(e){
            timeS = new Date().getTime();
	    touch.x1 = e.touches[0].pageX;
	    touch.y1 = e.touches[0].pageY;
            bool = true;
	}).bind('touchmove', function(e){
            if (bool) {
		touch.x2 = e.touches[0].pageX;
		touch.y2 = e.touches[0].pageY;
		if (xy() == 'x') {
		    move(touch.x2-touch.x1);
		}
            }
	}).bind('touchend',function(e) {
            if (bool) {
                bool = false;
		timeE = new Date().getTime();
    
		if (timeE - timeS > 500) {
		    touchendMove(touch.x2-touch.x1);
		} else {
		    if (xy() == 'x') {
			if (touch.x2 - touch.x1 > 1) {
			   swipeRightMove(200);
			} else if (touch.x2 - touch.x1 < -1){
			   swipeLeftMove(200);
			} else {
		           touchendMove(touch.x2-touch.x1);
                        }
		    }
		}
            }
	});

        function scrollTo(index) {
            if (index > touch.index) {
                touch.multiple = Math.abs(index-touch.index);
                var time = (touch.multiple > 1) ? 100 : 200; 
                swipeLeftMove(index - 1,time);
            } else if (index < touch.index) {
                var time = (touch.multiple > 1) ? 100 : 200; 
                touch.multiple = Math.abs(index-touch.index);
                swipeRightMove(index + 1,time);
            } else {
                touch.multiple = 1;
                touch.index = index;
           }
        }
 
        function thatIndex(that) {
            return $(tthis).find(opt.contentClass).index(that);
        }
 
        function setCss(move,time) {
            $(tthis).attr('style','-webkit-transform: translate('+move+'px); -webkit-transition: '+time+'ms linear; transition: '+time+'ms linear;');
        }

        function afterMove(index) {
            touch.index = index;
            opt['after'](index);
        }

        function touchMoveCondition(move) {
            if (move > 0 ) {
		move = 0;
	    } else if (move <= -(winWidth * (opt.tabs-1))) {
		move = -(winWidth * (opt.tabs-1));
	    }
            return move;
        }

        function touchIndexCondtion(index) {
            if (index < 0) {
                index = 0 ;
            } else if (index > opt.tabs-1) {
                index = opt.tabs -1;
            }
            return index;
        }

        function swipeLeftMove(time) {
	    touch.move += -winWidth * touch.multiple;
            touch.move = touchMoveCondition(touch.move); 
            setCss(touch.move,time);
            index = touchIndexCondtion(touch.index+1);
            afterMove(index);
        }
 
        function swipeRightMove(time) {
            touch.move += winWidth * touch.multiple;
            touch.move = touchMoveCondition(touch.move); 
            setCss(touch.move,time);
            index = touchIndexCondtion(touch.index-1);
            afterMove(index);
        }

        function xy() {
	    var  xy= 'y';
	    if (Math.abs(touch.x1 - touch.x2) > Math.abs(touch.y1 - touch.y2)) {
	         xy = 'x';
	    }                 
            return xy;     
        };

        function touchendMove(move) {
           var num=0,move = Math.abs(move);
               
               if(move < winWidth/2) {
		   move = 0;
                   num = 0;
	       } else {
		   move = winWidth;
                   num = 1;
	       }

               if ((touch.x2-touch.x1) > 0 ) {
                  move = move;
                  num = -num 
               } else {
                  move = -move; 
               }
   
               touch.move += move;
               touch.move = touchMoveCondition(touch.move); 
               setCss(touch.move,100);
               index = touchIndexCondtion(touch.index+num);
               afterMove(index);
        }

        function move(move) {
           var move = touch.move+move;
               move = touchMoveCondition(move); 
               setCss(move,0);
        }
   }; 
})();
