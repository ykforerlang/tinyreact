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
function render(vnode, parent, comp, olddom, myIndex) {
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
                const target = typeof myIndex == "number" ? parent.childNodes[myIndex] : null;
                parent.insertBefore(dom, target);
            }
        }
    } else if (typeof vnode.nodeName == "string") {
        if (!olddom || olddom.nodeName != vnode.nodeName.toUpperCase()) {
            createNewDom(vnode, parent, comp, olddom, myIndex);
        } else {
            diffDOM(vnode, parent, comp, olddom);
        }
    } else if (typeof vnode.nodeName == "function") {
        let func = vnode.nodeName;
        let inst = new func(vnode.props);

        comp && (comp.__rendered = inst);

        let innerVnode = inst.render(inst);
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

function createNewDom(vnode, parent, comp, olddom, myIndex) {
    let dom = document.createElement(vnode.nodeName);

    dom.__vnode = vnode;
    comp && (comp.__rendered = dom);
    setAttrs(dom, vnode.props);

    if (olddom) {
        parent.replaceChild(dom, olddom);
    } else {
        const target = typeof myIndex == "number" ? parent.childNodes[myIndex] : null;
        parent.insertBefore(dom, target);
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

    //reorder(olddom, vnode.props, olddom.__vnode.props)
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

function myReorder(oldChildNodes, vchildrens, olddom) {
    let ocnKeyMap = {}; // key值和 child的映射， 方便根据key确定child
    for (let i = 0; i < oldChildNodes.length; i++) {
        const key = oldChildNodes[i].__vnode.props.key;
        ocnKeyMap[key] = oldChildNodes[i];
    }

    vchildrens.forEach((element, index) => {
        const key = element.props.key;
        if (ocnKeyMap[key] === undefined) {
            // 如果之前不存在这个key值, 直接在对应位置 插入一个新的
            olddom.insertBefore();

            render(element, olddom, null, null);
        }
    });

    newList.forEach((element, index) => {
        if (oldMap[element.key] === undefined) {
            //oldList.splice(index, 0, element)
            insertBefore(oldList, element, oldList[index]);
        } else {
            if (element.key !== oldList[index].key) {
                let ov = oldMap[element.key];
                insertBefore(oldList, ov, oldList[index]);
            }
        }
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(0);

var _render2 = _interopRequireDefault(_render);

var _Component3 = __webpack_require__(3);

var _Component4 = _interopRequireDefault(_Component3);

var _createElement = __webpack_require__(4);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by apple on 2017/8/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
// 由于Component 是es6写法的class， 放在项目外。导入babel不会处理


var Dog = function (_Component) {
    _inherits(Dog, _Component);

    function Dog() {
        _classCallCheck(this, Dog);

        return _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).apply(this, arguments));
    }

    _createClass(Dog, [{
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(
                'div',
                { style: { color: this.props.color } },
                'i am a ',
                this.props.color,
                ' dog, click me to change color'
            );
        }
    }]);

    return Dog;
}(_Component4.default);

var colorArray = ['red', 'blue', 'yellow', 'black', 'green'];

var PS = function (_Component2) {
    _inherits(PS, _Component2);

    function PS(props) {
        _classCallCheck(this, PS);

        var _this2 = _possibleConstructorReturn(this, (PS.__proto__ || Object.getPrototypeOf(PS)).call(this, props));

        _this2.state = {
            color: 'grey'
        };
        return _this2;
    }

    _createClass(PS, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState({
                color: colorArray[parseInt(Math.random() * 5)]
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(
                'div',
                { onClick: this.handleClick.bind(this) },
                (0, _createElement2.default)(Dog, { color: this.state.color })
            );
        }
    }]);

    return PS;
}(_Component4.default);

(0, _render2.default)((0, _createElement2.default)(PS, null), document.getElementById("root"));

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = diffObject;
/* unused harmony export getKeyObjMap */
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

function getKeyObjMap(arr) {
    const result = {};
    arr.forEach(element => {
        result[element.key] = element;
    });
    return result;
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
        key: 'setState',
        value: function setState(state) {
            var _this = this;

            setTimeout(function () {
                _this.state = state;
                var vnode = _this.render();
                var olddom = getDOM(_this);
                (0, _render2.default)(vnode, olddom.parentNode, _this, olddom);
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