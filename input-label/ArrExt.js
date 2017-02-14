/**
 * Created by IBAS on 2017/2/13.
 */

var ArrExt = (function (){
    var pushOption = {
        Distinct : 1,
        DropUnUse : 2
    };
    var copyTime = function() {
        if (!Array.prototype.copyTimes) {
            Array.prototype.copyTimes = function(times){
                var arr = this;
                var tar = [];
                for (var i = 0;i < times;i++) {
                    arr.forEach(function(j){
                        tar.push(j);
                    });
                }
                return tar;
            };
        }
    };
    var distinct = function() {
        if (!Array.prototype.distinct) {
            Array.prototype.distinct = function(){
                var arr = this,
                    dic = {},
                    ret = [];
                arr.forEach(function(i){
                    if (dic[i]) {} else {
                        dic[i] = 1;
                        ret.push(i);
                    }
                });
                return ret;
            };
        }
    };
    var pushExt = function() {
        if (!Array.prototype.pushExt) {
            Array.prototype.pushExt = function(item,option) {
                var ret = true,
                    arr = this;
                if (option == pushOption.Distinct) {
                    arr.forEach(function(i){
                        if (i == item) {
                            ret = false;
                            return;
                        }
                    });
                }
                if (ret) {
                    this.push(item);
                }
                return ret;
            }
        }
    };
    var joinExt = function() {
        if (!Array.prototype.joinExt) {
            Array.prototype.joinExt = function(ch,option) {
                var ret = '',
                    arr = this,
                    j = 0;
                if (option == pushOption.DropUnUse) {
                    arr.forEach(function(i){
                        if (i) {
                            if (j) {
                                ret += ch + i;
                            } else {
                                j++;
                                ret = i;
                            }
                        }
                    });
                }
                return ret;
            };
        }
    };
    return {
        copyTime : copyTime,
        distinct : distinct,
        pushExt : pushExt,
        joinExt : joinExt,
        pushOption : pushOption
    };
})();
