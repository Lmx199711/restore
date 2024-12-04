var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeController = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_Ex_TipsAnswerPicTxt = require("Ex_TipsAnswerPicTxt");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_NodeControl = require("NodeControl");
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_NodeController = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.myNodes = [];
    t.limitN = null;
    t.scaleN = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.init();
  };
  _ctor.prototype.init = function () {
    var e = this;
    var t = new Date().getTime();
    this.getMoveDis();
    this.node.children.forEach(function (t) {
      t.getComponent("NodeControl") && t.getComponents("NodeControl").forEach(function (t) {
        e.myNodes.push(t);
      });
    });
    console.log(this.myNodes);
    this.myNodes.forEach(function (t) {
      if (t.node) {
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(t.node);
        t.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, function (o) {
          e.onTouchStart(t, o);
        }, e);
        t.type == r_NodeControl.type.拖动 && t.node.on(r_TYEventType.TYEventType.DRAG_MOVE, function (o) {
          e.onTouchMove(t, o);
        }, e);
        t.node.on(r_TYEventType.TYEventType.TOUCH_END, function (o) {
          e.onTouchEnd(t, o);
        }, e);
      }
    });
    console.log("NodeController init time:", new Date().getTime() - t);
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.getMoveDis = function () {
    if (this.limitN) {
      this.widthDis = this.limitN.width * this.limitN.scale / 2;
      this.widthDis = Math.max(this.widthDis, 0);
      this.heightDis = this.limitN.height * this.limitN.scale / 2;
      this.heightDis = Math.max(this.heightDis, 0);
    }
  };
  _ctor.prototype.onTouchStart = function (e, t) {
    this.startPos = null;
    if (e.type == r_NodeControl.type.拖动 && e.node.getPosition().subtract(e.take_node.getPosition()).mag() > 1) {
      this.startPos = e.node.getPosition();
      this.touchStartPos = t.getLocation();
    } else {
      e.type == r_NodeControl.type.点击 && "" != e.click_event && r_BehaviorMgr.BehaviorMgr.trigger(e.click_event);
    }
  };
  _ctor.prototype.onTouchMove = function (e, t) {
    if (this.startPos) {
      e.node.setSiblingIndex(e.node.parent.childrenCount - 1);
      var o = t.getLocation();
      var i = {
        x: this.startPos.x + (o.x - this.touchStartPos.x) / this.scaleN.scale,
        y: this.startPos.y + (o.y - this.touchStartPos.y) / this.scaleN.scale
      };
      i.x < -this.widthDis && (i.x = -this.widthDis);
      i.x > this.widthDis && (i.x = this.widthDis);
      i.y < -this.heightDis && (i.y = -this.heightDis);
      i.y > this.heightDis && (i.y = this.heightDis);
      "" != e.move_event && r_BehaviorMgr.BehaviorMgr.trigger(e.move_event);
      e.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = this;
    var o = 0;
    var i = null;
    if (e.type != r_NodeControl.type.点击) {
      this.myNodes.forEach(function (t) {
        if (e.take_node.getPosition().subtract(t.node.getPosition()).mag() < 1 && 1 == t.node.active && i != t.node) {
          o++;
          i = t.node;
        }
      });
      if (e.node.getPosition().subtract(e.take_node.getPosition()).mag() < 200 && o < 2) {
        if (1 == o && i != e.target_node && i != e.node) {
          return setTimeout(function () {
            e.node.setPosition(t.startPos);
          }, 10);
        }
        e.target_node_event && (r_Ex_TipsAnswerPicTxt.Ex_TipsAnswerPicTxt.IndexKey = e.target_node_event);
        e.node.setPosition(e.take_node.getPosition());
        e.take_node_event && r_BehaviorMgr.BehaviorMgr.trigger(e.take_node_event);
        if (e.target_node && e.target_node.active && e.node.getPosition().subtract(e.target_node.getPosition()).mag() < 200 && e.node.getPosition().subtract(e.take_node.getPosition()).mag() < 1) {
          e.node.active = false;
          e.target_node.active = false;
          e.target_node_event && r_BehaviorMgr.BehaviorMgr.trigger(e.target_node_event);
          r_Ex_TipsAnswerPicTxt.Ex_TipsAnswerPicTxt.IndexKey = null;
        }
      } else {
        e.node.setPosition(this.startPos);
      }
      "" != e.up_move_event && r_BehaviorMgr.BehaviorMgr.trigger(e.up_move_event);
    }
  };
  __decorate([_property({
    displayName: "节点列表",
    type: [r_NodeControl.NodeControl]
  })], _ctor.prototype, "myNodes", undefined);
  __decorate([_property({
    displayName: "移动范围",
    type: cc.Node
  })], _ctor.prototype, "limitN", undefined);
  __decorate([_property({
    displayName: "缩放节点",
    type: cc.Node
  })], _ctor.prototype, "scaleN", undefined);
  return __decorate([_ccclass("NodeController")], _ctor);
}(cc.Component);
exports.NodeController = exp_NodeController;