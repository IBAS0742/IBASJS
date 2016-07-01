// JavaScript source code

onmessage = function (evt) {
    if (evt.data[0] == "deepClone") {
        return evt.data[1].deepClonesHelp();
    }
}
