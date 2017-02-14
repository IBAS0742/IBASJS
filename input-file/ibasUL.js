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
		throw new Error('δ���ҵ�Ԫ��');
		return null;
	};
	function check() {
		//�ж��Ƿ�ΪinputԪ��
		if (a.tagName.toLowerCase() === 'input') {
			//�ж��Ƿ�Ϊfile����
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
				//��������������ʽ
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
					//�½�Ԫ��
					topDiv = domUtil.newEle('div');
					topDiv.classList.add('ibas-file-div');
					topDiv.onclick = function() {
						targetEle.click();
						event.stopPropagation();
					};
					chiDiv.push(domUtil.newEle('div'));	//	��һ��Ϊδѡ���ļ�ʱ����ʾ
					chiDiv.push(domUtil.newEle('div'));	//	�ڶ���Ϊѡ���ļ�����ļ��б�
					chiDiv[1].onclick = function() {
						//��ֹ�¼�ð��
						event.stopPropagation();
					};
					//���صڶ���Ԫ��
					chiDiv[1].style.display = 'none';
					//Ϊ��һ��Ԫ�������Ԫ��
					var chiDivIcon = domUtil.newEle('div');
					chiDivIcon.classList.add('glyphicon','glyphicon-folder-open','ibas-file-tip','text-center');
					var chiDivText = domUtil.newEleWithConeten('div',defaultLanguage.clickToSelectFile);
					chiDivText.classList.add('text-center');
					//��Ԫ����ӵ�dom��
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
						//ɾ��1�е�����Ԫ��
						var ele = chiDiv[1].children,
							len = ele.length;
						for (var i = 0;i < len;i++) {
							chiDiv[1].removeChild(ele[0]);
						}
						if (files.length > 0) {
							chiDiv[0].style.display = 'none';
							chiDiv[1].style.display = 'block';
							//��1���½�Ԫ��
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