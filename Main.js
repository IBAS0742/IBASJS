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
        if (!_target.Object.prototype.toArray) {
            _target.Object.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        }
        }

        //defaultValue when it is a value , eg a , so all the prototype will be fill with a
        //if it is a dictionary , eg {name : a , age : b} , the prototype which not apper here will be fill with singleDefault (default is null)

        //Example
        //var src = [{"id" : 1,"name" : "ibas"},{"Id" : 2,"name" : "bing","age" : "10"},{"id" : 3,"name" : "jun","sex" : "F"}];
        //src.fullPrototype();
        //src.fullPrototype({"age" : 10,"sex" : "M"});
        //src.fullPrototype({"age" : 10,"sex" : "M"},null,true);
        if (!_target.Object.prototype.fullPrototype){
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
        }

        //Example
        //var obj = document.getElementById("oneElementId");
        //var cobj = obj.deepClone();
        if (!_target.HTMLElement.prototype.deepClone) {
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

        //merge Array
        //isDistine : when it is true , it mean merge array with different element
        //a = [1,2,3];b = [2,3,4]
        //a.merge(b) => a = [1,2,3,2,3,4]
        //a.merge(b,true) => a = [1,2,3,4]
        if (!_target.Array.prototype.merge) {
            _target.Array.prototype.merge = function (obj,isDistine) {
                var _this = this;
                obj.toArray().forEach(function (i) {
                    if (isDistine) {
                        if (_this.includes(i)) { } else {
                            _this.push(i);
                        }
                    } else {
                        _this.push(i);
                    }
                });
            }
        }

        //Get All of the word of the web page .
        //Equal
        //document.body.getWold();  <==>  getAllWord();
        if (!_target.getAllWord) {
            _target.getAllWord = function (fn) {
                _target.document.body.getWord(fn);
            }
        }

        //add prototype to a object
        //a = {c:3};b = {a:1,b:2}
        //a.addPrototype(b); => a = {c:3,a:1,b:2}
        if (!_target.Object.prototype.addPrototype) {
            _target.Object.prototype.addPrototype = function (obj) {
                if (typeof obj == "object") {
                    for (var i in obj) {
                        this[i] = obj[i];
                    }
                }
            }
        }

        _target.addPrototype({
            chiLabel :
                (
                "a abbr acronym address applet area article aside audio " +
                "b base basefont bdi bdo big blockquote br button " +
                "canvas caption center cite code col colgroup command " +
                "datalist dd del details dfn dialog dir dl dt " +
                "em embed " +
                "fieldset figcaption figure font footer " +
                "h1 h2 h3 h4 h5 h6 head header hr " +
                "i input ins " +
                "kbd keygen " +
                "label legend li link " +
                "main map mark meta meter " +
                "nav noframes object optgroup option output " +
                "p param pre progress q " +
                "rp rt ruby " + 
                "s samp " +
                "td textarea tfoot th thead time tr track tt " +
                "u " +
                "var " +
                "wbr "
                ).split(' '),
            srcLabel :
                ("img iframe frameset iframeset video").split(' '),
            haveChiLabel:
                ("iframe frameset iframeset").split(' '),
            outLabel:
                ("#text #comment noscript script ").split(' '),
        });
        //Example
        //var result = document.body.getWord(function(i){i.style.color = "red";})
        if (!_target.HTMLElement.prototype.getWord) {
            _target.HTMLElement.prototype.getWord = function (fn) {
                var result = {txt : [],src : []};
                if (this.childElementCount) {
                    this.childNodes.toArray().forEach(function (i) {
                        if (_target.chiLabel.includes(i.nodeName.toLowerCase())) {
                            if (fn) {
                                fn.call(fn,i);
                            }
                            result.txt.push(i.innerText);
                        } else if (_target.srcLabel.includes(i.nodeName.toLowerCase())) {
                            if (fn) {
                                fn.call(fn, i);
                            }
                            result.src.push(i.innerText);
                            if (_target.haveChiLabel.includes(i.nodeName.toLowerCase())) {
                                // To do ...
                            }
                        } else if (!_target.outLabel.includes(i.nodeName.toLowerCase())) {
                            var cresult = i.getWord(fn);
                            result.txt.merge(cresult.txt);
                            result.src.merge(cresult.src);
                        }
                    });
                } else {
                    if (fn) {
                        fn.call(fn, this);
                        result.txt.push(this.innerText);
                    }
                }
                return result;
            }
        }

        //Example
        //var result = document.body.getAllKindOfElement();
        if (!_target.HTMLElement.prototype.getAllKindOfElement) {
            _target.HTMLElement.prototype.getAllKindOfElement = function (isToLower) {
                var result = [];
                this.childNodes.toArray().forEach(function (i) {
                    if (isToLower) {
                        result.push(i.nodeName.toLowerCase());
                    } else {
                        if (result.includes(i.nodeName)) { } else {
                            result.push(i.nodeName);
                        }
                    }
                    if (i.childNodes.length) {
                        result.merge(i.getAllKindOfElement(), true);
                    }
                });
                return result;
            }
        }
    }
})(window);



/*
function showChildName(obj) {
	var index = 0;
	if (obj.childElementCount) {
		obj.childNodes.forEach(function(i){
			index++;
			console.log(level + " " + index + " ** " + i.nodeName);
			level++;
			showChildName(i);
			level--;
		});
	}
}
*/

