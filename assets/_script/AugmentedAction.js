var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AugmentedAction = undefined;
var r_ActionExchanger = require("ActionExchanger");
var r_LevelPreload = require("LevelPreload");
var r_RunTimerBase = require("RunTimerBase");
var r_LoadMgr = require("LoadMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_AugmentedAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.single_RunTimer = null;
    t.specificJson = 0;
    t.currLevelData = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      var e;
      var t;
      return __generator(this, function (o) {
        switch (o.label) {
          case 0:
            if (this.specificJson) {
              e = this;
              return [4, r_ActionExchanger.default.getLevelInfo(Number(this.specificJson))];
            } else {
              return [3, 2];
            }
          case 1:
            e.currLevelData = o.sent();
            return [3, 4];
          case 2:
            t = this;
            return [4, r_ActionExchanger.default.getLevelInfo(r_LoadMgr.default.currLv)];
          case 3:
            t.currLevelData = o.sent();
            o.label = 4;
          case 4:
            this.currLevelData && r_BehaviorMgr.JsonInject2Action(this.currLevelData);
            return [4, new Promise(function (e) {
              e(1);
            })];
          case 5:
            o.sent();
            return [2];
        }
      });
    });
  };
  _ctor.prototype.pauseGame = function () {
    e.prototype.pauseGame.call(this);
  };
  _ctor.prototype.resumeGame = function () {
    e.prototype.resumeGame.call(this);
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  __decorate([_property({
    displayName: "指定的计时组件(没用到)",
    type: r_RunTimerBase.default
  })], _ctor.prototype, "single_RunTimer", undefined);
  __decorate([_property({
    displayName: "指定json",
    type: cc.Integer,
    min: 0,
    step: 1
  })], _ctor.prototype, "specificJson", undefined);
  return __decorate([_ccclass(), _menu("新系统/02快捷脚本/关卡唯一/增强行为组")], _ctor);
}(r_LevelPreload.default);
exports.AugmentedAction = exp_AugmentedAction;