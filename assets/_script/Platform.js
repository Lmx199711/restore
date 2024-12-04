Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = undefined;
var exp_Platform = function () {
  function _ctor() {}
  _ctor.isMiniPlatform = function () {
    return cc.sys.platform !== cc.sys.MOBILE_BROWSER && cc.sys.platform !== cc.sys.DESKTOP_BROWSER;
  };
  //判断是否为浏览器
  _ctor.isDarenPlatform = function () {
    return cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER;
  };
  return _ctor;
}();
exports.Platform = exp_Platform;