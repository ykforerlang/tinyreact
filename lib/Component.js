'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by apple on 2017/7/20.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _render = require('./render');

var _util = require('./util');

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