var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckHasKey = exports.checkHasKeys = exports.GameKeyInfo = undefined;
var r_App = require("App");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_GameKeyInfo = function () {
  function _ctor() {
    this.key = "";
    this.optional = false;
    this.invert = false;
  }
  __decorate([_property({
    displayName: "标记",
    tooltip: "通常这个标记是由action里面添加的"
  })], _ctor.prototype, "key", undefined);
  __decorate([_property({
    displayName: "可选",
    tooltip: "所有可选只需要满足一个,但是非可选需要全部满足"
  })], _ctor.prototype, "optional", undefined);
  __decorate([_property({
    displayName: "取反",
    tooltip: "取反"
  })], _ctor.prototype, "invert", undefined);
  return __decorate([_ccclass("GameKeyInfo")], _ctor);
}();
exports.GameKeyInfo = exp_GameKeyInfo;
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
var exp_CheckHasKey = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.keys = [];
    t.triggerActionId = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    r_App.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDisable = function () {
    r_App.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onCheck = function (e) {
    -1 != this.keys.findIndex(function (t) {
      return t.key == e.data.key;
    }) && exp_checkHasKeys(this.keys) && r_TriggerActionMgr.TriggerActionMgr.trigger(this.triggerActionId);
  };
  __decorate([_property({
    type: [exp_GameKeyInfo],
    displayName: "所有要检查的标记"
  })], _ctor.prototype, "keys", undefined);
  __decorate([_property({
    displayName: "所有key验证通过后执行"
  })], _ctor.prototype, "triggerActionId", undefined);
  return __decorate([_ccclass, _menu("Action/检查是否获得key")], _ctor);
}(cc.Component);
exports.CheckHasKey = exp_CheckHasKey;