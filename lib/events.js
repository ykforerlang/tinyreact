'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
var supportEventType = ['keydown', 'keypress', 'keyup', 'click', 'mouseenter', 'mouseover', 'mousemove', 'change'];

function getSyntheticEvent(e) {
    e.stopPropagation = function () {
        e.__notup = true; // 不冒泡
    };
    return e;
}

function getRelatedDOMList(e) {
    var path = e.path || e.deepPath;
    if (path) return path;

    var result = [];

    var node = e.target;
    while (node !== window.document) {

        result.push(node);
        node = node.parentNode;
    }

    return result;
}

function superHandle(e) {

    var syntheticEvent = getSyntheticEvent(e);

    var domList = getRelatedDOMList(e);
    console.log('domList:', domList);

    var eventType = e.type;

    for (var i = domList.length - 1; i >= 0; i--) {
        // 捕获期
        var eleDom = domList[i];

        if (!eleDom.__events) break;

        var handle = eleDom.__events[eventType + 'Capture'];
        handle && handle(syntheticEvent);
    }

    for (var _i = 0; _i < domList.length; _i++) {
        // 冒泡期
        var _eleDom = domList[_i];

        if (!_eleDom.__events) break;

        var _handle = _eleDom.__events[eventType];
        _handle && _handle(syntheticEvent);
        if (syntheticEvent.__notup) {
            break;
        }
    }
}

function init() {
    supportEventType.forEach(function (eventType) {
        document.addEventListener(eventType, superHandle);
    });
}