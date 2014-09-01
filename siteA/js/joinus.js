/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月10日 星期四 09时48分47秒
 * @filename : /app/www/mobile/joinus.js
 * @version : 
 * @description : 
 */

;(function(win){
    if (typeof(win.joinus) == 'undefined') { win.joinus = {}};
    var page = win.joinus;    
  
    page.tempObj = {};  
 
    page.init = function() {
        page.ejs();   
        page.bindEvt();
        page.countryList(); 
        $.fn.tab.init({});
        page.html5Upload();
    };

    page.html5Upload = function() {
           html5UploadAjax.init({
	       id : 'file',
	       filter: 'image',
	       maxsize: 2048000,
	       //url: ENV.domain+'server/upload.php',
               url:ENV.baseApi+'basic_tmp_picture',
	       onSuccess: function(data){var data = JSON.parse(data);console.log(32,data,data.url);page.tempObj.img = data.url},
	       onError: function(data){console.log(data)},
	       onProgress: function(evt){
                            console.log('progress',evt.loaded);
			    var width = Math.round(evt.loaded /evt.total * 100);   
				if (width == 100) {
				    width = 0; 
				}
				$('#progress').css('width',width+'px');  
			    },
	       onReader: function(evt){$('#img_show').html('<img src="'+evt.target.result+'" alt=""/>');} 
            });
    };
 
    page.ejs = function() {
        var data = win.lang,
            dom = $('#joinus_ejs').html(),
            html = ejs.render(dom, data);  
            $('#joinus_ejs').replaceWith(html);
            $(".body_loading").remove();
    };

    page.bindEvt = function() {
      
         var opt = {
                'date': {
                    preset: 'date',
                    dateFormat: 'yy-mm-dd',        
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                }
              }

	$('#age').scroller('destroy').scroller($.extend(opt['date'], {
		theme: 'android-holo light',
		mode: 'scroller',
		lang: '',
		display: 'modal',
		animate: ''
	}));   

      	$('#age_group').scroller('destroy').scroller($.extend({preset:'ageGroup'}, {
		theme: 'android-holo light',
		mode: 'scroller',
		lang: '',
		display: 'modal',
		animate: '',
                placeholder: '18-99',
                inputClass:'input_age_group',
                name: 'age_group'
	}));  

        $('.jbb_top').on('tap',function(){
             window.location.href = 'singin.html'; 
        });

        $(".gender_item").on('tap',function(){
             $(this).parent().find(".gender_item").each(function(){
                  var type = $(this).attr('type');
                  $(this).removeAttr('select').removeClass('gender_item_'+type+'_select').find('div').removeClass(type+'_select').addClass(type);      
             });
             var type = $(this).attr('type');
             $(this).attr('select',true).addClass('gender_item_'+type+'_select').find('div').removeClass(type).addClass(type+'_select');
        });
        
        $(".jbc-frist").on('tap',function(){
            page.handleFristData();
        });
    
        $(".jbc-second").on('tap',function(){
            page.handleSecondData();
        });
  
        $(".jbc-three").on('tap',function(){
            page.handleThreeData();
        });
 
        $("#joinus_box").find('.joinus_back').on('tap',function(){
            page.backPage();
        });

        $('#joinus_box').find('.span_block').on('tap',function(){
            page.selectGender(this);
        });

    };
    
    page.ajaxConutryBind = function() {
    	$('#country').scroller('destroy').scroller($.extend({preset: 'select'},{
		theme: 'android-holo light',
		mode: 'scroller',
		lang: '',
		display: 'modal',
		animate: '',
		placeholder :'Country',
		inputClass:'input_location',
                name:'loction'
	}));
    };

    page.countryList = function() {
       
        var obj = {
		 url : ENV.baseApi+'basic_country_list',
		 type : 'GET',
		 success : function(data) {
                      if (data.error == 0 ) {
		          var dom = $('#country_ejs').html();
		          var html = ejs.render(dom, {arr:data.data});
		          $('.loction').html(html);
                          page.ajaxConutryBind(); 
                      }

                 },
		 error : function(xhr, errorType, error) {
                      alert('basic_country_list api is failed!');
                 } 
             };
        $.ajax(util.ajaxControl(obj)); 
    };

    page.selectGender = function(dom) {
        $('.span_block').css('background','#ccc');        
        $(dom).css('background','#f00');        
    };

    page.backPage = function() {
        var index = $.fn.tab.info.index;
        if (index > 0) {
          $.fn.tab.preTabs();  
        } else {
          window.location.href = 'index.html'; 
        }
    }

    page.handleFristData = function() {
        var bool=false,obj={};
            obj.email = $("#joinus_box").find('input[name="email"]').val(),
            obj.userName = $("#joinus_box").find('input[name="userName"]').val(),
            obj.passWord = $("#joinus_box").find('input[name="passWord"]').val();
        //$.fn.tab.gotoTabs(1); 
        //格式验证        
        bool = page.regModelValidata(obj);
        //bool = true; 
        //ajax是否存在验证 
        if (bool) {
            if ($('.jbc-frist').attr('ajax') != 1) {
                page.ajaxFristData(obj);
                util.cloneObj(obj,this.tempObj); 
            }
        } else {
            console.log('前端验证没通过！'); 
        }
    
    };

    page.gender = function(str) {
        var num = 2;
        if (str == 'man') {
            num = 2;
        } else if (str == 'woman') {
            num = 1;
        }
        return num;
    };
 
    page.optionVal = function(id,val) {
        return $('#'+id).find('option[val="'+$.trim(val)+'"]').val();
    };
 
    page.handleSecondData = function() {
         var bool = false, obj = {};
	     obj.gender = $('#joinus_second').find('.gender_item[select=true]').attr('type');
	     obj.age = $("#joinus_box").find('input[name="age"]').val();
	     obj.loction = page.optionVal('country',$("#country_dummy").val());
	     obj.zipCode = $("#joinus_box").find('input[name="zipCode"]').val();

         console.log(obj);
         //格式验证        
         bool = page.regModelValidata(obj); 
         //bool = true; 
         if (bool) {
            util.cloneObj(obj,this.tempObj); 
            //$.fn.tab.gotoTabs(2); 
            page.ajaxRegData();                
         } else {
            console.log('前端验证没通过！'); 
         }
    };
  
    page.handleThreeData = function() {
         var obj = false,arr=[],obj = {};
           
	     obj.lookForGender = $('#joinus_three').find('.gender_item[select=true]').attr('type');
             obj.lookForAge= $("#age_group_dummy").val();

	     bool = page.regModelValidata(obj); 
	     //bool = true; 
	     if (bool) {
		util.cloneObj(obj,this.tempObj); 
                page.ajaxRegData();                
	     } else {
		console.log('前端验证没通过！'); 
	     }
    },

    page.ajaxFristData = function(data) {

        $('.jbc-frist').attr('ajax',1);
        win.share.ajaxStartA($('.jbc-frist'));

        var regAccountModel = {
               username: data.userName,
               email: data.email,
               password: data.passWord
            };
 
        var obj = {
		 url : ENV.baseApi+'user_account',
		 type : 'POST',
		 data : regAccountModel,
		 success : function(data) {
                     $('.jbc-frist').attr('ajax',0);
                     win.share.ajaxEndA($('.jbc-frist'));

                     if (data.error == 0 ) {
                         $.fn.tab.gotoTabs(1); 
                     } else {
                         var obj = {};
                         switch(data.data[0].error_id) {
                            case 1:
                                obj = {bool : false, field:'userName', msg:data.data[0].msg};
                            break;
                            case 2:
                                obj = {bool : false, field:'email', msg:data.data[0].msg};
                            break;
                            case 3:
                                obj = {bool : false, field:'passWord', msg:data.data[0].msg};
                            break;
                         };
                         page.renderError(obj);
                     }
                 },
		 error : function(xhr, errorType, error) {
                     alert('http request failed!');
                 } 
             };
         $.ajax(util.ajaxControl(obj)); 
    },

    page.ajaxRegData = function() {
        $('.jbc-three').attr('ajax',1);
        win.share.ajaxStartA($('.jbc-three'));
           
        //var arr = this.tempObj.lookForAge.split('-');
        var regModel = {
		username: this.tempObj.userName,
		email: this.tempObj.email,
		password: this.tempObj.passWord,
		img: this.tempObj.img,
		gender: page.gender(this.tempObj.gender),
		age: win.share.ages(this.tempObj.age),
		r_country: this.tempObj.loction,
		r_zip: this.tempObj.zipCode,
		//match_gender: page.gender(this.tempObj.lookForGender),
                //from_age: parseInt(arr[0]),  
                //to_age: parseInt(arr[1])
            };
        
        //console.log(regModel);
 
        var obj = {
		 url : ENV.baseApi+'user_register',
		 type : 'POST',
		 data : regModel,
		 success : function(data) {
                     $('.jbc-three').attr('ajax',0);
                     win.share.ajaxEndA($('.jbc-three'));
                     //$.fn.tab.gotoTabs(1);
                     if (data.error == 0 ) {
                         alert('reg success!');
                     } else {
                         alert('error');
                         $.fn.tab.gotoTabs(0);
                     } 
                 },
		 error : function(xhr, errorType, error) {

                 } 
             };
         $.ajax(util.ajaxControl(obj)); 
    },

    page.renderError = function(obj) {
         var dom =  $('#joinus_box').find('.'+obj.field+'');

         if (obj.field =='gender' || obj.field == 'lookForGender') {
             if (dom.next().hasClass('err')) {
                 dom.next().remove();
             }
	     if (!obj.bool) {
		 dom.after("<div class='err'>"+obj.msg+"</div>");
	     }
         } else {
             if (dom.next().hasClass('err')) {
                 dom.next().remove();
                 dom.find('input').removeAttr('style').removeClass('input_err');
             }
	     if (!obj.bool) {
		 dom.after("<div class='err'>"+obj.msg+"</div>");
		 dom.find('input').css('borderColor','#f00').addClass('input_err');
	     }
          }
    };

    //验证模型数据
    page.regModelValidata = function(model) {
         var bool = true;
         for (var x in model) {
             (function(x,model){
               var obj =  page.regFieldValidata(x,model);
                   page.renderError(obj);
                   if (!obj.bool) {                   
                       bool = false;
                   } 
             })(x,model);
         }
         return bool;
    };
    
    page.regFieldValidata = function(field,model) {
            var obj = {bool : true, field:field};
            switch(field) {
                  
               case 'email' :
                     if (model[field] == null || $.trim(model[field]) == '') { 
                         obj.bool = false;
                         obj.msg = win.lang.required;
                     } else if (!util.isEmail(model[field])) {
                         obj.bool = false;
                         obj.msg = win.lang.email_format_error;
                     }
               break;
 
               case 'userName': 
                     if (model[field] == null || $.trim(model[field]) == '') {
                         obj.bool = false;
                         obj.msg = win.lang.required;
                     } else if (!util.isLength(model[field],6,18)) {
                         obj.bool = false;
                         obj.msg = win.lang.username_format_error+'[6-18].';
                     }
               break;

               case 'passWord':
                     if (model[field] == null || $.trim(model[field]) == '') {
                         obj.bool = false;
                         obj.msg = win.lang.required;
                     } else if (!util.isLength(model[field],6,18)) {
                         obj.bool = false;
                         obj.msg = win.lang.password_format_error+'[6-18].';
                     }
               break;

               case 'lookForGender':
               case 'gender':
                    if (model[field] == null || model[field] == '') {
                        obj.bool = false;
                        obj.msg = win.lang.selected;
                    }
               break;     
               case 'age':
               case 'loction':
               case 'zipCode':
                    if (model[field] == null || model[field] == '') {
                        obj.bool = false;
                        obj.msg = win.lang.required;
                    }                   
               break;  
               case 'img':
               break;

               case 'lookForAge' :
                    if (model[field] == null || model[field] == '') {
                        obj.bool = false;
                        obj.msg = win.lang.required;
                    } else {
                        var arr = model[field].split('-');
                        if (arr[1]<arr[0]) {
                            obj.bool = false;
                            obj.msg = win.lang.joinus_lookfor_age;
                        }
                       
                    }
               break;
            }     
            return obj;
    };
})(window);
