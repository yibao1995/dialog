let dialog = {};
//自动消失弹窗
dialog.toast = function(message,time){
    var prevToast = document.getElementsByClassName("toast-box");
    if(prevToast.length>0){
        prevToast[0].parentNode.removeChild(prevToast[0]);
    }
    var toast = document.createElement('div');
    toast.classList.add('toast-box','toast-active');
    toast.innerHTML = '<div class="' + 'toast-message' + '">' + message + '</div>';
    document.getElementsByTagName('body')[0].appendChild(toast);
    toast.addEventListener('click', function() {
        toast.parentNode.removeChild(toast);
        toast = null;
    });
    if(time){var i = time/1000;
    }else{var i = 3;}
    var times = setInterval(function(){
        i  = i - 1;
        if(i <= 0 && i > -1){
            clearInterval(times);
            toast.classList.remove('toast-active');
            toast = null;
        }
    },1000);
};
dialog.alertContent = function(obj,dom,callback){
    if(obj.title){
        var alertTitle = document.createElement('div');
        alertTitle.classList.add('alert-title');
        alertTitle.innerHTML = obj.title;
        dom[0].appendChild(alertTitle);
    }
    if(obj.msg){
        var alertMsg = document.createElement('div');
        alertMsg.classList.add('alert-msg');
        alertMsg.innerHTML = obj.msg;
        dom[0].appendChild(alertMsg);
    }
    var alertOk = document.createElement('span');
    alertOk.classList.add('alert-Ok');
    alertOk.innerHTML = '确定';
    dom[0].appendChild(alertOk);
    if(callback){
        alertOk.classList.add('alert-btn');
        var alertQuit = document.createElement('span');
        alertQuit.classList.add('alert-Ok','alert-Quit','alert-btn');
        alertQuit.innerHTML = '取消';
        dom[0].insertBefore(alertQuit,alertOk);
        console.log(alertOk);
        alertOk.onclick =callback;
        alertQuit.onclick = function(){
            var alertOut = document.getElementsByClassName('alert-out')[0];
            alertOut.parentNode.removeChild(alertOut);
        }
    }else{
        alertOk.onclick = function(){
            var alertOut = document.getElementsByClassName('alert-out')[0];
            alertOut.parentNode.removeChild(alertOut);
        }
    }
};
//警告框，确认框
dialog.alert = function(obj,callback){
    var alertOut = document.createElement('div');
    alertOut.classList.add('alert-out');
    var alert = document.createElement('div');
    alert.classList.add('alert-box');
    document.getElementsByTagName('body')[0].appendChild(alertOut);
    document.getElementsByClassName('alert-out')[0].appendChild(alert);
    var alertDom = document.getElementsByClassName('alert-box');
    dialog.alertContent(obj,alertDom,callback)
};

var one = function(){
    dialog.alert({title:'hello',msg:'你好'});
};
var two = function(){
    dialog.toast();
};
var three = function(){
    dialog.alert({title:'hello',msg:'你好'},function(){});
};