var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrushOneByOne = undefined;
var r_MoveToClean = require("MoveToClean");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = function () {
  function e() {
    this.colorNode = null;
    this.action = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "颜色的节点"
  })], e.prototype, "colorNode", undefined);
  __decorate([_property({
    displayName: "选择颜色之后执行的action"
  })], e.prototype, "action", undefined);
  return __decorate([_ccclass("BushColorInfo")], e);
}();
var exp_BrushOneByOne = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.selectBeforeAction = "";
    t.brushColors = [];
    t.minStopTime = .5;
    t.rightColorIndex = -1;
    t.continueSoundName = "";
    t.curStopTime = 0;
    t.canAddStopTime = false;
    t.preSelectColorIndex = -1;
    t.curSelectColorIndex = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.curSelectColorIndex = -1;
  };
  _ctor.prototype.update = function (e) {
    if (this.canAddStopTime && this.curStopTime < this.minStopTime) {
      this.curStopTime += e;
      if (this.curStopTime >= this.minStopTime) {
        this.curSelectColorIndex = this.preSelectColorIndex;
        this.canAddStopTime = false;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.brushColors[this.curSelectColorIndex].action);
        this.setCanClean(true);
      }
    }
  };
  _ctor.prototype.checkFail = function (e) {
    if (e && (-1 == this.rightColorIndex || -1 != this.curSelectColorIndex)) {
      var t = e.getLocation();
      if (this.targetPolygon) {
        this.targetPolygon.node.convertToNodeSpaceAR(t, this._vec2_temp);
        if (cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points) && (-1 != this.rightColorIndex && this.curSelectColorIndex != this.curSelectColorIndex || !r_CheckHasKeys.checkHasKeys(this.hasKey))) {
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.dragEndActionId);
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
          this.node.x = this.dragNodeOriginPosX;
          this.node.y = this.dragNodeOriginPosY;
          this.isGameOver = true;
          this.inCleanPolygon = false;
        }
      }
    }
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.setCanClean(false);
      "" != this.continueSoundName && r_SoundMgr.SoundMgr.playSound(this.continueSoundName, true);
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    if (!this.checkHasNotClickKey()) {
      for (var o = 0; o < this.brushColors.length; o++) {
        if (this.nodeOverOtherNode(this.node, this.brushColors[o].colorNode)) {
          this.preSelectColorIndex != o && (this.curStopTime = 0);
          this.canAddStopTime = true;
          this.preSelectColorIndex = o;
          break;
        }
      }
      e.prototype.onDragMove.call(this, t);
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
    this.canAddStopTime = false;
    this.preSelectColorIndex = this.curSelectColorIndex = -1;
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.selectBeforeAction);
    this.checkHasNotClickKey() || e.prototype.onDragEnd.call(this, t);
  };
  __decorate([_property({
    displayName: "在未选择时的状态",
    tooltip: "在初始化的时候和抬起的时候会执行一次"
  })], _ctor.prototype, "selectBeforeAction", undefined);
  __decorate([_property({
    type: [y],
    displayName: "所有的颜色和选中颜色之后的action"
  })], _ctor.prototype, "brushColors", undefined);
  __decorate([_property({
    displayName: "至少停留的时间才可以选中颜色"
  })], _ctor.prototype, "minStopTime", undefined);
  __decorate([_property({
    displayName: "选择哪个颜色才是正确的颜色,默认所有的颜色都是正确的"
  })], _ctor.prototype, "rightColorIndex", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动到指定位置去选择一个颜色，之后才可以擦除")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.BrushOneByOne = exp_BrushOneByOne;