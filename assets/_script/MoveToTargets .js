var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTargets = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = function () {
  function e() {
    this.targetPos = null;
    this.startAction = "";
    this.delayEndAction = 1;
    this.endAction = "";
    this.hasKey = [];
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "拖动到的目标位置"
  })], e.prototype, "targetPos", undefined);
  __decorate([_property({
    displayName: "拖动到目标节点时抬起的action"
  })], e.prototype, "startAction", undefined);
  __decorate([_property({
    displayName: "延迟执行抬起的action的时间"
  })], e.prototype, "delayEndAction", undefined);
  __decorate([_property({
    displayName: "抬起时延迟执行的action"
  })], e.prototype, "endAction", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,不执行action"
  })], e.prototype, "hasKey", undefined);
  return __decorate([_ccclass("MoveToTargetInfo")], e);
}();
var exp_MoveToTargets = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCheckActive = true;
    t.moveToTargetInfo = [];
    t.checkPoint = null;
    t.touchEndCheck = false;
    t.successHideNode = false;
    t.flag = [];
    t.curIndex = -1;
    t.isDown = false;
    t.isCompleted = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    null == this.checkPoint && (this.checkPoint = this.node);
    this.flag.length = this.moveToTargetInfo.length;
    this.isCompleted = false;
  };
  _ctor.prototype.hitTest = function () {
    return e.prototype.hitTest.call(this) && this.node.active;
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.isDown = true;
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isDown && e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.touchEndCheck || this.checkFinish();
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    if (this.touchEndCheck) {
      this.checkFinish();
      this.resetPos();
    } else {
      this.resetPos();
    }
  };
  _ctor.prototype.checkFinish = function () {
    var e = function (e) {
      var o = t.moveToTargetInfo[e];
      if ((t.isCheckActive || o.targetPos.activeInHierarchy) && 1 != t.flag[e] && t.nodeOverOtherNode(t.checkPoint, o.targetPos)) {
        t.isDown = false;
        t.resetPos();
        if (!r_CheckHasKeys.checkHasKeys(t.hasKey)) {
          r_TriggerActionMgr.TriggerActionMgr.trigger(t.failTriggerActionId);
          return {
            value: undefined
          };
        }
        if (o.hasKey.length > 0 && r_CheckHasKeys.checkHasKeys(o.hasKey)) {
          return "continue";
        }
        t.flag[e] = 1;
        r_TriggerActionMgr.TriggerActionMgr.trigger(o.startAction);
        var i = setTimeout(function () {
          r_TriggerActionMgr.TriggerActionMgr.trigger(o.endAction);
        }, 1e3 * o.delayEndAction);
        t.timeOutIndex.push(i);
        t.successHideNode && (t.checkPoint.active = false);
      }
    };
    var t = this;
    for (var o = 0; o < this.moveToTargetInfo.length; o++) {
      var i = e(o);
      if ("object" == typeof i) {
        return i.value;
      }
    }
    var n = true;
    for (o = 0; o < this.flag.length; o++) {
      if (1 != this.flag[o]) {
        n = false;
        break;
      }
    }
    if (n && !this.isCompleted) {
      this.isCompleted = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.resetPos();
    }
  };
  __decorate([_property({
    displayName: "是否检测隐藏的polygon"
  })], _ctor.prototype, "isCheckActive", undefined);
  __decorate([_property({
    type: [d],
    displayName: "拖动到的目标节点和行为信息"
  })], _ctor.prototype, "moveToTargetInfo", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkPoint", undefined);
  __decorate([_property({
    displayName: "抬起再检测"
  })], _ctor.prototype, "touchEndCheck", undefined);
  __decorate([_property({
    displayName: "成功后隐藏本身"
  })], _ctor.prototype, "successHideNode", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动道具到指定位置执行action,n秒之后结束结束action,可以设置多个,全部拖动到指定位置执行完action,才算结束")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToTargets = exp_MoveToTargets;