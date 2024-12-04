var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToClean = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_CleanComponent = require("CleanComponent");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_App = require("App");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_MoveToClean = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleansCom = [];
    t.cleanBeginActionId = "";
    t.cleanEndActionId = "";
    t.hasKeyCanClean = [];
    t.successRemovekeys = [];
    t.inCleanPolygon = false;
    t.cleanProgress = 0;
    t.isGameOver = false;
    t.isInitClean = false;
    t.isCompleted = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    if (null != this.cleanCom) {
      this.targetPolygon = this.cleanCom.getComponent(cc.PolygonCollider);
      this.initClean();
      this.node._touchListener.setSwallowTouches(false);
      r_App.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.initClean, this);
    } else {
      console.error("没有设置清理的节点：", this.node.name);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_App.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.initClean, this);
  };
  _ctor.prototype.initClean = function () {
    if (!this.isInitClean && (this.isCompleted = false, 0 == this.hasKeyCanClean.length || r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean))) {
      this.cleanCom.node.width < 10 && (this.cleanCom.node.width = 1334);
      this.cleanCom.node.height < 10 && (this.cleanCom.node.height = 750);
      this.cleanCom.initPoints();
      this.cleanCom.startClean(this.cleanSuccess.bind(this), this.cleanToolHead, this.updateCleanProgress.bind(this));
      for (var e = 0; e < this.cleansCom.length; e++) {
        this.cleansCom[e].initPoints();
        this.cleansCom[e].startClean(null, this.cleanToolHead);
        this.cleansCom[e].node.width < 10 && (this.cleansCom[e].node.width = 1334);
        this.cleansCom[e].node.height < 10 && (this.cleansCom[e].node.height = 750);
      }
      this.isInitClean = true;
      console.log("清理初始化");
    }
  };
  _ctor.prototype.cleanSuccess = function () {
    this.cleanProgress = 1;
  };
  _ctor.prototype.updateCleanProgress = function (e) {
    1 != this.cleanProgress && (this.cleanProgress = e);
  };
  _ctor.prototype.setCanClean = function (e) {
    this.cleanCom.setCanTouchMask(e);
    for (var t = 0; t < this.cleansCom.length; t++) {
      this.cleansCom[t].setCanTouchMask(e);
    }
  };
  _ctor.prototype.onDragStart = function (t) {
    this.isGameOver = false;
    this.inCleanPolygon = false;
    e.prototype.onDragStart.call(this, t);
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.initClean();
    r_CheckHasKeys.checkHasKeys(this.hasKey) && this.setCanClean(true);
  };
  _ctor.prototype.checkInCleanPolygon = function () {
    if (this.inCleanPolygon) {
      if (!this.nodeOverOtherNode(this.cleanToolHead, this.cleanCom.node)) {
        this.inCleanPolygon = false;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
      }
    } else if (this.nodeOverOtherNode(this.cleanToolHead, this.cleanCom.node)) {
      this.inCleanPolygon = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanBeginActionId);
      this.checkFail(null);
    }
  };
  _ctor.prototype.checkFail = function () {
    if (!r_CheckHasKeys.checkHasKeys(this.hasKey)) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.dragEndActionId);
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
      this.resetPos();
      this.isGameOver = true;
      this.inCleanPolygon = false;
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkInCleanPolygon();
  };
  _ctor.prototype.onDragEnd = function (t) {
    this.isGameOver = false;
    e.prototype.onDragEnd.call(this, t);
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    this.setCanClean(false);
    this.resetPos();
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
    if (this.cleanProgress >= 1 && !this.isCompleted) {
      this.isCompleted = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.cleanCom.cleanCompeleted();
      for (var o = 0; o < this.cleansCom.length; o++) {
        this.cleansCom[o].cleanCompeleted();
      }
      this.cleanCompeleted();
    }
  };
  _ctor.prototype.cleanCompeleted = function () {
    for (var e = 0; e < this.successRemovekeys.length; e++) {
      var t = this.successRemovekeys[e];
      r_GameKeyMgr.GameKeyMgr.has(t.key) && r_GameKeyMgr.GameKeyMgr.remove(t.key);
    }
  };
  __decorate([_property({
    type: r_CleanComponent.default,
    displayName: "拥有CleanComponent的节点"
  })], _ctor.prototype, "cleanCom", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "清理的原点"
  })], _ctor.prototype, "cleanToolHead", undefined);
  __decorate([_property({
    type: [r_CleanComponent.default],
    displayName: "清理其他位置"
  })], _ctor.prototype, "cleansCom", undefined);
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
  return __decorate([_ccclass, _menu("Action/事件/拖动物体去清理")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToClean = exp_MoveToClean;