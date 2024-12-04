var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GlobalTouchMgr = require("GlobalTouchMgr");
var r_RoboticA_BorderKeep = require("RoboticA_BorderKeep");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Ex_DynamicScale = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.a = "缩放一个窗口限制图,缩放时会屏蔽玩家点击";
    t.borderNode = null;
    t.followNodes = [];
    t.bigScale = 2;
    t.smallScale = 1;
    t.isRollToOri = false;
    t.oriPos = cc.Vec2.ZERO;
    t.windowCenter = cc.Vec2.ZERO;
    t.pngCenter = cc.Vec2.ZERO;
    t._worldPos1 = new cc.Vec2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.isRollToOri && (this.oriPos = this.borderNode.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      if (!(o instanceof Array)) {
        if (o[r_BehaviorDef.ARGS.back]) {
          this.handleIt(false);
        } else {
          this.handleIt(true);
        }
      }
    } else {
      this.handleIt(true);
    }
  };
  _ctor.prototype.handleIt = function (e) {
    if (this.borderNode && this.borderNode.limitN) {
      this._worldPos1 = this.borderNode.limitN.convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.windowCenter.x = this._worldPos1.x + (.5 - this.borderNode.limitN.getAnchorPoint().x) * this.borderNode.limitN.width;
      this.windowCenter.y = this._worldPos1.y + (.5 - this.borderNode.limitN.getAnchorPoint().y) * this.borderNode.limitN.height;
      this.pngCenter = this.borderNode.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var t = this.borderNode.node.scale;
      r_GlobalTouchMgr.default.startBlockEvent();
      if (e) {
        this.bigger(this.pngCenter.sub(this.windowCenter), t);
      } else {
        this.smaller(this.windowCenter.sub(this.pngCenter), t);
      }
    } else {
      cc.warn("窗口限制节点不全");
    }
  };
  _ctor.prototype.bigger = function (e, t) {
    var o = this;
    var i = this.bigScale / t;
    var n = e.mul(i - 1);
    cc.tween(this.borderNode.node).to(.5, {
      scale: this.bigScale
    }).start();
    cc.tween(this.borderNode.node).by(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      r_GlobalTouchMgr.default.closeBlockEvent();
    }).start();
    this.followNodes.forEach(function (e) {
      cc.tween(e.node).to(.5, {
        scale: o.bigScale
      }).start();
      cc.tween(e.node).by(.5, {
        x: n.x,
        y: n.y
      }).start();
    });
  };
  _ctor.prototype.smaller = function (e, t) {
    var o = this;
    var i = this.smallScale / t;
    var n = e.mul(1 - i);
    this.isRollToOri && (n = this.oriPos.sub(this.pngCenter));
    cc.tween(this.borderNode.node).to(.5, {
      scale: this.smallScale
    }).start();
    cc.tween(this.borderNode.node).by(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      r_GlobalTouchMgr.default.closeBlockEvent();
    }).start();
    this.followNodes.forEach(function (e) {
      cc.tween(e.node).to(.5, {
        scale: o.smallScale
      }).start();
      cc.tween(e.node).by(.5, {
        x: n.x,
        y: n.y
      }).start();
    });
  };
  __decorate([_property({
    displayName: "说明"
  })], _ctor.prototype, "a", undefined);
  __decorate([_property({
    displayName: "窗口图(判断)",
    type: r_RoboticA_BorderKeep.RoboticA_BorderKeep
  })], _ctor.prototype, "borderNode", undefined);
  __decorate([_property({
    displayName: "窗口图(同步)",
    type: r_RoboticA_BorderKeep.RoboticA_BorderKeep
  })], _ctor.prototype, "followNodes", undefined);
  __decorate([_property({
    displayName: "放大时的值",
    step: .1
  })], _ctor.prototype, "bigScale", undefined);
  __decorate([_property({
    displayName: "缩小时的值",
    step: .1
  })], _ctor.prototype, "smallScale", undefined);
  __decorate([_property({
    displayName: "缩小时是否滚回初始点"
  })], _ctor.prototype, "isRollToOri", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/缩放窗口图")], _ctor);
}(cc.Component);
exports.default = def_Ex_DynamicScale;