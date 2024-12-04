var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorSub = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_BehaviorComBase = require("BehaviorComBase");
var r_ExecuteBehaviorCom = require("ExecuteBehaviorCom");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
_decorator.executeInEditMode;
var exp_BehaviorSub = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.addType = 0;
    t.add = false;
    t.removeActionId = "";
    t.remove = false;
    t.actionList = [new r_ExecuteBehaviorCom.ExecuteBehaviorCom()];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.actionList.forEach(function (e) {
      r_BehaviorMgr.BehaviorMgr.allBehavior[e.behaviorId] = e;
    });
  };
  _ctor.prototype.update = function () {};
  __decorate([_property({
    displayName: "需要添加的行为",
    type: cc.Enum(r_BehaviorDef.BehaviorType)
  })], _ctor.prototype, "addType", undefined);
  __decorate([_property({
    displayName: "添加一个行为"
  })], _ctor.prototype, "add", undefined);
  __decorate([_property({
    displayName: "需要移除的行为ID"
  })], _ctor.prototype, "removeActionId", undefined);
  __decorate([_property({
    displayName: "移除一个行为"
  })], _ctor.prototype, "remove", undefined);
  __decorate([_property({
    type: [r_BehaviorComBase.BehaviorComBase],
    displayName: "行为",
    serializable: true
  })], _ctor.prototype, "actionList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.BehaviorSub = exp_BehaviorSub;