Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanNodeInfo = exports.CleanScaleInfo = exports.CleanOpacityInfo = undefined;
var r_CleanComponent = require("CleanComponent");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_CleanOpacityInfo = function () {
  function _ctor() {
    this.opacityNode = null;
    this.opacityBegin = 0;
    this.opacityEnd = 255;
    this.setBeginOpacity = 0;
  }
  __decorate([_property({
    displayName: "根据进度透明的节点",
    type: cc.Node
  })], _ctor.prototype, "opacityNode", undefined);
  __decorate([_property({
    displayName: "透明的初始值",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "opacityBegin", undefined);
  __decorate([_property({
    displayName: "透明的目标值",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "opacityEnd", undefined);
  __decorate([_property({
    displayName: "透明目标节点的初始透明度",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "setBeginOpacity", undefined);
  return __decorate([_ccclass("CleanOpacityInfo")], _ctor);
}();
exports.CleanOpacityInfo = exp_CleanOpacityInfo;
var exp_CleanScaleInfo = function () {
  function _ctor() {
    this.scaleNode = null;
    this.scaleBegin = cc.v2(0, 0);
    this.scaleEnd = cc.v2(1, 1);
    this.setBeginScale = cc.v2(0, 0);
  }
  __decorate([_property({
    displayName: "根据进度缩放的节点",
    type: cc.Node
  })], _ctor.prototype, "scaleNode", undefined);
  __decorate([_property({
    displayName: "缩放的初始值",
    visible: function () {
      return null != this.scaleNode;
    }
  })], _ctor.prototype, "scaleBegin", undefined);
  __decorate([_property({
    displayName: "缩放的目标值",
    visible: function () {
      return null != this.scaleNode;
    }
  })], _ctor.prototype, "scaleEnd", undefined);
  __decorate([_property({
    displayName: "缩放目标节点的初始缩放",
    visible: function () {
      return null != this.scaleNode;
    }
  })], _ctor.prototype, "setBeginScale", undefined);
  return __decorate([_ccclass("CleanScaleInfo")], _ctor);
}();
exports.CleanScaleInfo = exp_CleanScaleInfo;
var exp_CleanNodeInfo = function () {
  function _ctor() {
    this.cleanCom = null;
    this.onClearBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.onClearFinishedBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.scaleArg = cc.v3(1, 0, 0);
    this.isAdd = false;
    this.startX = 0;
    this.startY = 0;
    this.opacityNode = null;
    this.opacityBegin = 0;
    this.opacityEnd = 255;
    this.setBeginOpacity = 0;
    this.cleanOpacityInfos = [];
    this.cleanScaleInfos = [];
    this.progress = 0;
    this.isFinished = false;
    this.isCompleted = false;
  }
  _ctor.prototype.init = function (e, t) {
    undefined === t && (t = null);
    this.listener = t;
    this.checkNode = e;
    if (this.scaleNode) {
      this.startX = this.scaleNode.scaleX;
      this.startY = this.scaleNode.scaleY;
      this.scaleNode.scaleX = 1;
    }
    this.opacityNode && (this.opacityNode.opacity = this.setBeginOpacity);
    for (var o = 0; o < this.cleanOpacityInfos.length; o++) {
      (i = this.cleanOpacityInfos[o]).opacityNode.opacity = i.setBeginOpacity;
    }
    for (o = 0; o < this.cleanScaleInfos.length; o++) {
      var i;
      (i = this.cleanScaleInfos[o]).scaleNode.scaleX = i.setBeginScale.x;
      i.scaleNode.scaleY = i.setBeginScale.y;
    }
    if (this.cleanCom) {
      this.cleanCom.initPoints();
      this.cleanCom.setCleanInfo(this.onCleanSuccess.bind(this), e, this.onCleanProgressCallback.bind(this));
    } else {
      console.warn("没有绑定清理节点!");
    }
  };
  _ctor.prototype.clean = function () {
    this.cleanCom.checkTouch();
  };
  _ctor.prototype.cleanEnter = function () {
    this.cleanCom.cleanEnd();
  };
  _ctor.prototype.cleanEnd = function () {
    this.cleanCom.cleanEnd();
  };
  _ctor.prototype.resetToOriState = function (e) {
    if (this.cleanCom) {
      this.cleanCom.resetToOriState1();
      this.isCompleted = false;
      this.progress = 0;
      this.isFinished = false;
    }
    this.cleanCom.setCleanInfo(this.onCleanSuccess.bind(this), e, this.onCleanProgressCallback.bind(this));
  };
  _ctor.prototype.onCleanSuccess = function () {
    this.listener && this.listener.onCleanSuccess(this);
    this.isFinished = true;
    this.progress = 1;
    this.onClearFinishedBehavior && this.onClearFinishedBehavior.execute();
  };
  _ctor.prototype.onCleanProgressCallback = function (e) {
    this.progress < 1 && (this.progress = e);
    this.listener && this.listener.onCleanProgress(this, e);
    this.onClearBehavior && this.onClearBehavior.execute();
    if (this.scaleNode) {
      if (0 != this.scaleArg.x) {
        if (this.isAdd) {
          this.scaleNode.scaleX = this.startX + e * (this.scaleArg.x - this.startX);
        } else {
          this.scaleNode.scaleX = e * this.scaleArg.x;
        }
      }
      if (0 != this.scaleArg.y) {
        if (this.isAdd) {
          this.scaleNode.scaleY = this.startY + e * (this.scaleArg.y - this.startY);
        } else {
          this.scaleNode.scaleY = e * this.scaleArg.y;
        }
      }
      this.scaleNode.angle = e * this.scaleArg.z;
    }
    this.opacityNode && (this.opacityNode.opacity = e * (this.opacityEnd - this.opacityBegin) + this.opacityBegin);
    for (var t = 0; t < this.cleanOpacityInfos.length; t++) {
      (o = this.cleanOpacityInfos[t]).opacityNode.opacity = e * (o.opacityEnd - o.opacityBegin) + o.opacityBegin;
    }
    for (t = 0; t < this.cleanScaleInfos.length; t++) {
      var o;
      (o = this.cleanScaleInfos[t]).scaleNode.scaleX = e * (o.scaleEnd.x - o.scaleBegin.x) + o.scaleBegin.x;
      o.scaleNode.scaleY = e * (o.scaleEnd.y - o.scaleBegin.y) + o.scaleBegin.y;
    }
  };
  _ctor.prototype.checkCleanCompleted = function () {
    if (!(this.isCompleted || this.progress < 1)) {
      this.isCompleted = true;
      this.scaleNode && (this.scaleNode.scaleX = this.scaleNode.scaleY = 1);
      this.opacityNode && (this.opacityNode.opacity = this.opacityEnd);
      for (var e = 0; e < this.cleanOpacityInfos.length; e++) {
        (t = this.cleanOpacityInfos[e]).opacityNode.opacity = t.opacityEnd;
      }
      for (e = 0; e < this.cleanScaleInfos.length; e++) {
        var t;
        (t = this.cleanScaleInfos[e]).scaleNode.scaleX = t.scaleEnd.x;
        t.scaleNode.scaleY = t.scaleEnd.y;
      }
      this.cleanCom.cleanCompeleted();
    }
  };
  __decorate([_property({
    displayName: "清理节点",
    type: r_CleanComponent.default
  })], _ctor.prototype, "cleanCom", undefined);
  __decorate([_property({
    displayName: "清理时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "onClearBehavior", undefined);
  __decorate([_property({
    displayName: "清理完成时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "onClearFinishedBehavior", undefined);
  __decorate([_property({
    displayName: "根据进度缩放的节点",
    type: cc.Node
  })], _ctor.prototype, "scaleNode", undefined);
  __decorate([_property({
    displayName: "缩放参数",
    tooltip: "(xy代表缩放(0表示不变),z代表旋转)",
    type: cc.Vec3,
    visible: function () {
      return null != this.scaleNode;
    }
  })], _ctor.prototype, "scaleArg", undefined);
  __decorate([_property({
    displayName: "是否以当前大小开始缩放",
    tooltip: "勾选则代表不是从开始缩放",
    visible: function () {
      return null != this.scaleNode;
    }
  })], _ctor.prototype, "isAdd", undefined);
  __decorate([_property({
    displayName: "根据进度透明的节点",
    type: cc.Node
  })], _ctor.prototype, "opacityNode", undefined);
  __decorate([_property({
    displayName: "透明的初始值",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "opacityBegin", undefined);
  __decorate([_property({
    displayName: "透明的目标值",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "opacityEnd", undefined);
  __decorate([_property({
    displayName: "透明目标节点的初始透明度",
    type: cc.Integer,
    visible: function () {
      return null != this.opacityNode;
    }
  })], _ctor.prototype, "setBeginOpacity", undefined);
  __decorate([_property({
    displayName: "需要根据进度透明的节点列表",
    type: [exp_CleanOpacityInfo]
  })], _ctor.prototype, "cleanOpacityInfos", undefined);
  __decorate([_property({
    displayName: "需要根据进度缩放的节点列表",
    type: [exp_CleanScaleInfo]
  })], _ctor.prototype, "cleanScaleInfos", undefined);
  return __decorate([_ccclass("CleanNodeInfo")], _ctor);
}();
exports.CleanNodeInfo = exp_CleanNodeInfo;