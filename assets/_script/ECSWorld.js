Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ECSWorld = exports.EventFuncName = undefined;
var exp_EventFuncName = function () {
  function _ctor() {}
  _ctor.onStart = "onStart";
  _ctor.onDestroy = "onDestroy";
  _ctor.onEnable = "onEnable";
  _ctor.onDisable = "onDisable";
  _ctor.onUpdate = "onUpdate";
  return _ctor;
}();
exports.EventFuncName = exp_EventFuncName;
var exp_ECSWorld = function () {
  function _ctor() {}
  _ctor.bindSystem = function (e, t) {
    t.entity = e;
    this.entitys.set(e, t);
  };
  _ctor.unBindSystem = function (e) {
    if (this.entitys.has(e)) {
      this.entitys.get(e).entity = null;
      this.entitys.delete(e);
    }
  };
  _ctor.getSys = function (e) {
    if (this.entitys.has(e)) {
      return this.entitys.get(e);
    } else {
      return null;
    }
  };
  _ctor.execute = function (e, t) {
    var o = [];
    for (var i = 2; i < arguments.length; i++) {
      o[i - 2] = arguments[i];
    }
    var n = this.getSys(e);
    n && n[t] && n[t].apply(n, o);
  };
  _ctor.entitys = new Map();
  return _ctor;
}();
exports.ECSWorld = exp_ECSWorld;