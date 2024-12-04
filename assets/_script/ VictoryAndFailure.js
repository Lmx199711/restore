var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkHasKeys = undefined;
var r_RelaxSystem = require("RelaxSystem");
var r_App = require("App");
var r_GameKeyMgr = require("GameKeyMgr");
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
var def_VictoryAndFailure = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.keys = [];
    t.victoryAndFailure = false;
    t.time = 0;
    t.vic = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    r_App.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDisable = function () {
    r_App.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.close = function () {
    r_RelaxSystem.RelaxSystem.clearLevel();
  };
  _ctor.prototype.onCheck = function (e) {
    if (-1 != this.keys.findIndex(function (t) {
      return t.key == e.data.key;
    })) {
      var t = exp_checkHasKeys(this.keys);
      console.log("111", t);
      if (t) {
        if (this.victoryAndFailure) {
          setTimeout(function () {
            r_RelaxSystem.RelaxSystem.win();
          }, 1e3 * this.time);
        } else {
          console.log("触发游戏失败");
          setTimeout(function () {
            r_RelaxSystem.RelaxSystem.lose();
          }, 1e3 * this.time);
        }
        if (null != this.vic) {
          console.log("开启遮罩");
          this.vic.active = true;
        }
      }
    }
  };
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "所有要检查的标记"
  })], _ctor.prototype, "keys", undefined);
  __decorate([_property({
    displayName: "胜利或失败",
    tooltip: "勾选为胜利"
  })], _ctor.prototype, "victoryAndFailure", undefined);
  __decorate([_property({
    displayName: "延迟显示时间"
  })], _ctor.prototype, "time", undefined);
  __decorate([_property({
    displayName: "遮罩节点",
    type: cc.Node,
    tooltip: "该节点请加入遮罩脚本BlockInputEvents"
  })], _ctor.prototype, "vic", undefined);
  return __decorate([_ccclass, _menu("Action/事件/胜利失败退出")], _ctor);
}(cc.Component);
exports.default = def_VictoryAndFailure;