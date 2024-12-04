Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_Platform = require("Platform");
var def_SDKMgr = function () {
  function _ctor() {}
  _ctor.init = function (e, t, o, i) {
    this.sdkIns || (this.sdkIns = new e());
    this.sdkModel || (this.sdkModel = new t());
    this.sdkConfig || (this.sdkConfig = new o());
    this.sdkIns.init(i);
  };
  _ctor.showVideo = function (e, t) {
    if (r_Platform.default.isMiniPlatform()) {
      this.sdkIns.showVideo(e, t);
    } else {
      e && e(true);
    }
  };
  _ctor.exit = function () {
    this.sdkIns.exit();
  };
  return _ctor;
}();
exports.default = def_SDKMgr;