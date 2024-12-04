var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomTriggerAction = undefined;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var h = function () {
  function e() {
    this.rate = 0;
    this.action = "";
  }
  __decorate([_property({
    type: Number,
    displayName: "随机概率1就是100%"
  })], e.prototype, "rate", undefined);
  __decorate([_property({
    displayName: "触发的action"
  })], e.prototype, "action", undefined);
  return __decorate([_ccclass("RandomActionInfo")], e);
}();
var exp_RandomTriggerAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.randomList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    var e = Math.random();
    var t = 0;
    for (var o = 0; o < this.randomList.length; o++) {
      var i = this.randomList[o];
      if (e <= (t += i.rate)) {
        return void r_TriggerActionMgr.TriggerActionMgr.trigger(i.action);
      }
    }
  };
  __decorate([_property({
    type: h,
    displayName: "随机列表"
  })], _ctor.prototype, "randomList", undefined);
  return __decorate([_ccclass("RandomTriggerAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.RandomTriggerAction = exp_RandomTriggerAction;