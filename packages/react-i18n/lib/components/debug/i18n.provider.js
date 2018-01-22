'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _i18n = require('../../utils/i18n.utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var I18nProvider = exports.I18nProvider = function (_PureComponent) {
  _inherits(I18nProvider, _PureComponent);

  function I18nProvider(props, context) {
    _classCallCheck(this, I18nProvider);

    var _this = _possibleConstructorReturn(this, (I18nProvider.__proto__ || Object.getPrototypeOf(I18nProvider)).call(this, props, context));

    _this.state = { lang: props.lang };
    if (process.env.DEBUG_MODE) {
      _this.listeners = [];
    }
    return _this;
  }

  _createClass(I18nProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      var context = {
        getTranslateFunction: function getTranslateFunction() {
          return (0, _i18n.translate)(_this2.state.lang, _this2.props.i18nNames);
        }
      };

      if (process.env.DEBUG_MODE) {
        context.updateLang = function (lang) {
          return _this2.setState({ lang: lang });
        };
        context.subscribe = function (listener) {
          return _this2.listeners.push(listener);
        };
        context.unsubscribe = function (listener) {
          var index = _this2.listeners.indexOf(listener);

          if (index !== -1) {
            _this2.listeners = _this2.listeners.slice(index, 1);
          }
        };
      }

      return context;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (process.env.DEBUG_MODE) {
        this.listeners.forEach(function (listener) {
          return listener();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return I18nProvider;
}(_react.PureComponent);

I18nProvider.propTypes = {
  children: _propTypes2.default.element.isRequired,
  lang: _propTypes2.default.object.isRequired,
  i18nNames: _propTypes2.default.object
};

I18nProvider.childContextTypes = {
  getTranslateFunction: _propTypes2.default.func
};

if (process.env.DEBUG_MODE) {
  I18nProvider.childContextTypes.updateLang = _propTypes2.default.func;
  I18nProvider.childContextTypes.subscribe = _propTypes2.default.func.isRequired;
  I18nProvider.childContextTypes.unsubscribe = _propTypes2.default.func.isRequired;
}