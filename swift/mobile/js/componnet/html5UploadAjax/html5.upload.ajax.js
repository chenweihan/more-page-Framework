;(function(){

           window.html5UploadAjax = {

                     /**
                      *  {  
				  id :
                               filter: 'image'
                              maxSize: 2048000 
				  url:
			    onSuccess:
			      onError:
			   onProgress:
                             onReader:
                         }
                      */
                     opt : {},
 
                     init : function(opt) {
                         this.opt = opt;
                         this.bindEvt();
                     },
 
                     bindEvt : function() {
                         var tthis = this;
	                 $('#'+tthis.opt.id).on("change", function(e) { tthis.changeFile(e) }, false);
                     },

                     changeFile : function(e) {
                         var file = this.getFile(); 
                         var obj =  this.filterFile(file);
                         if (obj.bool) {
                             this.readData(file); 
                             this.ajaxData(file); 
                         } else {
                             this.logErr(obj.msg);
                         }
                     },
       
                     logErr : function(msg) {
                         alert(msg);
                     },

                     filterFile : function(file) {
                        var bool = true, msg=''; 
                        if (file.type.indexOf(this.opt.filter) == 0) {
			    if (file.size >= this.opt.maxSize) {
                                bool = false; 
			        msg = 'This picture should be less than '+this.opt.maxSize/1000+'KB.';	
			    }			
			} else {
                                bool = false; 
				msg = 'This file is not in the image.';
			}
                        return {bool : bool ,msg : msg};
                     },                
 
                     getFile : function() {
                          //return  e.target.files[0];
                          return $("#"+this.opt.id)[0].files[0];
                     },

                     formData : function(file) {
                          var data = new FormData();
			      data.append('file', file);
			      //data.append('fileName', file.name);
			      //data.append('fileType', file.type);
			      //data.append('fileSize', file.size);
                          return data; 
                     },

                     readData : function(file) {
                          var tthis = this,
                              reader = new FileReader(); 
			      reader.readAsDataURL(file); 
			      reader.onload = function(e){
                                  tthis.opt.onReader(e);     
				 //$('body').append('<img src="'+e.target.result+'" alt=""/>'); 
			      }   
                     },

                     ajaxData : function(file) {
                        var tthis = this,data = this.formData(file),xhr = new XMLHttpRequest();
			    if(xhr.upload) {
				xhr.upload.addEventListener("progress", function(evt){tthis.opt.onProgress(evt)}, false);
			    }
			    xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
				    if (xhr.status == 200) {
                                        tthis.opt.onSuccess(xhr.responseText,e); 
				    } else {
                                        tthis.opt.onError(xhr.responseText,e); 
				    }
				}
			    };
			    xhr.open("POST", this.opt.url, true);
			    xhr.send(data);
                     }

                };
})()
