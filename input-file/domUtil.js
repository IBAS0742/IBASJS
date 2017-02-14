/**
 * Created by IBAS on 2017/2/13.
 */

var domUtil = (function(){
    var newEle = function(str){
        if (typeof str === 'string'){
            return document.createElement(str);
        } else {
            return null;
        }
    }
    var newEleWithConeten = function(str,content_) {
        if (typeof str === 'string'){
            var ele = document.createElement(str);
            ele.innerText = content_;
            return ele;
        } else {
            return null;
        }
    }
    return {
        newEle : newEle,
        newEleWithConeten : newEleWithConeten
    };
})();