var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_CheckOnceWipe = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_ExAB_CheckDist = require("ExAB_CheckDist");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_CheckOnceWipe = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "松手时、大于一定范围则滑走，移除点击功能";
    t.isOutputPos = false;
    t.targetNode = null;
    t.targetPos = cc.Vec2.ZERO;
    t.judgeRange = 100;
    t.distActionId = "";
    t.isMoreEffect = false;
    t.tOpacity = 0;
    t.tRotate = 0;
    t._v2 = new cc.Vec2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.checkDist = function (e, t, o, i) {
    return t.sub(e).len() >= this.judgeRange && (r_BehaviorMgr.BehaviorMgr.trigger(i), r_BehaviorMgr.BehaviorMgr.trigger(this.distActionId), r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.node), this.isOutputPos ? (this.getTargetWorldPos(), o = this.targetPos) : cc.Camera.main.getScreenToWorldPoint(t, o), this.isMoreEffect && cc.tween(this.node).to(.2, {
      opacity: this.tOpacity,
      angle: this.tRotate
    }).start(), true);
  };
  _ctor.prototype.getTargetWorldPos = function () {
    if (this.targetNode) {
      this.targetPos = this.targetNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
    } else {
      var e = new cc.Vec2(this.node.x + this.targetPos.x, this.node.y + this.targetPos.y);
      this.targetPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, e);
    }
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "用指定位置作为滑动终点"
  })], _ctor.prototype, "isOutputPos", undefined);
  __decorate([_property({
    displayName: "outPut终点(node)",
    type: cc.Node,
    visible: function () {
      return this.isOutputPos;
    }
  })], _ctor.prototype, "targetNode", undefined);
  __decorate([_property({
    displayName: "outPut终点(vec2)",
    visible: function () {
      return this.isOutputPos;
    }
  })], _ctor.prototype, "targetPos", undefined);
  __decorate([_property({
    displayName: "滑动距离(指针)",
    min: 20,
    step: 1
  })], _ctor.prototype, "judgeRange", undefined);
  __decorate([_property({
    displayName: "滑动成功时执行"
  })], _ctor.prototype, "distActionId", undefined);
  __decorate([_property({
    displayName: "简单效果"
  })], _ctor.prototype, "isMoreEffect", undefined);
  __decorate([_property({
    displayName: "渐隐",
    range: [0, 255, 1],
    visible: function () {
      return this.isMoreEffect;
    }
  })], _ctor.prototype, "tOpacity", undefined);
  __decorate([_property({
    displayName: "旋转",
    step: 1,
    visible: function () {
      return this.isMoreEffect;
    }
  })], _ctor.prototype, "tRotate", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/松手检查/滑动专用/一次滑动")], _ctor);
}(r_ExAB_CheckDist.ExAB_CheckDist);
exports.Ex_CheckOnceWipe = exp_Ex_CheckOnceWipe;