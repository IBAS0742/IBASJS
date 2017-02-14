var ibasFile = (function(tar){
	var target = getTar(tar),
		tarDiv;
	function getTar(tar){
		if (tar instanceof Element) {
			return tar;
		} else if (tar instanceof Array) {
			if (tar.length > 0) {
				return getTar(tar[0]);
			}
		} else if ((typeof '').toLowerCase() === 'string') {
			if (tar[0] == '.') {
				//class
				return document.getElementsByClassName(tar.substr(1))[0];
			} else if (tar[0] == '#') {
				//id
				return document.getElementById(tar.substr(1));
			} else {
				//ele tag name
				return document.getElementsByTagName(tar)[0];
			}
		}
		throw new Error('未能找到元素');
		return null;
	};
	function check() {
		//判断是否为input元素
		if (a.tagName.toLowerCase() === 'input') {
			//判断是否为file类型
			if (a.getAttribute('type').toLowerCase() === 'file') {
				return true;
			}
		}
		return false;
	};
	if (target == null) {
		return null;
	} else {
		if (check()) {
			return (function(){
				var targetEle = target,
					topDiv = tarDiv,
					chiDiv = [],
					defaultLanguage = {
						clickToSelectFile : 'Click To Select File',
						reSelect : 're-select'
					},
					typeRegx = /\.[a-zA-Z0-9]+/;
				//仅仅允许三种形式
				//types = ['*.txt','*.jpg']
				//types = ['txt','jpg']
				//types = '*.txt,*.jpg';
				var setFileTypeLimit = function(types) {
					if (types instanceof Array) {
						if (types.length > 0) {
							if (typeRegx.exec(types[0]) != null) {
								if (typeRegx.exec(types[0]).join() === types[0]) {
									targetEle.accept = types.join(',');
								}
							} else {
								targetEle.accept = '.' + types.join(',.');
							}
						}
					} else {
						targetEle.accept = types;
					}
				};
				var setLanguage = function(obj) {
					for (var i in obj) {
						defaultLanguage[i] = obj[i];
					}
				}
				function init() {
					//新建元素
					topDiv = domUtil.newEle('div');
					topDiv.classList.add('ibas-file-div');
					topDiv.onclick = function() {
						targetEle.click();
						event.stopPropagation();
					};
					chiDiv.push(domUtil.newEle('div'));	//	第一个为未选择文件时的提示
					chiDiv.push(domUtil.newEle('div'));	//	第二个为选中文件后的文件列表
					chiDiv[1].onclick = function() {
						//阻止事件冒泡
						event.stopPropagation();
					};
					//隐藏第二个元素
					chiDiv[1].style.display = 'none';
					//为第一个元素添加子元素
					var chiDivIcon = domUtil.newEle('div');
					chiDivIcon.classList.add('glyphicon','glyphicon-folder-open','ibas-file-tip','text-center');
					var chiDivText = domUtil.newEleWithConeten('div',defaultLanguage.clickToSelectFile);
					chiDivText.classList.add('text-center');
					//将元素添加到dom中
					if (targetEle.nextSibling) {
						targetEle.parentElement.insertBefore(topDiv,targetEle.nextSibling);
					} else {
						targetEle.parentElement.appendChild(topDiv);
					}
					topDiv.appendChild(chiDiv[0]);
					topDiv.appendChild(chiDiv[1]);
					chiDiv[0].appendChild(chiDivIcon);
					chiDiv[0].appendChild(chiDivText);
					targetEle.onchange = function() {
						var files = this.files;
						//删除1中的所有元素
						var ele = chiDiv[1].children,
							len = ele.length;
						for (var i = 0;i < len;i++) {
							chiDiv[1].removeChild(ele[0]);
						}
						if (files.length > 0) {
							chiDiv[0].style.display = 'none';
							chiDiv[1].style.display = 'block';
							//在1中新建元素
							var span = domUtil.newEleWithConeten('span',defaultLanguage.reSelect);
							span.classList.add('glyphicon','glyphicon-share-alt','ibas-file-span');
							var t = this;
							span.onclick = function () {
								t.click();
							};
							chiDiv[1].appendChild(span);
							for (var i = 0;i < files.length;i++) {
								var tspan = domUtil.newEleWithConeten('span',targetEle.files[i].name);
								tspan.classList.add('glyphicon','glyphicon-file','ibas-file-item','ibas-file-span');
								chiDiv[1].appendChild(tspan);
							}
						} else {
							chiDiv[1].style.display = 'none';
							chiDiv[0].style.display = 'block';
						}
					}
				};
				
				return {
					targetEle : targetEle,
					topDiv : topDiv,
					init : init,
					setFileTypeLimit : setFileTypeLimit,
					setLanguage : setLanguage
				}
			})();
		} else {
			throw new Error(target + ' is not input element or type is not file .');
			return null;
		}
	}
});