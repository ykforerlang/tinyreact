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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /**
      * Created by apple on 2017/7/20.
      */

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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
                var shoudUpdate = void 0;
                if (_this.shouldComponentUpdate) {
                    shoudUpdate = _this.shouldComponentUpdate(_this.props, state);
                } else {
                    shoudUpdate = true;
                }

                shoudUpdate && _this.componentWillUpdate && _this.componentWillUpdate(_this.props, state);
                _this.state = state;

                if (!shoudUpdate) {
                    return; // do nothing just return
                }

                var vnode = _this.render();
                var olddom = (0, _util.getDOM)(_this);
                (0, _render2.default)(vnode, olddom.parentNode, _this, _this.__rendered);
                _this.componentDidUpdate && _this.componentDidUpdate();
            }, 0);
        }
    }]);

    return Component;
}();

exports.default = Component;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}; /**
    * Created by apple on 2017/8/21.
    */

exports.default = render;

var _util = __webpack_require__(3);

var _RenderedHelper = __webpack_require__(1);

var _RenderedHelper2 = _interopRequireDefault(_RenderedHelper);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 * @param comp   谁渲染了我
 * @param olddomOrComp  老的dom/组件实例
 */
function render(vnode, parent, comp, olddomOrComp) {
    var dom = void 0;
    if (typeof vnode === "string" || typeof vnode === "number") {
        if (olddomOrComp && olddomOrComp.splitText) {
            if (olddomOrComp.nodeValue !== vnode) {
                olddomOrComp.nodeValue = vnode;
            }
        } else {
            dom = document.createTextNode(vnode);
            parent.__rendered.replaceNullPush(dom, olddomOrComp); //comp 一定是null

            if (olddomOrComp) {
                parent.replaceChild(dom, (0, _util.getDOM)(olddomOrComp));
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
            inst = new func(vnode.props);
            inst.componentWillMount && inst.componentWillMount();

            if (olddomOrComp) {
                parent.removeChild((0, _util.getDOM)(olddomOrComp));
            }

            if (comp) {
                comp.__rendered = inst;
            } else {
                parent.__rendered.replaceNullPush(inst, olddomOrComp);
            }
        }

        var innerVnode = inst.render();
        render(innerVnode, parent, inst, inst.__rendered);

        if (olddomOrComp && olddomOrComp instanceof func) {
            inst.componentDidUpdate && inst.componentDidUpdate();
        } else {
            inst.componentDidMount && inst.componentDidMount();
        }
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
            var capture = k.indexOf("Capture") != -1;
            dom.addEventListener(k.substring(2).toLowerCase(), v, capture);
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

        if (k == "style") {
            dom.style.cssText = ""; //IE
            continue;
        }

        if (k[0] == "o" && k[1] == "n") {
            var capture = k.indexOf("Capture") != -1;
            var v = props[k];
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
    for (var k in newProps) {
        var v = newProps[k];
        var ov = oldProps[k];
        if (v === ov) continue;

        if (k == "className") {
            dom.setAttribute("class", v);
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
            var capture = k.indexOf("Capture") != -1;
            var eventKey = k.substring(2).toLowerCase();
            dom.removeEventListener(eventKey, ov, capture);
            dom.addEventListener(eventKey, v, capture);
            continue;
        }

        dom.setAttribute(k, v);
    }
}

function createNewDom(vnode, parent, comp, olddomOrComp) {
    var dom = document.createElement(vnode.nodeName);

    dom.__rendered = new _RenderedHelper2.default();
    dom.__vnode = vnode;

    if (comp) {
        comp.__rendered = dom;
    } else {
        parent.__rendered.replaceNullPush(dom, olddomOrComp);
    }

    setAttrs(dom, vnode.props);

    if (olddomOrComp) {
        parent.replaceChild(dom, (0, _util.getDOM)(olddomOrComp));
    } else {
        parent.appendChild(dom);
    }

    for (var i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], dom, null, null);
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

    olddom.__rendered.slice(vnode.children.length).forEach(function (element) {
        olddom.removeChild((0, _util.getDOM)(element));
    });

    var __renderedArr = olddom.__rendered.slice(0, vnode.children.length);
    olddom.__rendered = new _RenderedHelper2.default(__renderedArr);
    for (var i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, __renderedArr[i]);
    }
    olddom.__vnode = vnode;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diffObject = diffObject;
exports.getDOM = getDOM;

var _Component = __webpack_require__(0);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _Component3 = __webpack_require__(0);

var _Component4 = _interopRequireDefault(_Component3);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

var _RenderedHelper = __webpack_require__(1);

var _RenderedHelper2 = _interopRequireDefault(_RenderedHelper);

var _ComplexComp = __webpack_require__(6);

var _ComplexComp2 = _interopRequireDefault(_ComplexComp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
(0, _render2.default)((0, _createElement2.default)(_ComplexComp2.default, null), root);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component6 = __webpack_require__(0);

var _Component7 = _interopRequireDefault(_Component6);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

var _RenderedHelper = __webpack_require__(1);

var _RenderedHelper2 = _interopRequireDefault(_RenderedHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestAppA = function (_Component) {
    _inherits(TestAppA, _Component);

    function TestAppA(props) {
        _classCallCheck(this, TestAppA);

        var _this = _possibleConstructorReturn(this, (TestAppA.__proto__ || Object.getPrototypeOf(TestAppA)).call(this, props));

        console.log("TestAppA constructor");
        return _this;
    }

    _createClass(TestAppA, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log("TestAppA componentWillMount");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log("TestAppA componentDidMount");
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("TestAppA componentWillReceiveProps");
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log("TestAppA shouldComponentUpdate", nextProps, nextState);
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("TestAppA componentWillUpdate");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log("TestAppA componentDidUpdate");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("TestAppA componentWillUnmount");
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("TestAppA render...");
            return (0, _createElement2.default)(
                'div',
                null,
                'TestAppA'
            );
        }
    }]);

    return TestAppA;
}(_Component7.default);

var TestAppB = function (_Component2) {
    _inherits(TestAppB, _Component2);

    function TestAppB(props) {
        _classCallCheck(this, TestAppB);

        var _this2 = _possibleConstructorReturn(this, (TestAppB.__proto__ || Object.getPrototypeOf(TestAppB)).call(this, props));

        console.log("TestAppB constructor");
        return _this2;
    }

    _createClass(TestAppB, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log("TestAppB componentWillMount");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log("TestAppB componentDidMount");
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("TestAppB componentWillReceiveProps");
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log("TestAppB shouldComponentUpdate", nextProps, nextState);
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("TestAppB componentWillUpdate");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log("TestAppB componentDidUpdate");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("TestAppB componentWillUnmount");
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("TestAppB render...");
            return (0, _createElement2.default)(
                'div',
                null,
                'TestAppB'
            );
        }
    }]);

    return TestAppB;
}(_Component7.default);

var TestAppC = function (_Component3) {
    _inherits(TestAppC, _Component3);

    function TestAppC(props) {
        _classCallCheck(this, TestAppC);

        var _this3 = _possibleConstructorReturn(this, (TestAppC.__proto__ || Object.getPrototypeOf(TestAppC)).call(this, props));

        console.log("TestAppC constructor");
        return _this3;
    }

    _createClass(TestAppC, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log("TestAppC componentWillMount");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log("TestAppC componentDidMount");
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("TestAppC componentWillReceiveProps");
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log("TestAppC shouldComponentUpdate", nextProps, nextState);
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("TestAppC componentWillUpdate");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log("TestAppC componentDidUpdate");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("TestAppC componentWillUnmount");
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("TestAppC render...");
            return (0, _createElement2.default)(
                'div',
                null,
                'TestAppC'
            );
        }
    }]);

    return TestAppC;
}(_Component7.default);

var TestAppD = function (_Component4) {
    _inherits(TestAppD, _Component4);

    function TestAppD(props) {
        _classCallCheck(this, TestAppD);

        var _this4 = _possibleConstructorReturn(this, (TestAppD.__proto__ || Object.getPrototypeOf(TestAppD)).call(this, props));

        console.log("TestAppD constructor");
        return _this4;
    }

    _createClass(TestAppD, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log("TestAppD componentWillMount");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log("TestAppD componentDidMount");
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("TestAppD componentWillReceiveProps");
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log("TestAppD shouldComponentUpdate", nextProps, nextState);
            return true;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("TestAppD componentWillUpdate");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log("TestAppD componentDidUpdate");
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("TestAppD componentWillUnmount");
        }
    }, {
        key: 'render',
        value: function render() {
            console.log("TestAppD render");
            if (this.props.text === "testA") {
                return (0, _createElement2.default)(TestAppA, null);
            } else if (this.props.text === "testB") {
                return (0, _createElement2.default)(TestAppB, null);
            } else {
                return (0, _createElement2.default)(TestAppC, null);
            }
        }
    }]);

    return TestAppD;
}(_Component7.default);

/// app1

var ComplexComp = function (_Component5) {
    _inherits(ComplexComp, _Component5);

    function ComplexComp(props) {
        _classCallCheck(this, ComplexComp);

        var _this5 = _possibleConstructorReturn(this, (ComplexComp.__proto__ || Object.getPrototypeOf(ComplexComp)).call(this, props));

        _this5.state = {
            odd: false
        };
        return _this5;
    }

    _createClass(ComplexComp, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            return (0, _createElement2.default)(
                'div',
                { onClick: function onClick(e) {
                        return _this6.setState({
                            odd: !_this6.state.odd
                        });
                    } },
                (0, _createElement2.default)(
                    'div',
                    null,
                    (0, _createElement2.default)(
                        'div',
                        null,
                        (0, _createElement2.default)(TestAppA, null),
                        (0, _createElement2.default)(TestAppD, { text: this.state.odd ? "testB" : "testC" })
                    ),
                    this.state.odd && (0, _createElement2.default)(TestAppB, null)
                ),
                (0, _createElement2.default)(TestAppC, null),
                !this.state.odd && (0, _createElement2.default)(TestAppA, null),
                (0, _createElement2.default)(TestAppD, { text: this.state.odd ? "testB" : "testC" })
            );
        }
    }]);

    return ComplexComp;
}(_Component7.default);

exports.default = ComplexComp;

/***/ })
/******/ ]);