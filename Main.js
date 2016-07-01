// JavaScript source code

/*

*/

var IBAS = (function () {
    return {
    };
})();

/*
    add methods to window
*/
(function (_target) {
    if (_target) {
        //Example
        //var a = "123456"
        //a.toArray(); //["1", "2", "3", "4", "5", "6"]
        _target.Object.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        }

        //defaultValue when it is a value , eg a , so all the prototype will be fill with a
        //if it is a dictionary , eg {name : a , age : b} , the prototype which not apper here will be fill with singleDefault (default is null)

        //Example
        //var src = [{"id" : 1,"name" : "ibas"},{"Id" : 2,"name" : "bing","age" : "10"},{"id" : 3,"name" : "jun","sex" : "F"}];
        //src.fullPrototype();
        //src.fullPrototype({"age" : 10,"sex" : "M"});
        //src.fullPrototype({"age" : 10,"sex" : "M"},null,true);
        _target.Object.prototype.fullPrototype = function (defaultValue,singleDefault, isCaseSensitive) {
            var arr = this.toArray();
            var proto = [];
            if (!defaultValue) {
                defaultValue = {};
            }
            if (!singleDefault) {
                singleDefault = null;
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

        //Example
        //var obj = document.getElementById("oneElementId");
        //var cobj = obj.deepClone();
        _target.HTMLElement.prototype.deepClone = function () {
            if ("cloneNode" in this) {
                var ele = this.cloneNode();
            } else {
                return this;
            }
            if (this.childElementCount) {
                for (var i = 0; i < this.childElementCount; i++) {
                    if ("deepClone" in this.childNodes[i]) {
                        var cele = this.childNodes[i].deepClone();
                        cele.innerHTML = this.childNodes[i].innerHTML;
                    } else {
                        var cele = this.childNodes[i];
                    }
                    ele.appendChild(cele);
                }
            } else {
                ele.innerHTML = this.innerHTML;
            }
            return ele;
        }

        /*
        _target.stack = 0;
        _target.Object.prototype.deepClones = function () {
            var obj = {};
            var cobj;
            if (_target.stack > 5) {
                return {};
            }
            for (var i in this) {
                if (this[i]) {
                    if (typeof this[i] == "object") {
                        for (var j in this[i]) {
                            if (typeof this[i][j] == "object" && this[i][j] != null) {
                                _target.stack++;
                                obj[i] = this[i][j].deepClones();
                                _target.stack--;
                            } else {
                                obj[i] = this[i];
                            }
                        }
                    } else {
                        obj[i] = this[i];
                    }
                } else {
                    obj[i] = this[i];
                }
            }
            return obj;
        }
        */
    }
})(window);

