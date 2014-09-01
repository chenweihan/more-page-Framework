/**
 * Created with Vim7.3 ubuntu12.04
 * @fileOverview : 
 * @author : Chen weihan <csq-3@163.com>
 * @since : 2014年07月15日 星期二 17时41分31秒
 * @filename : mobile/lang/en.js
 * @version : 
 * @description : 
 */

;(function(win){
    if (typeof(win.lang) == 'undefined') { win.lang = {}};
    var lang = win.lang;    
     
    lang.required =  " The field is required.";
    lang.selected =  " The field is selected.";
    lang.isNaN =  " The field must be a number.";
    lang.httpFail = "The request failed";
    lang.siteName = 'MillionaireMatch';
    lang.passwordConfirm = 'Inconsistent password before'; 

    // index.html    
    lang.joinus = 'JOIN US';
    lang.singin = 'SING IN';
    
    //joinus.html
    lang.joinus_sitename = 'MillionaireMatch';
    lang.joinus_facebook = 'REGISTER WITH FACEBOOK';
    lang.joinus_des_title = 'JOIN US';
    lang.joinus_btn_continue = 'CONTINUE';
    lang.joinus_btn_submit = 'SUBMIT';
    lang.joinus_des_text = 'We won\'t spam your account, Set you permissions during register or any time afterward ';
    lang.joinus_jbb_top = 'Already have an account ? Login';
    lang.joinus_jbb_bottom1 = 'By registering. you agree to our';
    lang.joinus_jbb_bottom2 = 'Terms of Service';
    lang.email_format_error = 'this email format error.';
    lang.email_error = 'this email already exists.';
    lang.username_format_error = 'this username format error. length:';
    lang.username_error = 'this username already exists.';
    lang.password_format_error = 'this password format error. length:';
    lang.js_des_title = 'COMPLETE PROFILE';
    lang.js_des_text = 'we need some basic info to help you find you matchs';
    lang.js_your_gender = 'Your Gender';
    lang.js_your_age = 'Your Age';
    lang.js_lookfor_age = 'Look For Age';
    lang.js_your_loction = 'Loction';
    lang.js_lookfor_age_error = 'the age must be greater than 18 and less than 99';   
    lang.jt_des_title = 'FIND MATCHES';
    lang.jt_lookfor_gender = 'Look For a';
    lang.joinus_lookfor_age = 'age is wrong';
   
    //singin
    lang.singin_EU = 'the account number is wrong.'; 
    lang.singin_PW = 'the password is wrong.'; 
    lang.singin_fixedText = 'We hava sent you the email with rest password instructions';    
    lang.singin_des = 'Welcome! Singin Your MillionaireMatch Accont'; 
    lang.singin_facebook = 'SINGIN WITH FACEBOOK';
    lang.singin_forgetPW = 'Sing up | Forget Password?';
    lang.singin_done = 'DONE';

    //forgetpw
    lang.forgetpw_email = 'Wrong e-mail format, please Try again!';
    lang.forgetpw_done = 'RECOVER';
    lang.forgetpw_des = 'please enter your email to reset your passwrod. you\'ll receive an email with instruction.';

    //changepw
    lang.changepw_des = 'Change your password.';
    lang.changepw_done = 'SUBMIT';

    //user_nav
    lang.user_nav_upgrade = 'UPGRADE';
    lang.user_nav_search = 'SEARCH';
    lang.user_nav_message = 'MESSAGE';
    lang.user_nav_visitors = 'VISITORS';
    lang.user_nav_favorites = 'FAVORITES'; 
    lang.user_nav_downloadapp = 'DOWNLOAD APP';
    lang.user_nav_setting  = 'SETTING'    






})(window);
