var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToTarget = exports.TriggerTiming = undefined;
var s;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyMgr = require("GameKeyMgr");
(function (e) {
  e[e["移动Move时"] = 0] = "移动Move时";
  e[e["抬起End时"] = 1] = "抬起End时";
})(s = exports.TriggerTiming || (exports.TriggerTiming = {}));
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = function () {
  function e() {
    this.needCheckKeys = [];
    this.needAction = "";
  }
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,抬起触发action"
  })], e.prototype, "needCheckKeys", undefined);
  __decorate([_property({
    type: [cc.String],
    displayName: "当有这些key时,抬起触发action"
  })], e.prototype, "needAction", undefined);
  return __decorate([_ccclass("MoveToolToTargetUpInfo")], e);
}();
var exp_MoveToolToTarget = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.triggerTiming = s.抬起End时;
    t.checkPoint = null;
    t.isCheckOnce = true;
    t.isChecked = false;
    t.isDown = false;
    t.isCheckUnactive = true;
    t.successRemovekeys = [];
    t.successTriggerActionIds = [];
    t.isBackOrigPos = false;
    t.isBackOrigPos2 = false;
    t.needUpAction = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.isChecked = false;
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.isChecked = false;
      this.isDown = true;
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
    if (!this.checkHasNotClickKey()) {
      this.triggerTiming == s.抬起End时 && this.checkTrigger(t);
      e.prototype.onDragEnd.call(this, t);
      this.isDown = false;
      this.checkEndAction();
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    if (this.isDown) {
      this.triggerTiming == s.移动Move时 && this.checkTrigger(t);
      e.prototype.onDragMove.call(this, t);
    }
  };
  _ctor.prototype.checkTrigger = function (e) {
    var t;
    if ((this.triggerTiming != s.移动Move时 || !this.isCheckOnce || !this.isChecked) && (t = this.checkPoint ? this.checkPoint.convertToWorldSpaceAR(cc.Vec2.ZERO) : e.getLocation(), this.targetPolygon)) {
      this.targetPolygon.node.convertToNodeSpaceAR(t, this._vec2_temp);
      if ((this.isCheckUnactive || this.targetPolygon.node.active) && cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points)) {
        this.isChecked = true;
        var o = true;
        var i = function (e) {
          var t = n.hasKey[e].key;
          if (r_GameKeyMgr.GameKeyMgr.has(t)) {
            r_TriggerActionMgr.TriggerActionMgr.trigger(n.successTriggerActionIds[e]);
            o = false;
            -1 != n.successRemovekeys.findIndex(function (e) {
              return e.key == t;
            }) && r_GameKeyMgr.GameKeyMgr.remove(t);
          }
        };
        var n = this;
        for (var a = 0; a < this.hasKey.length; a++) {
          i(a);
        }
        o && r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
        if (this.isBackOrigPos) {
          this.isDown = false;
          this.resetPos();
        }
      } else if (this.isBackOrigPos2) {
        this.isDown = false;
        this.resetPos();
      }
    }
  };
  _ctor.prototype.checkEndAction = function () {
    for (var e = 0; e < this.needUpAction.length; e++) {
      var t = this.needUpAction[e];
      r_CheckHasKeys.checkHasKeys(t.needCheckKeys) && r_TriggerActionMgr.TriggerActionMgr.trigger(t.needAction);
    }
  };
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "拖动的目标区域"
  })], _ctor.prototype, "targetPolygon", undefined);
  __decorate([_property({
    type: cc.Enum(s),
    displayName: "触发成功的时机"
  })], _ctor.prototype, "triggerTiming", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkPoint", undefined);
  __decorate([_property({
    displayName: "移动触发是否只触发一次"
  })], _ctor.prototype, "isCheckOnce", undefined);
  __decorate([_property({
    displayName: "是否检测隐藏的polygon"
  })], _ctor.prototype, "isCheckUnactive", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "执行成功action时需要移除的key"
  })], _ctor.prototype, "successRemovekeys", undefined);
  __decorate([_property({
    type: [cc.String],
    displayName: "所有key检查通过时触发的多个action"
  })], _ctor.prototype, "successTriggerActionIds", undefined);
  __decorate([_property({
    displayName: "触发成功时是否回到原地"
  })], _ctor.prototype, "isBackOrigPos", undefined);
  __decorate([_property({
    displayName: "不触发是否回到原地"
  })], _ctor.prototype, "isBackOrigPos2", undefined);
  __decorate([_property({
    type: f,
    displayName: "抬起时根据key触发action"
  })], _ctor.prototype, "needUpAction", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动道具移动到指定目标")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToolToTarget = exp_MoveToolToTarget;