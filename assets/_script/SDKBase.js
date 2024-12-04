Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SDKBase = undefined;
var r_SDKMgr = require("SDKMgr");
var exp_SDKBase = function () {
  function _ctor() {}
  _ctor.prototype.init = function (e) {
    r_SDKMgr.default.sdkModel.init(e);
  };
  _ctor.prototype.showInsert = function () {};
  _ctor.prototype.showVideo = function () {};
  _ctor.prototype.showBanner = function () {};
  _ctor.prototype.hideBanner = function () {};
  _ctor.prototype.setVibrate = function () {};
  _ctor.prototype.showToast = function () {};
  _ctor.prototype.loadFont = function () {};
  _ctor.prototype.report = function () {};
  _ctor.prototype.exit = function () {};
  return _ctor;
}();
exports.SDKBase = exp_SDKBase;