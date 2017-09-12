"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderedHelper = function () {
    function RenderedHelper(arr) {
        _classCallCheck(this, RenderedHelper);

        this.__arr = arr || [];
    }

    _createClass(RenderedHelper, [{
        key: "replaceNullPush",
        value: function replaceNullPush(now, old) {
            if (!old) {
                now.__renderedHelperTag = "" + this.__arr.length;
                this.__arr.push(now);
            } else {
                if (this.__arr[old.__renderedHelperTag] === old) {
                    now.__renderedHelperTag = old.__renderedHelperTag;
                    this.__arr[now.__renderedHelperTag] = now;
                } else {
                    now.__renderedHelperTag = "" + this.__arr.length;
                    this.__arr.push(now);
                }
            }
        }
    }, {
        key: "slice",
        value: function slice(start, end) {
            return this.__arr.slice(start, end);
        }
    }, {
        key: "getInnerArr",
        value: function getInnerArr() {
            return this.__arr;
        }
    }]);

    return RenderedHelper;
}();

exports.default = RenderedHelper;