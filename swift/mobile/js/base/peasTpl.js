/**
 * Created with Vim7.3
 * @fileOverview : peasTpl js模板引擎 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2013年05月24日 星期五 16时51分57秒
 * @filename : peasTpl.js
 * @version : v 0.1
 * @description : peasTpl 模板引擎实现
 */

(function() {
   var peasTpl =  {
          /**
           *  private   
           *  config
           *  tagsOpen 
           *  tagsClose 
           *  cache   [true/false]
           */
          _config : {
               tagsOpen : '<%',
               tagsClose : '%>',
               cache : false
          }, 
           
          /**
           * privete 
           * cache object
           */
          _cache : {},

          /**
           * compile Dom id 
           */
          compile : function(str,data) {
                  return this.render(str,data);
          }, 
         
          /**
           * public render HTML
           * @param tpl {string}  html template
           * @param data {obj} json Object
           */
          render : function(tpl,data) {
                var output = '',str = '';
                if (typeof(this._config.cache[tpl]) !== 'undefined') { 
                    output = this._config.cache[tpl];
                } else {
                    if (!/\W/.test(tpl)) {
                       str += tpl; 
                    } else {
                       str += this.parse(tpl,data); 
                    }
                    output += str;
                    if (this._config.cache) {this.cache[tpl] = tpl};
                }
                //console.log(output);
                return output;    
          }, 
          
          /**
           * parse Tpl 
           */
          parse : function(tpl,data) {
                
                 var functionString = "try { " +
                                    "var p=[];" +
                                    "with(obj){p.push('" +
                                    tpl
                                    .replace(/[\r\t\n]/g, " ")
                                    .split("<%").join("\t")
                                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                                    .replace(/\t=(.*?)%>/g, "',$1,'")
                                    .split("\t").join("');")
                                    .split("%>").join("p.push('")
                                    .split("\r").join("\\'")
                                    + "');};" + 
                                    "return p.join('');" +
                                    "} catch(e){if(console){console.log(e)}else{alert(e)}}";
                 //console.log(functionString);
                 var fn = new Function('obj',functionString);    
                 return data ? fn( data ) : fn;
          }
          //实体，异常 
      }; 
      this.peasTpl = peasTpl;
})();
