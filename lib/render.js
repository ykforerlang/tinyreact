'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by apple on 2017/8/21.
                                                                                                                                                                                                                                                                               */


exports.default = render;
exports.renderInner = renderInner;

var _util = require('./util');

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _events = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 */
function render(vnode, parent) {
    parent.__rendered = [];

    //events init
    (0, _events.init)();

    renderInner(vnode, parent, null, null, 0);
}

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddomOrComp  老的dom/组件实例
 * @param myIndex 在dom节点的位置
 */
function renderInner(vnode, parent, comp, olddomOrComp, myIndex) {
    var dom = void 0;
    if (typeof vnode === "string" || typeof vnode === "number") {
        if (olddomOrComp && olddomOrComp.splitText) {
            if (olddomOrComp.nodeValue !== vnode) {
                olddomOrComp.nodeValue = vnode;
            }
        } else {
            if (olddomOrComp) {
                recoveryComp(olddomOrComp);
            }

            dom = document.createTextNode(vnode);
            parent.__rendered[myIndex] = dom; //comp 一定是null

            setNewDom(parent, dom, myIndex);
        }
    } else if (typeof vnode.nodeName === "string") {
        if (!olddomOrComp || olddomOrComp.nodeName !== vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddomOrComp, myIndex);
        } else {
            diffDOM(vnode, parent, comp, olddomOrComp, myIndex);
        }
    } else if (typeof vnode.nodeName === "function") {
        var func = vnode.nodeName;
        var inst = void 0;
        if (olddomOrComp && olddomOrComp instanceof func) {
            inst = olddomOrComp;
            inst.componentWillReceiveProps && inst.componentWillReceiveProps(vnode.props);

            var shoudUpdate = void 0;
            if (inst.shouldComponentUpdate) {
                shoudUpdate = inst.shouldComponentUpdate(vnode.props, olddomOrComp.state);
            } else {
                shoudUpdate = true;
            }

            shoudUpdate && inst.componentWillUpdate && inst.componentWillUpdate(vnode.props, olddomOrComp.state);
            inst.props = vnode.props;

            if (!shoudUpdate) {
                return; // do nothing just return
            }
        } else {
            if (olddomOrComp) {
                recoveryComp(olddomOrComp);
            }

            inst = new func(vnode.props);
            inst.componentWillMount && inst.componentWillMount();

            if (comp) {
                comp.__rendered = inst;
            } else {
                parent.__rendered[myIndex] = inst;
            }
        }

        var innerVnode = inst.render();
        renderInner(innerVnode, parent, inst, inst.__rendered, myIndex);

        if (olddomOrComp && olddomOrComp instanceof func) {
            inst.componentDidUpdate && inst.componentDidUpdate();
        } else {
            inst.componentDidMount && inst.componentDidMount();
        }
    }
}

/**
 * 替换新的Dom， 如果没有在最后插入
 * @param parent
 * @param newDom
 * @param myIndex
 */
function setNewDom(parent, newDom, myIndex) {
    var old = parent.childNodes[myIndex];
    if (old) {
        parent.replaceChild(newDom, old);
    } else {
        parent.appendChild(newDom);
    }
}

function setAttrs(dom, props) {
    var allKeys = Object.keys(props);
    allKeys.forEach(function (k) {
        var v = props[k];

        if (k == "className") {
            dom.setAttribute("class", v);
            return;
        }

        if (k == "value") {
            dom.value = v;
            return;
        }

        if (k == "style") {
            if (typeof v == "string") {
                dom.style.cssText = v; //IE
            }

            if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) == "object") {
                for (var i in v) {
                    dom.style[i] = v[i];
                }
            }
            return;
        }

        if (k[0] == "o" && k[1] == "n") {

            var key = k.substring(2, 3).toLowerCase() + k.substring(3);
            dom.__events[key] = v;
            return;
        }

        dom.setAttribute(k, v);
    });
}

function removeAttrs(dom, props) {
    for (var k in props) {
        if (k == "className") {
            dom.removeAttribute("class");
            continue;
        }

        if (k == "value") {
            dom.value = "";
            continue;
        }

        if (k == "style") {
            dom.style.cssText = ""; //IE
            continue;
        }

        if (k[0] == "o" && k[1] == "n") {
            var key = k.substring(2, 3).toLowerCase() + k.substring(3);
            dom.__events[key] = null;
            continue;
        }

        dom.removeAttribute(k);
    }
}

/**
 *  调用者保证newProps 与 oldProps 的keys是相同的
 * @param dom
 * @param newProps
 * @param oldProps
 */
function diffAttrs(dom, newProps, oldProps) {
    for (var k in newProps) {
        var v = newProps[k];
        var ov = oldProps[k];
        if (v === ov) continue;

        if (k == "className") {
            dom.setAttribute("class", v);
            continue;
        }

        if (k == "value") {
            dom.value = v;
            continue;
        }

        if (k == "style") {
            if (typeof v == "string") {
                dom.style.cssText = v;
            } else if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) == "object" && (typeof ov === 'undefined' ? 'undefined' : _typeof(ov)) == "object") {
                for (var vk in v) {
                    if (v[vk] !== ov[vk]) {
                        dom.style[vk] = v[vk];
                    }
                }

                for (var ovk in ov) {
                    if (v[ovk] === undefined) {
                        dom.style[ovk] = "";
                    }
                }
            } else {
                //typeof v == "object" && typeof ov == "string"
                dom.style = {};
                for (var _vk in v) {
                    dom.style[_vk] = v[_vk];
                }
            }
            continue;
        }

        if (k[0] == "o" && k[1] == "n") {
            var key = k.substring(2, 3).toLowerCase() + k.substring(3);
            dom.__events[key] = v;
            continue;
        }

        dom.setAttribute(k, v);
    }
}

function createNewDom(vnode, parent, comp, olddomOrComp, myIndex) {
    if (olddomOrComp) {
        recoveryComp(olddomOrComp);
    }

    var dom = document.createElement(vnode.nodeName);

    dom.__rendered = [];
    dom.__vnode = vnode;
    dom.__myIndex = myIndex; // 方便 getDOMIndex 方法
    dom.__events = {};

    if (comp) {
        comp.__rendered = dom;
    } else {
        parent.__rendered[myIndex] = dom;
    }

    setAttrs(dom, vnode.props);

    setNewDom(parent, dom, myIndex);

    for (var i = 0; i < vnode.children.length; i++) {
        renderInner(vnode.children[i], dom, null, null, i);
    }
}

function diffDOM(vnode, parent, comp, olddom) {
    var _diffObject = (0, _util.diffObject)(vnode.props, olddom.__vnode.props),
        onlyInLeft = _diffObject.onlyInLeft,
        bothIn = _diffObject.bothIn,
        onlyInRight = _diffObject.onlyInRight;

    setAttrs(olddom, onlyInLeft);
    removeAttrs(olddom, onlyInRight);
    diffAttrs(olddom, bothIn.left, bothIn.right);

    var willRemoveArr = olddom.__rendered.slice(vnode.children.length);
    var renderedArr = olddom.__rendered.slice(0, vnode.children.length);
    olddom.__rendered = renderedArr;
    for (var i = 0; i < vnode.children.length; i++) {
        renderInner(vnode.children[i], olddom, null, renderedArr[i], i);
    }

    willRemoveArr.forEach(function (element) {
        recoveryComp(element);
        olddom.removeChild((0, _util.getDOM)(element));
    });

    olddom.__vnode = vnode;
}

function recoveryComp(comp) {
    if (comp instanceof _Component2.default) {
        comp.componentWillUnmount && comp.componentWillUnmount();
        recoveryComp(comp.__rendered);
    } else if (comp.__rendered instanceof Array) {
        comp.__rendered.forEach(function (element) {
            recoveryComp(element);
        });
    } else {
        // do nothing
    }
}