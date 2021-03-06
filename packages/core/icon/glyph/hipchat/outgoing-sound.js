"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HipchatOutgoingSoundIcon = function HipchatOutgoingSoundIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><g fill=\"currentColor\" fill-rule=\"evenodd\"><path d=\"M17.229 7.652c.04.048.124.16.238.33.198.294.398.631.584 1.006 1.138 2.288 1.243 4.648-.316 6.864a7.86 7.86 0 0 1-.377.492 1 1 0 0 0 .156 1.43 1.062 1.062 0 0 0 1.467-.152 9.55 9.55 0 0 0 .475-.62c2.045-2.907 1.907-6.017.472-8.901-.392-.788-.788-1.376-1.07-1.72a1.062 1.062 0 0 0-1.466-.158 1 1 0 0 0-.163 1.429z\" fill-rule=\"nonzero\"/><path d=\"M14.214 9.619c.079.101.225.33.376.658.608 1.318.608 2.72-.404 4.141-.32.45-.217 1.074.23 1.395a.992.992 0 0 0 1.389-.231c1.476-2.073 1.476-4.226.591-6.146a5.494 5.494 0 0 0-.619-1.055.992.992 0 0 0-1.398-.166c-.431.341-.506.97-.165 1.404z\" fill-rule=\"nonzero\"/><path d=\"M7 15V9l4.74-3.892c.57-.323 1.26.116 1.26.8v12.184c0 .684-.69 1.123-1.26.8L7 15zM4 9h2v6H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z\"/></g></svg>"
  }, props));
};

HipchatOutgoingSoundIcon.displayName = 'HipchatOutgoingSoundIcon';
var _default = HipchatOutgoingSoundIcon;
exports.default = _default;