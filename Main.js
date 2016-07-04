// JavaScript source code

/*
    
*/

var IBAS = (function () {
    return {
    };
})();

/*
    add methods to window
    suggestion : 
                <1> set some global array such as : _target.label _target.chi _target.chis
                <2> set one global var such as : _target.index _target.curChi
*/
(function (_target) {
    if (_target) {
        //Example
        //var a = "123456"
        //a.toArray(); //["1", "2", "3", "4", "5", "6"]
        if (!_target.Object.prototype.toArray) {
            _target.Object.prototype.toArray = function () {
                var _this = this;
                if (!_this) {
                    return [];
                } else {
                    return Array.prototype.slice.call(_this);
                }
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
                var arr = this.toArray(),
                    proto = [];
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
                        var cproto = [],
                            _defaultProto = [];
                        for (var j in i) {
                            cproto.push(j.toLowerCase());
                        }
                        for (var j in defaultValue) {
                            defaultValue[j.toLowerCase()] = defaultValue[j];
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
            _target.Array.prototype.merge = function (obj, isDistine) {
                var _this = this;
                if (obj) {
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

        //find two htmlElements' common parent element
        //  body -     divB  --   divD
        //       \           \_   divE
        //        \_   divC  --   divF
        //  divD.getCommonParent(divE) == divB
        //  divD.getCommonParent(divF) == body
        if (!_target.HTMLElement.prototype.getCommonParent) {
            _target.HTMLElement.prototype.getCommonParent = function (htmlObj) {
                var queueFirst = [htmlObj],
                    queueSecond = [],
                    _this = this, topChild,
                    findFirstChild = false,
                    isSibling = false,
                    isSameElement = false,
                    theFirstChildIsParent = false;
                if (htmlObj == _this) {
                    findFirstChild = true;
                    isSameElement = true;
                    queueSecond.push(_this);
                } else {
                    if (htmlObj != _target.document.body) {
                        while (htmlObj.parentElement != _target.document.body) {
                            htmlObj = htmlObj.parentElement;
                            queueFirst.push(htmlObj);
                        }
                        queueFirst.push(_target.document.body);
                    }
                    queueSecond.push(_this);
                    if (_this != _target.document.body) {
                        while (_this != _target.document.body && !queueFirst.includes(_this)) {
                            _this = _this.parentElement;
                            queueSecond.push(_this);
                        }
                    }
                    while (_this != queueFirst.pop());
                    queueFirst.push(_this);
                    htmlObj = queueFirst[queueFirst.length - 2];
                    _this = queueSecond[queueSecond.length - 2];
                    topChild = queueFirst[queueFirst.length - 1].childNodes;
                    for (var j = 0; j < topChild.length; j++) {
                        i = topChild[j];
                        if (i == htmlObj) {
                            findFirstChild = true;
                            break;
                        } else if (i == _this) {
                            var tmp = queueFirst;
                            queueFirst = queueSecond;
                            queueSecond = tmp;
                            findFirstChild = true;
                            break;
                        }
                    };
                    if (queueFirst.length == 2 && queueSecond.length == 2) {
                        isSibling = true;
                    }
                }
                return {
                    firstNode: queueFirst[0],
                    firstList: queueFirst,
                    secondNode: queueSecond[0],
                    secondList: queueSecond,
                    commonParent : queueSecond[queueSecond.length - 1],
                    statue : findFirstChild,
                    isSibling : isSibling,
                    isSameElement : isSameElement
                };
            }
        }

        if (!_target.HTMLElement.prototype.getOneAvailableElement) {
            // isOrder is true mean get one element from the first
            // Conversely , from the last one to search
            // default value of isOrder is true
            // the unUsefulObj default value is _target.outLabel , and you can defined them
            // like {1 : "div" , 2 : "span" , ...} or ["div","span",...] ,default object is Array
            // _target.outLabel can not deep search
            _target.HTMLElement.prototype.getOneAvailableElement = function (isOrder, unUsefulObj) {
                var result,
                    _this = this,
                    label = [0],
                    index = 0,
                    chi;
                if (typeof isOrder == "undefined") {
                    isOrder = 1;
                } else {
                    isOrder = (isOrder) ? 1 : -1;
                }
                if (!unUsefulObj) {
                    unUsefulObj = _target.outLabel;
                }
                chi = _this.childNodes;
                label[index] = (isOrder + 1) ? 0 : chi.length - 1;
                while (!result) {
                    if (_target.outLabel.includes(chi[label[index]].nodeName.toLocaleLowerCase())) {
                        label[index] += isOrder;
                        if (!chi[label[index]]) {
                            chi = chi[0].parentNode.parentNode.childNodes;
                            index--;
                            label.pop();
                            while (!chi[label[index]] && index > 0) {
                                chi = chi[0].parentNode.parentNode.childNodes;
                                index--;
                                label.pop();
                            }
                        }
                    } else if (unUsefulObj.includes(chi[label[index]].nodeName.toLocaleLowerCase())) {
                        if (chi[label[index]].childeNodes.length) {
                            chi = chi[label[index]].childeNodes;
                            index++;
                            label[index] = (isOrder + 1) ? 0 : chi.length - 1;
                        } else {
                            if (!chi[label[index]]) {
                                chi = chi[0].parentNode.parentNode.childNodes;
                                index--;
                                label.pop();
                                while (!chi[label[index]] && index > 0) {
                                    chi = chi[0].parentNode.parentNode.childNodes;
                                    index--;
                                    label.pop();
                                }
                            }
                        }
                    } else {
                        result = chi[label[index]];
                    }
                }
                return result;
            }
        }

        if (!_target.HTMLElement.prototype.getChilds) {
            // deep search some html element
            // and this is the root element
            // obj is a dictionary ( and can be null) (you can image it is a line to split a elements map to two parts)
            // obj = {firstChild : obj, lastChild : obj } or obj = { childList : Array , getDir : "up" / "down"}
            // the upper description is order by the preemptive right .
            // it means if you write "obj = {firstChild , ...}" the obj.childList will be ignore  , and getDir's default value is "down" .
            // obj can contain the follow prototype 
            // {miniElementType : "default" } or {miniElementType : ["div" , "span" , ...]}
            // the search will stop to the element that type is include in miniElmentType .
            // childList the first or the last element should be the this element
            _target.HTMLElement.prototype.getChilds = function (obj,isDebug) {
                var dearObj = {},
                    _this,
                    result,
                    label = [],
                    index;
                if (isDebug) {
                    console.log("in");
                    return isDebug;
                }
                [dearObj, obj].fullPrototype(obj, null, true);
                _this = this;
                result = {
                    statue: true,
                    arr: [],
                    err : null
                };
                if (dearObj.firstChild || dearObj.lastChild) {
                    // one of the child  (firstChild or lastChild) exist
                    var _t_result;
                    if (!dearObj.firstChild) {
                        _this.getOneAvailableElement();
                    }
                    if (!dearObj.lastChild) {
                        _this.getOneAvailableElement(0);
                    }
                    _t_result = dearObj.firstChild.getCommonParent(dearObj.lastChild);
                    if (_t_result.statue) {
                        if (_t_result.isSameElement) {
                            result.arr = _t_result.firstNode.getChildsHelp(dearObj.miniElementType);
                        }
                        else if (_t_result.isSibling) {
                            var chis = _this.childNodes;
                            var i;
                            result.arr = _t_result.firstNode.getChildsHelp(dearObj.miniElementType);
                            for (i = 0; i < chis.length && chis[i] != _t_result.firstNode; i++);
                            for (i++; i < chis.length && chis[i] != _t_result.secondNode; i++) {
                                result.arr.merge(chis[i].getChildsHelp(dearObj.miniElementType));
                            }
                            result.arr.merge(_t_result.secondNode.getChildsHelp(dearObj.miniElementType));
                        }
                        else {
                            var i,
                                chis;
                            _this = _t_result.commonParent;
                            _t_result.firstList.pop();
                            dearObj.firstChild = _t_result.firstList.pop();
                            _t_result.firstList.push(dearObj.firstChild);
                            _t_result.secondList.pop();
                            dearObj.lastChild = _t_result.secondList.pop();
                            _t_result.secondList.push(dearObj.lastChild);
                            chis = _this.childNodes;
                            result.arr = dearObj.firstChild.getChilds({
                                    childList : _t_result.firstList,
                                    getDir : "down",
                                    miniElementType: dearObj.miniElementType
                                }).arr;
                            for (i = 0; i < chis.length && chis[i] != dearObj.firstChild; i++);
                            for (i++; i < chis.length && chis[i] != dearObj.lastChild; i++) {
                                if (_target.outLabel.includes(chis[i].nodeName.toLowerCase())) {
                                    result.arr.push(chis[i]);
                                } else {
                                    result.arr.merge(chis[i].getChildsHelp(dearObj.miniElementType));
                                }
                            }
                            result.arr.merge(dearObj.lastChild.getChilds({
                                childList : _t_result.secondList,
                                getDir : "up",
                                miniElementType: dearObj.miniElementType
                            }).arr);
                        }
                    } else {
                        result.statue = false;
                        result.err = new Error("getCommonParent statue is false");
                    }
                } else if (dearObj.childList) {
                    // childList should be exist  but getDir is not
                    var dir = 1;
                    if (!dearObj.getDir) {
                        dir = 1;
                    } else {
                        // is up dir = 1 else is down dir = -1 neither dir = 1
                        dir = (dearObj.getDir == "up") ? 1 : (dearObj.getDir == "down") ? -1 : 1;
                    }
                    var _result = [],
                        chis,
                        curChi,
                        index;
                    curChi = dearObj.childList.pop();
                    if (curChi == _this) {
                        curChi = dearObj.childList.pop();
                    }
                    chis = _this.childNodes;
                    index = (dir + 1) ? 0 : chis.length - 1;
                    while (curChi) {
                        for (; chis[index] != curChi && index > -1 && index < chis.length; index += dir) {
                            _result = [];
                            if (_target.outLabel.includes(chis[index].nodeName.toLowerCase())) {
                                _result.push(chis[index]);
                            } else {
                                _result = chis[index].getChildsHelp(dearObj.miniElementType);
                            }
                            if (dir + 1) {
                                result.arr.merge(_result);
                            } else {
                                _result.merge(result.arr);
                                result.arr = _result;
                            }
                        }
                        _this = curChi;
                        chis = _this.childNodes;
                        curChi = dearObj.childList.pop();
                        index = (dir + 1) ? 0 : chis.length - 1;
                    }
                    _result = _this.getChildsHelp(dearObj.miniElementType);
                    if (dir + 1) {
                        result.arr.merge(_result);
                    } else {
                        _result.merge(result.arr);
                        result.arr = _result;
                    }
                } else {
                    // none of them
                    result.arr = _this.getChildsHelp(dearObj.miniElementType);
                }
                return result;
            }
        }

        if (!_target.HTMLElement.prototype.getChildsHelp) {
            _target.HTMLElement.prototype.getChildsHelp = function (miniElementType, isDebug) {
                console.log("getChildHelp");
                var result = [],
                    chis,
                    curChi,
                    index = 0,
                    label = [0],
                    _this = this;
                if (isDebug) {
                    console.log("in");
                    return isDebug;
                }
                if (miniElementType instanceof Array) {
                } else if (typeof miniElementType === "object") {
                    var t = miniElementType;
                    miniElementType = [];
                    for (var i in t) {
                        if (typeof t[i] == "string") {
                            miniElementType.push(t[i]);
                        }
                    }
                } else {
                    miniElementType = _target.chiLabel;
                }
                miniElementType.merge(_target.outLabel,true)
                chis = _this.childNodes;
                if (chis.length == 0) {
                    result.push(_this);
                    index = -1;
                }
                while (index >= 0) {
                    curChi = chis[label[index]];
                    if (curChi) {
                        if (miniElementType.includes(curChi.nodeName.toLowerCase())) {
                            result.push(curChi);
                            label[index]++;
                        } else {
                            label[index]++;
                            index++;
                            label.push(0);
                            chis = curChi.childNodes;
                            if (chis.length) { }
                            else {
                                result.push(curChi);
                                index--;
                                label.pop();
                                chis = curChi.parentElement.childNodes;
                            }
                        }
                    } else {
                        index--;
                        label.pop();
                        chis = chis[0].parentElement.parentElement.childNodes;
                    }
                }
                return result;
            }
        }

        /*  只能查找同层元素
        if (!_target.selectionNodes) {
            _target.selectedNodes = [];
        }
        if (_target.onmousedown) {
            _target.onmousedown.copy = _target.onmousedown;
        } else {
            _target.onmousedown.copy = function () { };
        }
        _target.onmousedown = function () {
            var firstNode;
            var lastNode;
            _target.onmousedown.copy;
            _target.selectedNodes = [];
            if (_target.event.button == "2") {
                var sel = _target.getSelection();
                console.log("youjian" + sel);
                lastNode = sel.focusNode.parentElement
                firstNode = sel.anchorNode.parentElement
                if (lastNode != firstNode) {
                    _target.selectedNodes.push(lastNode);
                }
                while (firstNode != lastNode) {
                    _target.selectedNodes.push(firstNode);
                    firstNode = firstNode.nextSibling;
                }
            }
            return _target.selectedNodes;
        }
        */
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

