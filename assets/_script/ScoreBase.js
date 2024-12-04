var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LoadMgr = require("LoadMgr");
var r_GameLogicBase = require("GameLogicBase");
var r_BehaviorDef = require("BehaviorDef");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ScoreBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.varName = "";
    t.max = 999;
    t.cur = 0;
    t.target = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e, t) {
    var o = 0;
    var i = 0;
    !e && isNaN(Number(e)) || (o = Number(e));
    !t && isNaN(Number(t)) || (i = Number(t));
    this.max = i;
    this.cur = o;
    console.log("初始化分数:" + this.cur + "/" + this.max);
    if (this.varName) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.varName, this.cur);
      r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.cur;
    }
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      if (o instanceof Array) {
        this.init(o[0], o[1]);
      } else if (o[r_BehaviorDef.ARGS.childSelf]) {
        console.log("设置目标:" + o[r_BehaviorDef.ARGS.childSelf]);
        this.setTarget(o[r_BehaviorDef.ARGS.childSelf][0]);
      } else if (!o[r_BehaviorDef.ARGS.childAdd]) {
        if (o[r_BehaviorDef.ARGS.over]) {
          console.log("结束，判断分数是否通关");
          this.OverCheck();
        } else {
          console.log("增加分数：data:" + o);
          this.addScore(Number(o) || 0);
        }
      }
    }
  };
  _ctor.prototype.setTarget = function (e) {
    if (e && !isNaN(Number(e))) {
      this.target = Number(e);
      console.log("成功设置target:" + this.target);
    }
  };
  _ctor.prototype.addScore = function (e) {
    this.cur += e;
    console.log("now the score:" + this.cur);
    if (this.varName) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.varName, this.cur);
      r_GameKeyMgr.GameKeyMgr.VarObj[this.varName] = this.cur;
    }
  };
  _ctor.prototype.over2Success = function () {
    var e;
    null === (e = r_LoadMgr.default.runInstance.getComponent(r_GameLogicBase.default)) || undefined === e || e.succ();
  };
  _ctor.prototype.over2Defeat = function () {
    var e;
    null === (e = r_LoadMgr.default.runInstance.getComponent(r_GameLogicBase.default)) || undefined === e || e.fail();
  };
  __decorate([_property({
    displayName: "保存至变量"
  })], _ctor.prototype, "varName", undefined);
  return __decorate([_ccclass()], _ctor);
}(cc.Component);
exports.default = def_ScoreBase;