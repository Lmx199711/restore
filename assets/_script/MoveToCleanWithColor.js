var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToCleanWithColor = exports.ColorCleanInfo = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_CleanComponent = require("CleanComponent");
var r_GameKeyMgr = require("GameKeyMgr");
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_ColorCleanInfo = function () {
  function _ctor() {
    this.colorNode = null;
    this.action = "";
    this.cleanAction = "";
  }
  __decorate([_property({
    type: r_CleanComponent.default,
    displayName: "拥有CleanComponent的节点"
  })], _ctor.prototype, "cleanCom", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "颜色的节点"
  })], _ctor.prototype, "colorNode", undefined);
  __decorate([_property({
    displayName: "选择颜色之后执行的action"
  })], _ctor.prototype, "action", undefined);
  __decorate([_property({
    displayName: "清理完成之后执行的action"
  })], _ctor.prototype, "cleanAction", undefined);
  return __decorate([_ccclass("ColorCleanInfo")], _ctor);
}();
exports.ColorCleanInfo = exp_ColorCleanInfo;
var exp_MoveToCleanWithColor = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfoList = [];
    t.cleanBeginActionId = "";
    t.cleanEndActionId = "";
    t.hasKeyCanClean = [];
    t.successRemovekeys = [];
    t.successAddkeys = [];
    t.downZOrder = 0;
    t.upZOrder = 10;
    t.continueSoundName = "";
    t.successCleanAll = false;
    t.showSuccessAnim = false;
    t.successHideClean = false;
    t.successHideThis = false;
    t.minStopTime = .5;
    t.touchEndAction = "";
    t.inCleanPolygon = false;
    t.cleanProgress = 0;
    t.isGameOver = false;
    t.isInitClean = false;
    t.isResetPos = false;
    t.isSuccess = false;
    t._canClean = false;
    t.curColorIndex = 0;
    t.selectColorIndex = -1;
    t.curStopTime = 0;
    t.canAddStopTime = false;
    t.preSelectColorIndex = -1;
    t.isTouchEnd = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
  };
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.initClean();
    this.node._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.initClean = function () {
    if (!this.isInitClean) {
      for (var e = 0; e < this.cleanInfoList.length; e++) {
        var t = this.cleanInfoList[e].cleanCom;
        t.node.width < 10 && (t.node.width = 1334);
        t.node.height < 10 && (t.node.height = 750);
        t.initPoints();
      }
      this.cleanInfoList[this.curColorIndex].cleanCom.startClean(this.cleanSuccess.bind(this), this.cleanToolHead, this.updateCleanProgress.bind(this));
      this.isInitClean = true;
      console.log("清理初始化");
    }
  };
  _ctor.prototype.cleanSuccess = function () {
    this.cleanProgress = 1;
    if (this.curColorIndex < this.cleanInfoList.length - 1 && !this.isSuccess && this.cleanProgress >= 1 && (0 == this.hasKeyCanClean.length || r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean))) {
      this.isTouchEnd = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.touchEndAction);
      this.selectColorIndex = -1;
      this.preSelectColorIndex = -1;
      this.resetPos();
      this.checkEnd();
    }
  };
  _ctor.prototype.checkEnd = function () {
    this.isSuccess = true;
    this.successHideClean && (this.cleanInfoList[this.curColorIndex].cleanCom.node.active = false);
    if (this.successCleanAll) {
      this.cleanInfoList[this.curColorIndex].cleanCom.cleanCompeleted();
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanInfoList[this.curColorIndex].cleanAction);
      this.curColorIndex = this.curColorIndex + 1;
      this.showSuccessAnim;
      if (this.cleanInfoList[this.curColorIndex]) {
        this.isSuccess = false;
        this.cleanProgress = 0;
        this.cleanInfoList[this.curColorIndex].cleanCom.startClean(this.cleanSuccess.bind(this), this.cleanToolHead, this.updateCleanProgress.bind(this));
      } else {
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
        this.successHideThis && (this.node.active = false);
        this.cleanCompeleted();
      }
    }
  };
  _ctor.prototype.updateCleanProgress = function (e) {
    1 != this.cleanProgress && (this.cleanProgress = e);
  };
  _ctor.prototype.setCanClean = function (e) {
    if (!(0 != this.hasKeyCanClean.length && !r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean) || this.curColorIndex != this.selectColorIndex)) {
      this._canClean = e;
      this.cleanInfoList[this.curColorIndex].cleanCom.setCanTouchMask(e);
    }
  };
  _ctor.prototype.onDragStart = function (t) {
    this.isTouchEnd = false;
    this.upNode && (this.upNode.active = true);
    this.downNode && (this.downNode.active = false);
    this.isGameOver = false;
    this.inCleanPolygon = false;
    e.prototype.onDragStart.call(this, t);
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.playSound(this.continueSoundName, true);
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.node.zIndex = this.upZOrder;
    this.initClean();
    if (!this.isResetPos) {
      this.isResetPos = true;
      this.cleanInfoList[this.curColorIndex].cleanCom.initPoints();
    }
    this._canClean = false;
    r_CheckHasKeys.checkHasKeys(this.hasKey) && this.setCanClean(true);
  };
  _ctor.prototype.checkInCleanPolygon = function () {
    if (this.inCleanPolygon) {
      if (!this.nodeOverOtherNode(this.cleanToolHead, this.cleanInfoList[this.curColorIndex].cleanCom.node)) {
        this.inCleanPolygon = false;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
      }
    } else if (this.nodeOverOtherNode(this.cleanToolHead, this.cleanInfoList[this.curColorIndex].cleanCom.node)) {
      this.inCleanPolygon = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanBeginActionId);
    }
  };
  _ctor.prototype.triggerError = function () {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.dragEndActionId);
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
    this.resetPos();
    this.isGameOver = true;
    this.inCleanPolygon = false;
  };
  _ctor.prototype.checkFail = function () {
    if (!r_CheckHasKeys.checkHasKeys(this.hasKey) || this.curColorIndex != this.selectColorIndex) {
      if (this.errorCollider && this.errorHead) {
        var e = this.errorHead;
        e || (e = this.node);
        var t = this.errorCollider.node.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.Vec2.ZERO));
        cc.Intersection.pointInPolygon(t, this.errorCollider.points) && this.triggerError();
      } else {
        this.triggerError();
      }
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isTouchEnd || this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    if (!this.isTouchEnd) {
      e.prototype._OnDragMove.call(this, t);
      this.checkFail(t);
      this.checkInCleanPolygon();
      this.checkSelectColor();
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.touchEndAction);
    this.selectColorIndex = -1;
    this.preSelectColorIndex = -1;
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
    this.upNode && (this.upNode.active = false);
    this.downNode && (this.downNode.active = true);
    this.isGameOver = false;
    e.prototype.onDragEnd.call(this, t);
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    this.node.zIndex = this.downZOrder;
    this.setCanClean(false);
    this.resetPos();
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
    this.isTouchEnd || this.curColorIndex == this.cleanInfoList.length - 1 && !this.isSuccess && this.cleanProgress >= 1 && (0 == this.hasKeyCanClean.length || r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean)) && this.checkEnd();
  };
  _ctor.prototype.checkSelectColor = function () {
    for (var e = 0; e < this.cleanInfoList.length; e++) {
      if (this.nodeOverOtherNode(this.cleanToolHead, this.cleanInfoList[e].colorNode)) {
        this.preSelectColorIndex != e && (this.curStopTime = 0);
        this.canAddStopTime = true;
        return void (this.preSelectColorIndex = e);
      }
    }
    this.canAddStopTime = false;
  };
  _ctor.prototype.update = function (e) {
    if (this.canAddStopTime && this.curStopTime < this.minStopTime) {
      this.curStopTime += e;
      if (this.curStopTime >= this.minStopTime) {
        this.selectColorIndex = this.preSelectColorIndex;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanInfoList[this.selectColorIndex].action);
        r_CheckHasKeys.checkHasKeys(this.hasKey) && this.setCanClean(true);
      }
    }
  };
  _ctor.prototype.cleanCompeleted = function () {
    for (var e = 0; e < this.successAddkeys.length; e++) {
      var t = this.successAddkeys[e];
      r_GameKeyMgr.GameKeyMgr.has(t.key) || r_GameKeyMgr.GameKeyMgr.add(t.key);
    }
    for (e = 0; e < this.successRemovekeys.length; e++) {
      t = this.successRemovekeys[e];
      r_GameKeyMgr.GameKeyMgr.has(t.key) && r_GameKeyMgr.GameKeyMgr.remove(t.key);
    }
  };
  __decorate([_property({
    type: [exp_ColorCleanInfo],
    displayName: "颜色信息列表"
  })], _ctor.prototype, "cleanInfoList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "清理的原点"
  })], _ctor.prototype, "cleanToolHead", undefined);
  __decorate([_property({
    displayName: "每一次拖动，开始清理时的action"
  })], _ctor.prototype, "cleanBeginActionId", undefined);
  __decorate([_property({
    displayName: "每一次拖动，结束清理时的action"
  })], _ctor.prototype, "cleanEndActionId", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以清理"
  })], _ctor.prototype, "hasKeyCanClean", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "执行成功action时需要移除的key"
  })], _ctor.prototype, "successRemovekeys", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "执行成功action时需要存储的key"
  })], _ctor.prototype, "successAddkeys", undefined);
  __decorate([_property({
    type: Number,
    displayName: "放下时层级"
  })], _ctor.prototype, "downZOrder", undefined);
  __decorate([_property({
    type: Number,
    displayName: "抬起时层级"
  })], _ctor.prototype, "upZOrder", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  __decorate([_property({
    displayName: "成功后自动清理所有"
  })], _ctor.prototype, "successCleanAll", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "错误检测范围碰撞框"
  })], _ctor.prototype, "errorCollider", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "错误检测点"
  })], _ctor.prototype, "errorHead", undefined);
  __decorate([_property({
    displayName: "成功后隐藏清理节点"
  })], _ctor.prototype, "successHideClean", undefined);
  __decorate([_property({
    displayName: "成功后隐藏本身"
  })], _ctor.prototype, "successHideThis", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    displayName: "至少停留的时间才可以选中颜色"
  })], _ctor.prototype, "minStopTime", undefined);
  __decorate([_property({
    displayName: "放下时的action"
  })], _ctor.prototype, "touchEndAction", undefined);
  return __decorate([_ccclass, _menu("Action/事件/选取颜色去清理")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToCleanWithColor = exp_MoveToCleanWithColor;