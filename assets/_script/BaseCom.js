var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseCom = undefined;
var r_TimeSystem = require("TimeSystem");
var exp_BaseCom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.onShown = function (e) {
    if ("string" != typeof e && "number" != typeof e) {
      if (e && e.opendCallback) {
        r_TimeSystem.TimeSystem.scheduleOnce("opendCallback", .3, e.opendCallback);
        e.opendCallback = null;
      }
      e && (e.opendCallback = null);
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
        n.onClick(this.touchBtn.bind(this, n.name), this);
      } catch (a) {
        console.error("该页面节点名:", n.name, " 缺失");
      }
    }
  };
  _ctor.prototype.touchBtn = function () {};
  return _ctor;
}(fgui.GComponent);
exports.BaseCom = exp_BaseCom;