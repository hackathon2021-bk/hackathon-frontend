"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _withLayoutApp = _interopRequireDefault(require("hoc/with-layout-app"));

var _summary = _interopRequireDefault(require("main/summary/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _withLayoutApp["default"])(_summary["default"]);

exports["default"] = _default;