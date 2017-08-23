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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _createElement = __webpack_require__(2);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by apple on 2017/8/21.
                                                                                                                                                           */

var Component = function Component() {
    _classCallCheck(this, Component);
};

var HelloWorld = function (_Component) {
    _inherits(HelloWorld, _Component);

    function HelloWorld() {
        _classCallCheck(this, HelloWorld);

        return _possibleConstructorReturn(this, (HelloWorld.__proto__ || Object.getPrototypeOf(HelloWorld)).apply(this, arguments));
    }

    _createClass(HelloWorld, [{
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(
                'div',
                { style: { color: 'red' } },
                'Hello World'
            );
        }
    }]);

    return HelloWorld;
}(Component);

(0, _render2.default)((0, _createElement2.default)(HelloWorld, null), document.getElementById("root"));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = render;
/**
 * Created by apple on 2017/8/21.
 */
function render(vnode, parent, comp, olddom) {
    let dom;
    if (typeof vnode == "string" || typeof vnode == "number") {
        dom = document.createTextNode(vnode);
        comp && (comp.__rendered = dom);
        parent.appendChild(dom);

        if (olddom) {
            parent.replaceChild(dom, olddom);
        } else {
            parent.appendChild(dom);
        }
    } else if (typeof vnode.nodeName == "string") {
        dom = document.createElement(vnode.nodeName);

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
                dom.style.cssText = v;
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

/***/ }),
/* 2 */
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
  return {
    nodeName: comp,
    props: props || {},
    children: args || []
  };
}

/***/ })
/******/ ]);