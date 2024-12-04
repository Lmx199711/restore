var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseWin = undefined;
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_TYIndex = require("TYIndex");
var exp_BaseWin = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if ("string" != typeof this.data && "number" != typeof this.data) {
      if (this.data && this.data.opendCallback) {
        r_TimeSystem.TimeSystem.scheduleOnce("opendCallback", .3, this.data.opendCallback);
        this.data.opendCallback = null;
      }
      this.data && (this.data.opendCallback = null);
    }
  };
  _ctor.prototype.bindBtnCallback = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o = 0;
    for (var i = e; o < i.length; o++) {
      var n = i[o];
      try {
        n.onClick(this["onClick" + n.name], this);
      } catch (a) {
        console.error("该页面节点名:", n.name, " 缺失");
      }
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.offAllCaller(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BaseWin = exp_BaseWin;