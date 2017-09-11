"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderVDOM;
/**
 * Created by apple on 2017/8/21.
 */
function renderVDOM(vnode) {
    if (typeof vnode == "string") {
        return vnode;
    } else if (typeof vnode.nodeName == "string") {
        var result = {
            nodeName: vnode.nodeName,
            props: vnode.props,
            children: []
        };
        for (var i = 0; i < vnode.children.length; i++) {
            result.children.push(renderVDOM(vnode.children[i]));
        }
        return result;
    } else if (typeof vnode.nodeName == "function") {
        var func = vnode.nodeName;
        var inst = new func(vnode.props);
        var innerVnode = func.prototype.render.call(inst);
        return renderVDOM(innerVnode);
    }
}