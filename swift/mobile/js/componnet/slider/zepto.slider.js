/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 幻灯片 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月30日 星期三 16时32分12秒
 * @filename : swift/mobile/js/componnet/slider/zepto.slider.js
 * @version : 
 * @description : 
 */

;(function($){
 
        /**
         *  局部全局变量与默认参数选项设置
         */
        var box = null,
            opts = {},
            touch = {move:0,index:0},
            winWidth = window.innerWidth; 
            bool = false,
            autoBool = false,
            defaults = {
                sliderId : 'slider_box',
                sliderClass : 'slider-group',
                sliderPreClass : 'slider-pre',
                sliderNextClass : 'slider-next',
                sliderDotsClass : 'slider-dots',
                sliderInit : function(){},
                sliderAfter : function(){},
                sliderBefore : function(){} 
            };
      
        /**
         * 字面量方法对象 
         */ 
        var methods = {        

            init : function(id) {
                touch.sliderNum = $(box).find('.'+opts.sliderClass).length; 
                winWidth = $('#'+opts.sliderId).width();
                opts.sliderInit(touch); 
                /*
                setInterval(function(){
                    methods.sliderAuto();
                },3000);   
                */
                this.bindEvt();
            },

            sliderAuto : function() {
                var that =  $(box).find('.'+opts.sliderClass).eq(touch.index)[0];
                if (!bool) { 
		    if (touch.index == 0) {
			autoBool = false;
			methods.swipeLeftMove(that);
		    } else if (touch.index == touch.sliderNum-1) {
			autoBool = true;
			methods.swipeRightMove(that);
		    } else {
			if (autoBool) {
			    methods.swipeRightMove(that);
			} else {
			    methods.swipeLeftMove(that);
		       }
		    }
                 }
            },

            bindEvt : function() {

                var tthis = this,that =  $(box).find('.'+opts.sliderClass).eq(touch.index)[0];
              
                $(window).bind('orientationchange',function(){
                    winWidth = $('#'+opts.sliderId).width();
                    var px = -(touch.index * winWidth);
                    touch.move = px;
                    tthis.setCss(px,0);
                });
 
                $('.'+opts.sliderPreClass).on('touchstart',function(e){
                      e.stopPropagation();
                      e.preventDefault();
		      methods.swipeRightMove(that);
                });

                $('.'+opts.sliderNextClass).on('touchstart',function(e){
                      e.stopPropagation();
                      e.preventDefault();
		      methods.swipeLeftMove(that);
                });

                $(box).on('touchstart',function(e){
                     opts.sliderBefore(this);
                     touch.timeStart = new Date().getTime();
	             touch.x1 = e.touches[0].pageX;
	             touch.y1 = e.touches[0].pageY;
                     bool = true;

                }).on('touchmove',function(e){
		     if (bool) {
		 	touch.x2 = e.touches[0].pageX;
			touch.y2 = e.touches[0].pageY;
                        methods.touchDirection();
			if (touch.direction == 'x') {
                            e.preventDefault();
                            e.stopPropagation();
			    methods.moveX(touch.x2-touch.x1);
			}
		     }
                }).on('touchend',function(e){
		     if (bool) {
			 bool = false;
			 touch.timeEnd = new Date().getTime();
			 if (touch.direction == 'x') {
                            e.preventDefault();
                            e.stopPropagation();
			    var timeNum = touch.timeEnd - touch.timeStart;
				if (touch.x2 - touch.x1 > 5 && timeNum < 500) {
				   methods.swipeRightMove(this);
				} else if (touch.x2 - touch.x1 < -5 && timeNum < 500){
				   methods.swipeLeftMove(this);
	                        } else {
				   methods.touchMoveXEnd(touch.x2-touch.x1,this);
                                }
			 }
                     }
                });      
 
            },

            swipeRightMove : function(currentSlider) {
                touch.move += winWidth;
                touch.move = methods.touchMoveXCondition(touch.move); 
                this.setCss(touch.move,200);
                this.touchCurrentIndex(true,currentSlider); 
                this.touchMoveXAfter();
            },

            swipeLeftMove : function(currentSlider) {
                touch.move += -winWidth;
                touch.move = methods.touchMoveXCondition(touch.move); 
                this.setCss(touch.move,200);
                this.touchCurrentIndex(false,currentSlider); 
                this.touchMoveXAfter();
            },

            touchDirection : function() {
		touch.direction = 'y';
		if (Math.abs(touch.x1 - touch.x2) > Math.abs(touch.y1 - touch.y2)) {
		     touch.direction = 'x';
		} else {
		     touch.direction = 'y';
                }                
            },

            touchMoveXAfter : function(currentSlider) {
                $("."+opts.sliderDotsClass).find('b').removeClass('state-active').eq(touch.index).addClass('state-active');
                opts.sliderAfter(touch);                 
            },

            touchCurrentIndex : function(bool,currentSlider) {
                var index = $(box).find('.'+opts.sliderClass).index(currentSlider);
                if (bool) {
                    touch.index -= 1;
                } else {
                    touch.index += 1;
                }

                if(touch.index > touch.sliderNum-1 ) {
                    touch.index = touch.sliderNum-1      
                } else if (touch.index < 0 ) {
                    touch.index = 0;
                }
            },

 
            moveX : function(moveNum) {
                var moveNum = touch.move + moveNum;
                    moveNum = this.touchMoveXCondition(moveNum);
                    this.setCss(moveNum,200);
            },
         
            touchMoveXEnd : function(moveNum,currentSlider) {
               var moveNum = Math.abs(moveNum);
               
               if(moveNum < winWidth/2) {
		   moveNum = 0;
	       } else {
		   moveNum = winWidth;
	       }

               if ((touch.x2-touch.x1) < 0 ) {
                   moveNum = -moveNum; 
                   this.touchCurrentIndex(false,currentSlider); 
               } else {
                   this.touchCurrentIndex(true,currentSlider); 
               }
   
               moveNum = touch.move + moveNum;
               touch.move = this.touchMoveXCondition(moveNum); 
               this.setCss(touch.move,100);
               this.touchMoveXAfter();
            },
 
            touchMoveXCondition : function(moveNum) {
		if (moveNum > 0 ) {
		    moveNum = 0;
                    this.tipDialog('the frist picture.');
		} else if (moveNum < -(winWidth * (touch.sliderNum-1))) {
		    moveNum = -(winWidth * (touch.sliderNum-1));
                    this.tipDialog('the last picture.');
		}
                return moveNum;
            },
           
            setCss : function(moveNum,time) {
                $(box).attr('style','-webkit-transform: translate('+moveNum+'px); -webkit-transition: '+time+'ms linear; transition: '+time+'ms linear;');
            }, 

            tipDialog : function(str) {
                var dom = $('#'+opts.sliderId),
                    time = 500;
                util.tip(str,dom,time);
            }
         };
 
	/**
	 * slider 插件
	 */
	$.fn.slider = function(options) {
             box = this;
             opts = $.extend({}, defaults, options || {});	      
             methods.init(box,opts);
             return $(this);
	}
})(Zepto);

