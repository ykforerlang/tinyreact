'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diffObject = diffObject;
exports.getDOM = getDOM;

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diffObject(leftProps, rightProps) {
    var onlyInLeft = {};
    var bothLeft = {};
    var bothRight = {};
    var onlyInRight = {};

    for (var key in leftProps) {
        if (rightProps[key] === undefined) {
            onlyInLeft[key] = leftProps[key];
        } else {
            bothLeft[key] = leftProps[key];
            bothRight[key] = rightProps[key];
        }
    }

    for (var _key in rightProps) {
        if (leftProps[_key] === undefined) {
            onlyInRight[_key] = rightProps[_key];
        }
    }

    return {
        onlyInRight: onlyInRight,
        onlyInLeft: onlyInLeft,
        bothIn: {
            left: bothLeft,
            right: bothRight
        }
    };
} /**
   * Created by apple on 2017/8/30.
   */
function getDOM(comp) {
    var rendered = comp.__rendered;
    while (rendered instanceof _Component2.default) {
        //判断对象是否是dom
        rendered = rendered.__rendered;
    }
    return rendered;
}