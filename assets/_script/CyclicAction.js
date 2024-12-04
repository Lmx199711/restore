var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkHasKeys = undefined;
var r_RelaxSystem = require("RelaxSystem");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = [];
var f = [];
function exp_checkHasKeys(e) {
  y.length = 0;
  f.length = 0;
  var t = {};
  e.forEach(function (e) {
    if (e.optional) {
      -1 == y.indexOf(e.key) && y.push(e.key);
    } else if (-1 == f.indexOf(e.key)) {
      f.push(e.key);
      t[e.key] = e;
    }
  });
  var o = true;
  for (var i = 0; i < f.length; i++) {
    var n = f[i];
    var a = t[n];
    if (!a.invert && !r_GameKeyMgr.GameKeyMgr.has(n)) {
      console.log("checkHasKeys 没找到key:", n);
      o = false;
      break;
    }
    if (a.invert && r_GameKeyMgr.GameKeyMgr.has(n)) {
      console.log("checkHasKeys 没找到key:", n);
      o = false;
      break;
    }
  }
  if (o && y.length > 0) {
    o = false;
    for (i = 0; i < y.length; i++) {
      if (r_GameKeyMgr.GameKeyMgr.has(y[i])) {
        o = true;
        break;
      }
    }
  }
  return o;
}
exports.checkHasKeys = exp_checkHasKeys;
var def_CyclicAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.keys = [];
    t.action = "";
    t.oneAction = "";
    t.time = 0;
    t.timer = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {
    var e = this;
    this.timer = this.time;
    setTimeout(function () {
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.oneAction);
    }, 1e3);
  };
  _ctor.prototype.update = function () {
    var e = this;
    if (exp_checkHasKeys(this.keys) && this.timer == this.time && !r_RelaxSystem.RelaxSystem.iswin) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.action);
      this.timer = setTimeout(function () {
        e.timer = e.time;
      }, 1e3 * this.timer);
    }
  };
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "所有要检查的标记"
  })], _ctor.prototype, "keys", undefined);
  __decorate([_property({
    type: String,
    displayName: "循环执行的action"
  })], _ctor.prototype, "action", undefined);
  __decorate([_property({
    type: String,
    displayName: "执行一次的action"
  })], _ctor.prototype, "oneAction", undefined);
  __decorate([_property({
    displayName: "循环时间"
  })], _ctor.prototype, "time", undefined);
  return __decorate([_ccclass, _menu("Action/事件/循环执行一个动作")], _ctor);
}(cc.Component);
exports.default = def_CyclicAction;