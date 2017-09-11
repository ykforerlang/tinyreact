'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createElement;
/**
 * Created by apple on 2017/7/16.
 */

/**
 *
 * @param comp func or div/p/span/..
 * @param props {}
 * @param children
 */
function createElement(comp, props) {
    var children = [];

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'boolean' || args[i] === undefined || args === null) continue;
        if (args[i] instanceof Array) {
            children = children.concat(args[i]);
        } else {
            children.push(args[i]);
        }
    }

    return {
        nodeName: comp,
        props: props || {},
        children: children
    };
}