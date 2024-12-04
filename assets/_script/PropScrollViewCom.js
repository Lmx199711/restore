var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckCondition = undefined;
var r_CheckHasKeys = require("CheckHasKeys");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_CheckCondition = function () {
  function _ctor() {
    this.propName = "";
    this.dragSpr_normal = null;
    this.isCanCombine = false;
    this.combinedKey = "";
    this.dragSpr_combine = null;
    this.dargScale = 1;
    this.checkKey = "";
    this.checkNode = null;
    this.behaviorId = "";
  }
  __decorate([_property({
    displayName: "道具名",
    tooltip: "只显示无实际意义"
  })], _ctor.prototype, "propName", undefined);
  __decorate([_property({
    displayName: "拖动时显示图",
    type: cc.SpriteFrame
  })], _ctor.prototype, "dragSpr_normal", undefined);
  __decorate([_property({
    displayName: "是否可合成"
  })], _ctor.prototype, "isCanCombine", undefined);
  __decorate([_property({
    displayName: "合成后保存的key",
    tooltip: "用来检测拖动是使用哪张图",
    visible: function () {
      return this.isCanCombine;
    }
  })], _ctor.prototype, "combinedKey", undefined);
  __decorate([_property({
    displayName: "拖动时显示图",
    type: cc.SpriteFrame,
    tooltip: "用来检测拖动是使用哪张图",
    visible: function () {
      return this.isCanCombine;
    }
  })], _ctor.prototype, "dragSpr_combine", undefined);
  __decorate([_property({
    displayName: "拖动时缩放",
    type: cc.Float
  })], _ctor.prototype, "dargScale", undefined);
  __decorate([_property({
    displayName: "使用道具检测key"
  })], _ctor.prototype, "checkKey", undefined);
  __decorate([_property({
    displayName: "检测节点",
    type: cc.Node
  })], _ctor.prototype, "checkNode", undefined);
  __decorate([_property({
    displayName: "检测成功行为id"
  })], _ctor.prototype, "behaviorId", undefined);
  return __decorate([_ccclass("CheckCondition")], _ctor);
}();
exports.CheckCondition = exp_CheckCondition;
var def_PropScrollViewCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.canNotClickKey = [];
    t.behaviorId = "";
    t.delayTime = 4;
    t.checkAreaArr = [];
    t.wrongBehaviorId = [];
    t.scrollView = null;
    t.handNode = null;
    t.currPropInfoArr = [];
    t.content = null;
    t.touchNode = null;
    t.isCanTouch = true;
    t.currCheckInfo = null;
    t.useNum = 0;
    t.isTouchStart = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.content = this.scrollView.content;
    this.registToolTouch();
  };
  _ctor.prototype.registToolTouch = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.mouseItemStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseItemMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.mouseItemEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.mouseItemEnd, this);
  };
  _ctor.prototype.endOffTouch = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.mouseItemStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.mouseItemMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.mouseItemEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.mouseItemEnd, this);
  };
  _ctor.prototype.mouseItemStart = function (e) {
    if (this.checkHasNotClickKey()) {
      this.isTouchStart = false;
    } else {
      this.isTouchStart = true;
      var t = this.scrollView.node.parent.convertToNodeSpaceAR(e.getLocation());
      if (this.scrollView.node.getBoundingBox().contains(t)) {
        this.scrollView.enabled = true;
        if (this.isCanTouch) {
          var o = this.content.convertToNodeSpaceAR(e.getLocation());
          for (var i = 0; i < this.content.childrenCount; i++) {
            var n = this.content.children[i];
            n.getBoundingBox().contains(o) && (this.touchNode = n);
          }
          if (this.touchNode) {
            this.handNode.active = true;
            this.handNode.scale = 0;
            this.handNode.angle = -0;
            this.handNode.worldPosition = e.getLocation();
            var a = this.touchNode.getSiblingIndex();
            this.currCheckInfo = this.currPropInfoArr[a];
            this.updateHandNodeSpr();
          }
        }
      } else {
        this.scrollView.enabled = false;
      }
    }
  };
  _ctor.prototype.mouseItemMove = function (e) {
    if (this.isTouchStart && this.touchNode) {
      var t = this.content.convertToNodeSpaceAR(e.getLocation()).y - this.touchNode.y;
      if (this.scrollView.enabled && t >= 100) {
        this.scrollView.enabled = false;
        this.handNode.scale = this.currCheckInfo.dargScale;
      }
      this.handNode.worldPosition = e.getLocation();
    }
  };
  _ctor.prototype.mouseItemEnd = function () {
    var e = this;
    if (this.isTouchStart && this.touchNode) {
      var t = this.checkPutResult(this.currCheckInfo);
      console.log("........mouseItemEnd", t);
      if (1 == t) {
        this.handNode.active = false;
        this.handNode.scale = 0;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.currCheckInfo.behaviorId);
        this.touchNode.active = false;
        this.useNum += 1;
        this.checkPropUse();
      } else {
        var o = this.touchNode.parent.convertToWorldSpaceAR(this.touchNode.getPosition());
        var i = this.handNode.parent.convertToNodeSpaceAR(o);
        this.isCanTouch = false;
        if (2 == t) {
          for (var n = 0; n < this.wrongBehaviorId.length; n++) {
            r_TriggerActionMgr.TriggerActionMgr.trigger(this.wrongBehaviorId[n]);
          }
        }
        cc.tween(this.handNode).delay(.3).to(.3, {
          scale: 0
        }).start();
        cc.tween(this.handNode).to(.6, {
          x: i.x,
          y: i.y,
          angle: 360
        }).call(function () {
          e.isCanTouch = true;
        }).start();
      }
      this.scrollView.enabled = true;
      this.touchNode = null;
      this.currCheckInfo = null;
    }
  };
  _ctor.prototype.updateHandNodeSpr = function () {
    if (this.currCheckInfo.isCanCombine && r_GameKeyMgr.GameKeyMgr.has(this.currCheckInfo.combinedKey)) {
      this.handNode.spriteCom.spriteFrame = this.currCheckInfo.dragSpr_combine;
    } else {
      this.handNode.spriteCom.spriteFrame = this.currCheckInfo.dragSpr_normal;
    }
  };
  _ctor.prototype.checkPutResult = function (e) {
    var t = 0;
    if (e) {
      var o = null;
      if ("" == e.checkKey || r_GameKeyMgr.GameKeyMgr.has(e.checkKey)) {
        var i = this.handNode.parent.convertToWorldSpaceAR(this.handNode.getPosition());
        for (var n = 0; n < this.checkAreaArr.length; n++) {
          var a = this.checkAreaArr[n];
          var s = a.parent.convertToNodeSpaceAR(i);
          if (a.getBoundingBox().contains(s)) {
            o = a;
            break;
          }
        }
        o && (t = o.name == e.checkNode.name ? 1 : 2);
      }
    }
    return t;
  };
  _ctor.prototype.checkPropUse = function () {
    var e = this;
    if (this.useNum == this.content.childrenCount) {
      this.scheduleOnce(function () {
        r_TriggerActionMgr.TriggerActionMgr.trigger(e.behaviorId);
      }, this.delayTime);
      this.endOffTouch();
    }
  };
  _ctor.prototype.checkHasNotClickKey = function () {
    return this.canNotClickKey.length > 0 && r_CheckHasKeys.checkHasKeys(this.canNotClickKey);
  };
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,无法点击或者拖动"
  })], _ctor.prototype, "canNotClickKey", undefined);
  __decorate([_property({
    displayName: "道具使用完毕的行为"
  })], _ctor.prototype, "behaviorId", undefined);
  __decorate([_property({
    displayName: "道具使用延迟时间",
    type: cc.Float
  })], _ctor.prototype, "delayTime", undefined);
  __decorate([_property({
    displayName: "检测范围",
    type: cc.Node
  })], _ctor.prototype, "checkAreaArr", undefined);
  __decorate([_property({
    displayName: "拖动错误行为",
    type: cc.String
  })], _ctor.prototype, "wrongBehaviorId", undefined);
  __decorate([_property({
    displayName: "滑动组件",
    type: cc.ScrollView
  })], _ctor.prototype, "scrollView", undefined);
  __decorate([_property({
    displayName: "移动节点",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  __decorate([_property({
    displayName: "道具配置",
    type: exp_CheckCondition
  })], _ctor.prototype, "currPropInfoArr", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_PropScrollViewCom;