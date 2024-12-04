var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_CheckMoveEnd = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_ExAB_CheckDist = require("ExAB_CheckDist");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = function () {
  function e() {
    this.distNode = null;
    this.distActionId = "";
    this.needKyes = "";
  }
  __decorate([_property({
    displayName: "位置节点",
    type: cc.Node
  })], e.prototype, "distNode", undefined);
  __decorate([_property({
    displayName: "执行Id"
  })], e.prototype, "distActionId", undefined);
  __decorate([_property({
    displayName: "需要的key"
  })], e.prototype, "needKyes", undefined);
  return __decorate([_ccclass("MoveEndInfo")], e);
}();
var exp_Ex_CheckMoveEnd = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "位置检查-抬起时";
    t.isMoveToDist = true;
    t.isMustOnDist = false;
    t.isAutoHide = false;
    t.isAddToDistNode = false;
    t.isDisableTouch = false;
    t.distInfos = Array();
    t.isFinish = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.checkDist = function (e, t, o, i) {
    var n = false;
    var a = 0;
    for (var c = this.distInfos; a < c.length; a++) {
      var u = c[a];
      if (u.distNode) {
        if (!r_BehaviorMgr.BehaviorMgr.hasKeys(u.needKyes)) {
          continue;
        }
        if (r_CommonFunc.checkTouchNode2(t, u.distNode)) {
          cc.log("找到目标 成功执行;" + u.distActionId);
          r_BehaviorMgr.BehaviorMgr.trigger(i);
          r_BehaviorMgr.BehaviorMgr.triggerActions(u.distActionId);
          u.distNode.convertToWorldSpaceAR(cc.Vec2.ZERO, o);
          n = true;
          this.isAutoHide && (this.node.active = false);
          this.isAddToDistNode && (this.node.parent = u.distNode);
          this.isDisableTouch && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.node);
          this.isFinish = true;
          break;
        }
      }
    }
    return !!this.isMoveToDist && (console.log(":本次放置后是否 要表现为正常的交互效果来收尾：" + (!this.isMustOnDist || n)), !this.isMustOnDist || n);
  };
  _ctor.prototype.onEnable = function () {
    this.isDisableTouch && this.isFinish && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.node);
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "松手时是否移动到松手处"
  })], _ctor.prototype, "isMoveToDist", undefined);
  __decorate([_property({
    displayName: "松手时击中结果才移动",
    visible: function () {
      return this.isMoveToDist;
    }
  })], _ctor.prototype, "isMustOnDist", undefined);
  __decorate([_property({
    displayName: "成功后是否隐藏节点"
  })], _ctor.prototype, "isAutoHide", undefined);
  __decorate([_property({
    displayName: "成功后是否加到目标节点下"
  })], _ctor.prototype, "isAddToDistNode", undefined);
  __decorate([_property({
    displayName: "成功后是否禁用点击"
  })], _ctor.prototype, "isDisableTouch", undefined);
  __decorate([_property([y])], _ctor.prototype, "distInfos", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/松手检查/1对N")], _ctor);
}(r_ExAB_CheckDist.ExAB_CheckDist);
exports.Ex_CheckMoveEnd = exp_Ex_CheckMoveEnd;