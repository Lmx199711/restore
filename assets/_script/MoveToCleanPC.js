var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToCleanPC = exports.ActionColliderInfo = undefined;
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
var exp_ActionColliderInfo = function () {
  function _ctor() {
    this.action = "";
    this.isTrigger = false;
  }
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "碰撞框"
  })], _ctor.prototype, "polygonCollider", undefined);
  __decorate([_property({
    displayName: "碰到后后执行的action"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("ActionColliderInfo")], _ctor);
}();
exports.ActionColliderInfo = exp_ActionColliderInfo;
var exp_MoveToCleanPC = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleansCom = [];
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
    t.fallNodes = [];
    t.canRepeatUse = false;
    t.triggerActionColliders = [];
    t.notFinishReset = false;
    t.inCleanPolygon = false;
    t.cleanProgress = 0;
    t.isGameOver = false;
    t.isInitClean = false;
    t.isResetPos = false;
    t.isSuccess = false;
    t._canClean = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
  };
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    if (null != this.cleanCom) {
      this.targetPolygon = this.cleanCom.getComponent(cc.PolygonCollider);
      this.initClean();
      this.node._touchListener.setSwallowTouches(false);
      if (this.fallRoot) {
        this.fallNodes = [];
        for (var t = 0; t < this.fallRoot.children.length; t++) {
          this.fallNodes.push(this.fallRoot.children[t]);
        }
      }
    } else {
      console.error("没有设置清理的节点：", this.node.name);
    }
  };
  _ctor.prototype.initClean = function () {
    if (!this.isInitClean) {
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
    if (0 == this.hasKeyCanClean.length || r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean)) {
      this._canClean = e;
      this.cleanCom.setCanTouchMask(e);
      for (var t = 0; t < this.cleansCom.length; t++) {
        this.cleansCom[t].setCanTouchMask(e);
      }
    }
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      this.upNode && (this.upNode.active = true);
      this.downNode && (this.downNode.active = false);
    }
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
      this.cleanCom.initPoints();
    }
    this._canClean = false;
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
    if (!r_CheckHasKeys.checkHasKeys(this.hasKey)) {
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
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkFail(t);
    this.checkFallNode(t);
    this.checkInCleanPolygon();
    this.checkTriggerNode(t);
  };
  _ctor.prototype.checkTriggerNode = function () {
    if (this._canClean && !this.isSuccess) {
      var e = this.cleanToolHead.convertToWorldSpaceAR(cc.Vec2.ZERO);
      for (var t = 0; t < this.triggerActionColliders.length; t++) {
        var o = this.triggerActionColliders[t];
        if (!o.isTrigger) {
          var i = o.polygonCollider.node.parent.convertToNodeSpaceAR(e);
          if (cc.Intersection.pointInPolygon(i, o.polygonCollider.points)) {
            o.isTrigger = true;
            r_TriggerActionMgr.TriggerActionMgr.trigger(o.action);
          }
        }
      }
    }
  };
  _ctor.prototype.checkFallNode = function () {
    if (this._canClean && !this.isSuccess) {
      var e = this.cleanToolHead.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var t = function (t) {
        var i = o.fallNodes[t];
        if (i.isFinish) {
          return "continue";
        }
        var n = i.convertToWorldSpaceAR(cc.Vec2.ZERO);
        if (cc.Vec2.distance(e, n) <= o.cleanCom.circleRadio) {
          i.isFinish = true;
          i.active = true;
          cc.tween(i).by(.5, {
            y: -1e3
          }).call(function () {
            i.active = false;
          }).start();
        }
      };
      var o = this;
      for (var i = 0; i < this.fallNodes.length; i++) {
        t(i);
      }
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
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
    if ((this.canRepeatUse || !this.isSuccess) && this.cleanProgress >= 1 && (0 == this.hasKeyCanClean.length || r_CheckHasKeys.checkHasKeys(this.hasKeyCanClean))) {
      this.isSuccess = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.showSuccessAnim;
      this.successHideClean && (this.cleanCom.node.active = false);
      this.successHideThis && (this.node.active = false);
      if (this.successCleanAll) {
        this.cleanCom.cleanCompeleted();
        for (var o = 0; o < this.cleansCom.length; o++) {
          this.cleansCom[o].cleanCompeleted();
        }
      }
      this.cleanCompeleted();
    } else {
      this.cleanProgress < 1 && this.notFinishReset && this.cleanCom.resetAll();
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
    type: [cc.Node],
    displayName: "所有掉落的节点"
  })], _ctor.prototype, "fallNodes", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "掉落根节点"
  })], _ctor.prototype, "fallRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    displayName: "可以重复使用"
  })], _ctor.prototype, "canRepeatUse", undefined);
  __decorate([_property({
    type: [exp_ActionColliderInfo],
    displayName: "碰撞触发列表"
  })], _ctor.prototype, "triggerActionColliders", undefined);
  __decorate([_property({
    displayName: "未完成重置所有"
  })], _ctor.prototype, "notFinishReset", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体去清理PC")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToCleanPC = exp_MoveToCleanPC;