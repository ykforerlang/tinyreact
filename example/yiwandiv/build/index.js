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
/**
 * Created by apple on 2017/8/21.
 */

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddom  老的dom
 */
function render(vnode, parent, comp, olddom) {
    let dom;
    if (typeof vnode == "string" || typeof vnode == "number") {
        if (olddom && olddom.splitText) {
            if (olddom.nodeValue !== vnode) {
                olddom.nodeValue = vnode;
            }
        } else {
            dom = document.createTextNode(vnode);
            if (olddom) {
                parent.replaceChild(dom, olddom);
            } else {
                parent.appendChild(dom);
            }
        }
    } else if (typeof vnode.nodeName == "string") {
        if (!olddom || olddom.nodeName != vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddom);
        } else {
            diffDOM(vnode, parent, comp, olddom);
        }
    } else if (typeof vnode.nodeName == "function") {
        let func = vnode.nodeName;
        let inst = new func(vnode.props);

        comp && (comp.__rendered = inst);

        let innerVnode = func.prototype.render.call(inst);
        render(innerVnode, parent, inst, olddom);
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

function createNewDom(vnode, parent, comp, olddom) {
    let dom = document.createElement(vnode.nodeName);

    dom.__vnode = vnode;
    comp && (comp.__rendered = dom);
    setAttrs(dom, vnode.props);

    if (olddom) {
        parent.replaceChild(dom, olddom);
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

    let olddomChild = olddom.firstChild;
    for (let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, olddomChild);
        olddomChild = olddomChild && olddomChild.nextSibling;
    }

    while (olddomChild) {
        //删除多余的子节点
        let next = olddomChild.nextSibling;
        olddom.removeChild(olddomChild);
        olddomChild = next;
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

var _Component2 = __webpack_require__(3);

var _Component3 = _interopRequireDefault(_Component2);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by apple on 2017/8/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// 由于Component 是es6写法的class， 放在项目外。导入babel不会处理


var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            allTest: _this.getTest()
        };

        _this.start = 0;
        _this.end = 10000;
        return _this;
    }

    _createClass(App, [{
        key: 'getTest',
        value: function getTest() {
            var result = [];
            for (var i = 0; i < 10000; i++) {
                result.push((0, _createElement2.default)(
                    'div',
                    { style: {
                            width: '30px',
                            color: 'red',
                            fontSize: '12px',
                            fontWeight: 600,
                            height: '20px',
                            textAlign: 'center',
                            margin: '5px',
                            padding: '5px',
                            border: '1px solid red',
                            position: 'relative'
                        }, title: i },
                    i
                ));
            }
            return result;
        }
    }, {
        key: 'getNowAllTest',
        value: function getNowAllTest() {
            this.start = this.start - 1;
            return [(0, _createElement2.default)(
                'div',
                { style: {
                        width: '30px',
                        color: 'red',
                        fontSize: '12px',
                        fontWeight: 600,
                        height: '20px',
                        textAlign: 'center',
                        margin: '5px',
                        padding: '5px',
                        border: '1px solid red',
                        position: 'relative'
                    }, title: this.start },
                this.start
            )].concat(this.state.allTest);
        }
    }, {
        key: 'getNowAllTest2',
        value: function getNowAllTest2() {
            this.end = this.end + 1;
            return this.state.allTest.concat([(0, _createElement2.default)(
                'div',
                { style: {
                        width: '30px',
                        color: 'red',
                        fontSize: '12px',
                        fontWeight: 600,
                        height: '20px',
                        textAlign: 'center',
                        margin: '5px',
                        padding: '5px',
                        border: '1px solid red',
                        position: 'relative'
                    }, title: this.end },
                this.end
            )]);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return (0, _createElement2.default)(
                'div',
                {
                    width: 100 },
                (0, _createElement2.default)(
                    'a',
                    { onClick: function onClick(e) {
                            _this2.setState({
                                allTest: _this2.getNowAllTest2()
                            });
                        } },
                    'click me'
                ),
                this.state.allTest
            );
        }
    }]);

    return App;
}(_Component3.default);

var startTime = new Date().getTime();
(0, _render2.default)((0, _createElement2.default)(App, null), document.getElementById("root"));
console.log("duration:", new Date().getTime() - startTime);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = diffObject;
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

/***/ }),
/* 3 */
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
        key: "setState",
        value: function setState(state) {
            var _this = this;

            setTimeout(function () {
                _this.state = state;
                var vnode = _this.render();
                var olddom = getDOM(_this);
                var startTime = new Date().getTime();
                (0, _render2.default)(vnode, olddom.parentNode, _this, olddom);
                console.log("duration:", new Date().getTime() - startTime);
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
/* 4 */
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

/***/ })
/******/ ]);