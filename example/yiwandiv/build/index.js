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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var _render = __webpack_require__(1);

var _util = __webpack_require__(2);

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
                var myIndex = (0, _util.getDOMIndex)(olddom);
                (0, _render.renderInner)(vnode, olddom.parentNode, _this, _this.__rendered, myIndex);
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
exports.renderInner = renderInner;

var _util = __webpack_require__(2);

var _Component = __webpack_require__(0);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * 渲染vnode成实际的dom
 * @param vnode 虚拟dom表示
 * @param parent 实际渲染出来的dom，挂载的父元素
 */
function render(vnode, parent) {
    parent.__rendered = [];
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

function createNewDom(vnode, parent, comp, olddomOrComp, myIndex) {
    if (olddomOrComp) {
        recoveryComp(olddomOrComp);
    }

    var dom = document.createElement(vnode.nodeName);

    dom.__rendered = [];
    dom.__vnode = vnode;
    dom.__myIndex = myIndex; // 方便 getDOMIndex 方法

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diffObject = diffObject;
exports.getDOM = getDOM;
exports.getDOMIndex = getDOMIndex;

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

function getDOMIndex(dom) {
    return dom.__myIndex;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _Component2 = __webpack_require__(0);

var _Component3 = _interopRequireDefault(_Component2);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by apple on 2017/8/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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

/***/ })
/******/ ]);