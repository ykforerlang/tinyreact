/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RenderedHelper__ = __webpack_require__(3);
/**
 * Created by apple on 2017/8/21.
 */



/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddomOrComp  老的dom/组件实例
 */
function render(vnode, parent, comp, olddomOrComp) {
    let dom;
    if (typeof vnode === "string" || typeof vnode === "number") {
        if (olddomOrComp && olddomOrComp.splitText) {
            if (olddomOrComp.nodeValue !== vnode) {
                olddomOrComp.nodeValue = vnode;
            }
        } else {
            dom = document.createTextNode(vnode);
            parent.__rendered.replaceNullPush(dom, olddomOrComp); //comp 一定是null

            if (olddomOrComp) {
                parent.replaceChild(dom, Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* getDOM */])(olddomOrComp));
            } else {
                parent.appendChild(dom);
            }
        }
    } else if (typeof vnode.nodeName === "string") {
        if (!olddomOrComp || olddomOrComp.nodeName !== vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddomOrComp);
        } else {
            diffDOM(vnode, parent, comp, olddomOrComp);
        }
    } else if (typeof vnode.nodeName === "function") {
        let func = vnode.nodeName;
        let inst;
        if (olddomOrComp && olddomOrComp instanceof func) {
            inst = olddomOrComp;
            inst.props = vnode.props;
        } else {
            inst = new func(vnode.props);

            if (comp) {
                comp.__rendered = inst;
            } else {
                parent.__rendered.replaceNullPush(inst, olddomOrComp);
            }
        }

        let innerVnode = inst.render();
        render(innerVnode, parent, inst, inst.__rendered);
    }
}

function setAttrs(dom, props) {
    const allKeys = Object.keys(props);
    allKeys.forEach(k => {
        const v = props[k];

        if (k == "className") {
            dom.setAttribute("class", v);
            return;
        }

        if (k == "style") {
            if (typeof v == "string") {
                dom.style.cssText = v; //IE
            }

            if (typeof v == "object") {
                for (let i in v) {
                    dom.style[i] = v[i];
                }
            }
            return;
        }

        if (k[0] == "o" && k[1] == "n") {
            const capture = k.indexOf("Capture") != -1;
            dom.addEventListener(k.substring(2).toLowerCase(), v, capture);
            return;
        }

        dom.setAttribute(k, v);
    });
}

function removeAttrs(dom, props) {
    for (let k in props) {
        if (k == "className") {
            dom.removeAttribute("class");
            continue;
        }

        if (k == "style") {
            dom.style.cssText = ""; //IE
            continue;
        }

        if (k[0] == "o" && k[1] == "n") {
            const capture = k.indexOf("Capture") != -1;
            const v = props[k];
            dom.removeEventListener(k.substring(2).toLowerCase(), v, capture);
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
    for (let k in newProps) {
        let v = newProps[k];
        let ov = oldProps[k];
        if (v === ov) continue;

        if (k == "className") {
            dom.setAttribute("class", v);
            continue;
        }

        if (k == "style") {
            if (typeof v == "string") {
                dom.style.cssText = v;
            } else if (typeof v == "object" && typeof ov == "object") {
                for (let vk in v) {
                    if (v[vk] !== ov[vk]) {
                        dom.style[vk] = v[vk];
                    }
                }

                for (let ovk in ov) {
                    if (v[ovk] === undefined) {
                        dom.style[ovk] = "";
                    }
                }
            } else {
                //typeof v == "object" && typeof ov == "string"
                dom.style = {};
                for (let vk in v) {
                    dom.style[vk] = v[vk];
                }
            }
            continue;
        }

        if (k[0] == "o" && k[1] == "n") {
            const capture = k.indexOf("Capture") != -1;
            let eventKey = k.substring(2).toLowerCase();
            dom.removeEventListener(eventKey, ov, capture);
            dom.addEventListener(eventKey, v, capture);
            continue;
        }

        dom.setAttribute(k, v);
    }
}

function createNewDom(vnode, parent, comp, olddomOrComp) {
    let dom = document.createElement(vnode.nodeName);

    dom.__rendered = new __WEBPACK_IMPORTED_MODULE_1__RenderedHelper__["a" /* default */]();
    dom.__vnode = vnode;

    if (comp) {
        comp.__rendered = dom;
    } else {
        parent.replaceNullPush(dom, olddomOrComp);
    }

    setAttrs(dom, vnode.props);

    if (olddomOrComp) {
        parent.replaceChild(dom, Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* getDOM */])(olddomOrComp));
    } else {
        parent.appendChild(dom);
    }

    for (let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], dom, null, null);
    }
}

function diffDOM(vnode, parent, comp, olddom) {
    const { onlyInLeft, bothIn, onlyInRight } = Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* diffObject */])(vnode.props, olddom.__vnode.props);
    setAttrs(olddom, onlyInLeft);
    removeAttrs(olddom, onlyInRight);
    diffAttrs(olddom, bothIn.left, bothIn.right);

    olddom.__rendered.slice(vnode.children.length).forEach(element => {
        olddom.removeChild(Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* getDOM */])(element));
    });

    const __renderedArr = olddom.__rendered.slice(0, vnode.children.length);
    olddom.__rendered = new __WEBPACK_IMPORTED_MODULE_1__RenderedHelper__["a" /* default */](__renderedArr);
    for (let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, __renderedArr[i]);
    }
    olddom.__vnode = vnode;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(0);

var _render2 = _interopRequireDefault(_render);

var _Component3 = __webpack_require__(4);

var _Component4 = _interopRequireDefault(_Component3);

var _createElement = __webpack_require__(5);

var _createElement2 = _interopRequireDefault(_createElement);

var _RenderedHelper = __webpack_require__(6);

var _RenderedHelper2 = _interopRequireDefault(_RenderedHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 由于Component 是es6写法的class， 放在项目外。导入babel不会处理


var TestApp = function (_Component) {
    _inherits(TestApp, _Component);

    function TestApp(props) {
        _classCallCheck(this, TestApp);

        var _this = _possibleConstructorReturn(this, (TestApp.__proto__ || Object.getPrototypeOf(TestApp)).call(this, props));

        console.log("TestApp constructor");
        return _this;
    }

    _createClass(TestApp, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log("TestApp componentWillMount");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log("TestApp componentDidMount");
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("TestApp componentWillReceiveProps");
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log("TestApp shouldComponentUpdate", nextProps, nextState);
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("TestApp componentWillUpdate");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log("TestApp componentDidUpdate");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("TestApp componentWillUnmount");
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("TestApp render...");
            return (0, _createElement2.default)(
                'div',
                null,
                'TestApp'
            );
        }
    }]);

    return TestApp;
}(_Component4.default);

/// app1

var App1 = function (_Component2) {
    _inherits(App1, _Component2);

    function App1() {
        _classCallCheck(this, App1);

        return _possibleConstructorReturn(this, (App1.__proto__ || Object.getPrototypeOf(App1)).apply(this, arguments));
    }

    _createClass(App1, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return (0, _createElement2.default)(
                'div',
                { onClick: function onClick(e) {
                        _this3.setState({});
                    } },
                (0, _createElement2.default)(TestApp, null)
            );
        }
    }]);

    return App1;
}(_Component4.default);

var root = document.getElementById("root");
root.__rendered = new _RenderedHelper2.default();
(0, _render2.default)((0, _createElement2.default)(App1, null), root);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = diffObject;
/* harmony export (immutable) */ __webpack_exports__["b"] = getDOM;
/**
 * Created by apple on 2017/8/30.
 */
function diffObject(leftProps, rightProps) {
    const onlyInLeft = {};
    const bothLeft = {};
    const bothRight = {};
    const onlyInRight = {};

    for (let key in leftProps) {
        if (rightProps[key] === undefined) {
            onlyInLeft[key] = leftProps[key];
        } else {
            bothLeft[key] = leftProps[key];
            bothRight[key] = rightProps[key];
        }
    }

    for (let key in rightProps) {
        if (leftProps[key] === undefined) {
            onlyInRight[key] = rightProps[key];
        }
    }

    return {
        onlyInRight,
        onlyInLeft,
        bothIn: {
            left: bothLeft,
            right: bothRight
        }
    };
}

function getDOM(comp) {
    let rendered = comp.__rendered;
    while (rendered instanceof Component) {
        //判断对象是否是dom
        rendered = rendered.__rendered;
    }
    return rendered;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RenderedHelper {
    constructor(arr) {
        this.__arr = arr || [];
    }

    replaceNullPush(now, old) {
        if (!old) {
            now.__renderedHelperTag = `${this.__arr.length}`;
            this.__arr.push(now);
        } else {
            if (this.__arr[old.__renderedHelperTag] === old) {
                now.__renderedHelperTag = old.__renderedHelperTag;
                this.__arr[now.__renderedHelperTag] = now;
            } else {
                now.__renderedHelperTag = `${this.__arr.length}`;
                this.__arr.push(now);
            }
        }
    }

    slice(start, end) {
        return this.__arr.slice(start, end);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderedHelper;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by apple on 2017/7/20.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _render = __webpack_require__(0);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component(props) {
        _classCallCheck(this, Component);

        this.props = props;
    }

    _createClass(Component, [{
        key: 'setState',
        value: function setState(state) {
            var _this = this;

            setTimeout(function () {
                _this.state = state;
                var vnode = _this.render();
                var olddom = getDOM(_this);
                (0, _render2.default)(vnode, olddom.parentNode, _this, _this.__rendered);
            }, 0);
        }
    }]);

    return Component;
}();

exports.default = Component;


function getDOM(comp) {
    var rendered = comp.__rendered;
    while (rendered instanceof Component) {
        //判断对象是否是dom
        rendered = rendered.__rendered;
    }
    return rendered;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = createElement;
/**
 * Created by apple on 2017/7/16.
 */

/**
 *
 * @param comp func or div/p/span/..
 * @param props {}
 * @param children
 */
function createElement(comp, props, ...args) {
    let children = [];
    for (let i = 0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            children = children.concat(args[i]);
        } else {
            children.push(args[i]);
        }
    }

    return {
        nodeName: comp,
        props: props || {},
        children
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
    }]);

    return RenderedHelper;
}();

exports.default = RenderedHelper;

/***/ })
/******/ ]);