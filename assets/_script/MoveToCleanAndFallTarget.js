var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToCleanAndFallTarget = undefined;
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_MoveToClean = require("MoveToClean");
var r_MoveToTargetAndFall = require("MoveToTargetAndFall");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_MoveToCleanAndFallTarget = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.fallNodes = [];
    t.checkNode = null;
    t.progress = 0;
    t.fallCount = 0;
    t.isGameOver = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.progress = 0;
    this.fallCount = 0;
    this.ownerPolygon = this.node.getComponent(cc.PolygonCollider);
    null == this.checkNode && (this.checkNode = this.node);
  };
  _ctor.prototype.onDragStart = function (t) {
    e.prototype.onDragStart.call(this, t);
    this.isGameOver = false;
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    for (var o = 0; o < this.fallNodes.length; o++) {
      var i = this.fallNodes[o];
      if (i.flag && this.nodeOverOtherNode(this.checkNode, i.target)) {
        if (r_CheckHasKeys.checkHasKeys(this.hasKey)) {
          i.flag = false;
          this.fallCount++;
          this.progress = this.fallCount / this.fallNodes.length;
          r_TriggerActionMgr.TriggerActionMgr.trigger(i.startFallAction);
        } else {
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
          this.isGameOver = true;
          this.resetPos();
        }
      }
    }
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
  };
  __decorate([_property({
    type: [r_MoveToTargetAndFall.FallInfo],
    displayName: "所有掉落的节点"
  })], _ctor.prototype, "fallNodes", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkNode", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体去清理并且碰到节点掉落")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.MoveToCleanAndFallTarget = exp_MoveToCleanAndFallTarget;