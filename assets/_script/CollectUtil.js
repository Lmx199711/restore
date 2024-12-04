var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectUtil = exports.CollectNode = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var r = cc.Vec2;
var r_LevelPreload = require("LevelPreload");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_CollectNode = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.collectNode = null;
    t.moveNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.trigger = function () {
    return false;
  };
  __decorate([_property({
    displayName: "收集节点",
    type: cc.Node
  })], _ctor.prototype, "collectNode", undefined);
  __decorate([_property({
    displayName: "移动到的位置",
    type: cc.Node
  })], _ctor.prototype, "moveNode", undefined);
  return __decorate([_ccclass("CollectNode")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.CollectNode = exp_CollectNode;
var exp_CollectUtil = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.effectNode = null;
    t.initPosNode = null;
    t.collectNodes = [];
    t.collectedNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.init();
  };
  _ctor.prototype.init = function () {
    var e = this;
    this.collectNodes.forEach(function (t) {
      if (t.collectNode) {
        "" == t.behaviorId && (t.behaviorId = t.collectNode.name + "_collect");
        t.trigger() || (t.trigger = function (e) {
          this.trigger(t, e);
        }.bind(e));
        r_BehaviorMgr.BehaviorMgr.allBehavior[t.behaviorId] = t;
      }
    });
  };
  _ctor.prototype.trigger = function (e) {
    var t = this;
    var o = e.moveNode.convertToWorldSpaceAR(r.ZERO);
    e.collectNode.parent.convertToNodeSpaceAR(o, o);
    if (this.effectNode) {
      var i = this.effectNode.width;
      var n = this.effectNode.height;
      this.effectNode.active = true;
      this.effectNode.setPosition(this.effectNode.parent.convertToNodeSpaceAR(this.initPosNode.convertToWorldSpaceAR(r.ZERO)));
      this.effectNode.runAction(cc.repeatForever(cc.rotateBy(1, 360)));
      this.effectNode.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.moveTo(.5, cc.v2(0, 0))));
      cc.tween(this.effectNode).delay(1).to(.5, {
        position: o,
        width: e.moveNode.width + 100,
        height: e.moveNode.height + 100
      }).call(function () {
        t.effectNode.active = false;
        t.effectNode.width = i;
        t.effectNode.height = n;
      }).start();
    }
    e.collectNode.active = true;
    e.collectNode.setPosition(e.collectNode.parent.convertToNodeSpaceAR(this.initPosNode.convertToWorldSpaceAR(r.ZERO)));
    e.collectNode.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.moveTo(.5, cc.v2(0, 0))));
    var a = e.collectNode.width > e.collectNode.height ? e.moveNode.width / e.collectNode.width : e.moveNode.height / e.collectNode.height;
    cc.tween(e.collectNode).delay(1).to(.5, {
      position: o,
      scale: a
    }).start();
    this.collectedNum++;
    this.collectedNum == this.collectNodes.length && setTimeout(function () {
      t.passLevel();
    }, 2500);
  };
  _ctor.prototype.triggerAfterCollect = function () {};
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    return Promise.resolve(undefined);
  };
  _ctor.prototype.passLevel = function () {
    this.endTime();
  };
  __decorate([_property({
    displayName: "特效节点",
    type: cc.Node
  })], _ctor.prototype, "effectNode", undefined);
  __decorate([_property({
    displayName: "初始显示位置",
    type: cc.Node
  })], _ctor.prototype, "initPosNode", undefined);
  __decorate([_property({
    displayName: "收集节点列表",
    type: [exp_CollectNode]
  })], _ctor.prototype, "collectNodes", undefined);
  return __decorate([_ccclass("CollectUtil")], _ctor);
}(r_LevelPreload.default);
exports.CollectUtil = exp_CollectUtil;