/**
 * Created by IBAS on 2017/2/14.
 */

var ibasHtmlExt = (function() {
    function afterInsert () {
        if (!Element.prototype.insertAfter) {
            Element.prototype.insertAfter = function(tar) {
                var ele = this;
                if (ele.parentElement) {
                    if (ele.nextSibling) {
                        ele.parentElement.insertBefore(tar,ele.nextSibling);
                    } else {
                        ele.parentElement.appendChild(tar);
                    }
                } else {
                    throw new Error(ele + " have not parrent element.");
                }
            }
        }
    }
    return {
        afterInsert : afterInsert
    }
})();
