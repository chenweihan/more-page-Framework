/**
 * Created with Vim7.3 Ubuntu12.04
 * @fileOverview : 可配置的文件按需并行加载器 增加$LAB库 css的加载,css不存在依赖关系，只有一个覆盖问题。 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年7月10日 星期一 10时02分19秒
 * @filename : config.js
 * @version : v 1.0
 * @description : 增加对css的载入。
 * 开发环境js一定需要在css前载入,LAB对js实行并行加载,css自己追加的功能,不具备，但生产环境会压缩合并css，所以不存在这个问题。
 * 组件扩不进行合并压缩,里面的css images js都存在路径映射关系。 
 * 合并的使用一定需要注意，多页面都会使用的js,需要单独处理，如果压缩进去就会重复加载
 * window.load 需要调用从lad加载的js会出现问题,lad是异步并行加载，可能还没有加载完成就来调用了.
 */
;(function() {
        var func = {
		routePage : function () {
		     var pageName = "index", arr, pathName =  window.location.pathname; 
		     /* 
		     //手工路由
		     if (path.indexOf('/login') > -1) return 'login';
		     else if (path.indexOf('/index') > -1) return 'index';
		     else return 'index';
		     */
		     arr = pathName.match(/.*\/(.*)\.html/i);
		     //console.log('url解析页面名称:',arr);      
		     if (arr !== null) {
			pageName = arr[1]; 
		     } else {
			//输入的页面不存在，跳转index
		     }
		     return pageName;
		},
               
                loadInit : function(page) {
                     $("script[src]").remove();
                     $(document).ready(function(){
                        window[page].init();
                     });
                }
         };
        
        /**
         * js按需加载
         * 根据页面请求的url,开发与生产环境的不同，创建配置json对象
         * arg参数一般不能超过25个，采取数组加载方式
         */
        var file = {
         
             'public' : {
                    'development' : {
                          'js' : [
                              //ENV.remoteFile+"js/base/jquery-1.8.3.min.js",    
                              ENV.remoteFile+"js/base/zepto.min.js",    
                              ENV.remoteFile+"js/base/json2.js",    
                              ENV.remoteFile+"js/base/util.js",
                              ENV.remoteFile+"js/base/ejs.js",
                              //ENV.remoteFile+"js/base/peasTpl.js",
                              ENV.localFile+"lang/"+ENV.lang+".js"
                          ],
                          
                          'css' : [
                              ENV.remoteFile+"css/siteA/public.css"
                          ]
                    },

                    'production' : {
                          'js' : [
                            //min 
                          ],
                          
                          'css' : [
                            //min
                          ]                           
                    }  
              },

              'index' : {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/index.js",
                              ENV.remoteFile+"js/componnet/dialog/zepto.dialog.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/index.css",    
                              ENV.remoteFile+"js/componnet/dialog/zepto.dialog.css"
                          ]
                     },
                     'production' : {

                     }
              },

              'joinus' : {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/joinus.js",
                              ENV.localFile+"js/share.js",
                              ENV.remoteFile+"js/componnet/tab/zepto.tab_a.js",
                              ENV.remoteFile+"js/componnet/mobiscroll/mobiscroll.dev.js",
                              ENV.remoteFile+"js/componnet/html5UploadAjax/html5.upload.ajax.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"js/componnet/mobiscroll/css/mobiscroll.dev.css",
                              ENV.remoteFile+"css/siteA/joinus.css", 
                              ENV.remoteFile+"css/siteA/singin.css" 
                          ]
                     },
                     'production' : {

                     }
              },

              'singin' : {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/singin.js",
                              ENV.localFile+"js/share.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/singin.css" 
                          ]
                     },
                     'production' : {

                     }
              },

             'forgetpw' : {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/forgetpw.js",
                              ENV.localFile+"js/share.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/forgetpw.css" 
                          ]
                     },
                     'production' : {

                     }
              },

              'changepw' : {
                    'development' : {
                         'js' : [
                              ENV.localFile+"js/changepw.js",
                              ENV.localFile+"js/share.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/changepw.css" 
                          ]
                     },
                     'production' : {

                     }
              },
 
              'user_search' :  {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/user_search.js",
                              ENV.localFile+"js/share.js"
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/share.css", 
                              ENV.remoteFile+"css/siteA/user_search.css" 
                          ]
                     },
                     'production' : {

                     }
              }, 

              'user_info' : {
                     'development' : {
                         'js' : [
                              ENV.localFile+"js/user_info.js",
                              ENV.remoteFile+"js/componnet/slider/zepto.slider.js",
                          ],
                          'css' : [
                              ENV.remoteFile+"css/siteA/user_info.css",
                              ENV.remoteFile+"js/componnet/slider/zepto.slider.css"
                          ]
                     },
                     'production' : {

                     }
              }              
        };

        var page = func.routePage();
        $LAB.setOptions({CacheBust:ENV.debug,Version:ENV.version})
        .css(function(){
            var publicCss = file['public'][ENV.type]['css'],
                pageCss = file[page][ENV.type]['css'],
                allCss = publicCss.concat(pageCss);
                return allCss;
        })
        .script(function(){
            var publicJS =  file['public'][ENV.type]['js'],
                pageJS = file[page][ENV.type]['js'],
                allJS = publicJS.concat(pageJS);
                return allJS;
        }) 
        .wait(function(){func.loadInit(page)});
})();
