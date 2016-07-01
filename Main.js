// JavaScript source code

/*

*/

var IBAS = (function () {
    return {
    };
})();

/*
    Ôö¼Óä¯ÀÀÆ÷º¯Êý
*/
(function (_target) {
    if (_target) {
        _target.Object.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        }
        //defaultValue when it is a value , eg a , so all the prototype will be fill with a
        //if it is a dictionary , eg {name : a , age : b} , the prototype which not apper here will be fill with null

        //Example
        //var src = [{"id" : 1,"name" : "ibas"},{"Id" : 2,"name" : "bing","age" : "10"},{"id" : 3,"name" : "jun","sex" : "F"}];
        //src.fullPrototype();
        //src.fullPrototype({"age" : 10,"sex" : "M"});
        //src.fullPrototype({"age" : 10,"sex" : "M"},true);
        _target.Object.prototype.fullPrototype = function (defaultValue, isCaseSensitive) {
            console.log("fullPrototype");
            var arr = this.toArray();
            var proto = [];
            var singleDefault = null;
            if (!defaultValue) {
                defaultValue = {};
            }
            if (!isCaseSensitive) {
                isCaseSensitive = false;
            }
            if (isCaseSensitive) {
                if (typeof defaultValue != "object") {
                    singleDefault = defaultValue;
                    defaultValue = {};
                } else {
                    for (var i in defaultValue) {
                        defaultValue[i.toLowerCase()] = defaultValue[i];
                    }
                }
            }
            arr.forEach(function (i) {
                if (isCaseSensitive) {
                    for (var s in i) {
                        if (proto.includes(s)) {
                        } else {
                            proto.push(s);
                        }
                    }
                } else {
                    for (var s in i) {
                        if (proto.includes(s.toLowerCase())) {
                        } else {
                            proto.push(s.toLowerCase());
                        }
                    }
                }
            });
            arr.forEach(function (i) {
                if (isCaseSensitive) {
                    for (var j = 0;j < proto.length;j++) {
                        if (proto[j] in i) {
                        } else {
                            if (proto[j] in defaultValue) {
                                i[proto[j]] = defaultValue[proto[j]];
                            } else {
                                i[proto[j]] = singleDefault;
                            }
                        }
                    }
                } else {
                    var cproto = [];
                    for (var j in i) {
                        cproto.push(j.toLowerCase());
                    }
                    for (var j = 0;j < proto.length;j++) {
                        if (cproto.includes(proto[j])) {
                        } else {
                            if (proto[j] in defaultValue) {
                                i[proto[j]] = defaultValue[proto[j]];
                            } else {
                                i[proto[j]] = singleDefault;
                            }
                        }
                    }
                }
            });
            this.fullResult = arr;
        }
    }
})(window);
