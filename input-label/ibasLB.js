var ibasLabel = (function(tar){
	var target = domUtil.getTar(tar);
	function check(tar) {
		//�ж��Ƿ�ΪinputԪ��
		if (target.tagName.toLowerCase() === 'input') {
			//�ж��Ƿ�Ϊtext����
			if (target.getAttribute('type').toLowerCase() === 'text') {
				return true;
			}
		}
		return false;
	};
	if (target == null) {
		throw new Error(target + ' is null.');
	} else {
		if (check()) {
			return (function(){
				var targetEle = target,
					vinput,
					topDiv,
					arr = [],
					cot = 0,
					labelLength = 6,
					defalutLanguage = {
						limitLength : '��ǩ�ĳ��Ȳ��ܳ���%���ֽ�.',
						lessThanMinLen : '��ǩ�ĳ���̫С'
					};
				var setLabelLength = function(len_) {
					if (len_ < 1) {
						throw new Error(defalutLanguage.lessThanMinLen);
					}
				};
				var setLanguage = function(obj) {
					for (var i in obj) {
						defalutLanguage[i] = obj[i];
					}
				}
				var init = function() {
					topDiv = domUtil.newEle('div');
					vinput = domUtil.newEle('input');
					vinput.name = targetEle.name;
					vinput.style.visibility = 'hidden';
					vinput.style.display = 'none';
					targetEle.name = '';
					topDiv.classList.add('ibas-label-div');
					targetEle.beforeInsert(vinput);
					targetEle.insertMid(topDiv);
					targetEle.onkeypress = inputInput;
				};
				var inputInput = function(e){
					if (e.keyCode == 13) {
						//�س�����ʱ���½�һ����ǩ
						newLabel(this.value);
						this.value = '';
					}
				};
				var newLabel = function(text_) {
					if (text_ == '') {
						return ;
					}
					if (text_.length > labelLength) {
						alert(
							defalutLanguage.limitLength.replace('%',labelLength)
						);
						return;
					}
					if (!arr.pushExt(text_,1)) {
						return;
					}
					var labelDiv = domUtil.newEle('div');
					var labelSpan = domUtil.newEleWithConten('span',text_);
					var closeSpan = domUtil.newEleWithConten('span','x');
					labelDiv.index = cot;
					cot++;
					labelDiv.classList.add('ibas-label-cdiv');
					labelSpan.classList.add('ibas-label-label');
					closeSpan.classList.add('ibas-label-btn-close');
					//topDiv.appendChild(labelDiv);
					targetEle.beforeInsert(labelDiv);
					labelDiv.appendChild(labelSpan);
					labelDiv.appendChild(closeSpan);
					closeSpan.onclick = closeSpanClick;
					vinput.value = arr.joinExt(',',2);
				};
				var closeSpanClick = function() {
					//console.log(this.parentElement);
					arr[this.parentElement.index] = '';
					topDiv.removeChild(this.parentElement);
					vinput.value = arr.joinExt(',',2);
				};
				var showValue = function() {
					console.log(vinput.value);
				};
				return {
					init : init,
					newLabel : newLabel,
					showValue : showValue,
					setLabelLength : setLabelLength,
					setLanguage : setLanguage
				};
			})();
		} else {
			throw new Error('Something is error.');
		}
	}
});