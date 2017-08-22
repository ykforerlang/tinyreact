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

var _renderVDOM = __webpack_require__(1);

var _renderVDOM2 = _interopRequireDefault(_renderVDOM);

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

var Grandson = function (_Component) {
    _inherits(Grandson, _Component);

    function Grandson() {
        _classCallCheck(this, Grandson);

        return _possibleConstructorReturn(this, (Grandson.__proto__ || Object.getPrototypeOf(Grandson)).apply(this, arguments));
    }

    _createClass(Grandson, [{
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(
                'div',
                null,
                'i am grandson'
            ); // React.createElement('div', null, "i am grandson")
        }
    }]);

    return Grandson;
}(Component);

var Son = function (_Component2) {
    _inherits(Son, _Component2);

    function Son() {
        _classCallCheck(this, Son);

        return _possibleConstructorReturn(this, (Son.__proto__ || Object.getPrototypeOf(Son)).apply(this, arguments));
    }

    _createClass(Son, [{
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(Grandson, null); // React.createElement(Grandson)
        }
    }]);

    return Son;
}(Component);

var Father = function (_Component3) {
    _inherits(Father, _Component3);

    function Father() {
        _classCallCheck(this, Father);

        return _possibleConstructorReturn(this, (Father.__proto__ || Object.getPrototypeOf(Father)).apply(this, arguments));
    }

    _createClass(Father, [{
        key: 'render',
        value: function render() {
            return (0, _createElement2.default)(Son, null); // React.createElement(Son)
        }
    }]);

    return Father;
}(Component);

var vv = (0, _renderVDOM2.default)((0, _createElement2.default)(Father, null));
console.log("vv:", vv);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = renderVDOM;
/**
 * Created by apple on 2017/8/21.
 */
function renderVDOM(vnode) {
    if (typeof vnode == "string") {
        return vnode;
    } else if (typeof vnode.nodeName == "string") {
        let result = {
            nodeName: vnode.nodeName,
            props: vnode.props,
            children: []
        };
        for (let i = 0; i < vnode.children.length; i++) {
            result.children.push(renderVDOM(vnode.children[i]));
        }
        return result;
    } else if (typeof vnode.nodeName == "function") {
        let func = vnode.nodeName;
        let inst = new func(vnode.props);
        let innerVnode = func.prototype.render.call(inst);
        return renderVDOM(innerVnode);
    }
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