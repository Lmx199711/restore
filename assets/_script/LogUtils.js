var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogUtils = undefined;
(function (e) {
  e[e.Verbose = 1] = "Verbose";
  e[e.Warn = 2] = "Warn";
  e[e.Error = 3] = "Error";
  e[e.NOTALL = 4] = "NOTALL";
})(i || (i = {}));
var exp_LogUtils = function () {
  function _ctor() {}
  _ctor.d = function (e) {
    this.isDebug && console.log(this.Tag + e);
  };
  _ctor.v = function (e) {
    this.level <= i.Verbose && console.log("=mxy=verbose=:" + e);
  };
  _ctor.w = function (e) {
    this.level <= i.Warn && console.warn("=mxy=WWWWWWWarn=:" + e);
  };
  _ctor.e = function (e) {
    this.level <= i.Error && console.warn("=mxy========Error=====:" + e);
  };
  _ctor.echo = function (t, o) {
    undefined === t && (t = "data非空则打印");
    undefined === o && (o = null);
    if (this.isDebug && null != o) {
      if ("string" == typeof o) {
        _ctor.v(t + ",data:" + o);
      } else {
        _ctor.v(t + "type为其他类型");
      }
    }
  };
  _ctor.isDebug = false;
  _ctor.level = i.NOTALL;
  _ctor.Tag = "==mxy====";
  return _ctor;
}();
exports.LogUtils = exp_LogUtils;