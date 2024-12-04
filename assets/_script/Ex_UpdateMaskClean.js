var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_UpdateMaskClean = exports.CleanedNodeClass = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var r_ExAB_Update = require("ExAB_Update");
var r_TYEventType = require("TYEventType");
var r_DataUtil = require("DataUtil");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_CleanedNodeClass = function () {
  function _ctor() {
    this.fakeNode = null;
    this.needKey = "";
    this.overMomentId = "";
    this.overId = "";
  }
  __decorate([_property({
    displayName: "目标节点",
    type: cc.Node
  })], _ctor.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "擦除前置条件"
  })], _ctor.prototype, "needKey", undefined);
  __decorate([_property({
    displayName: "擦除完瞬间执行"
  })], _ctor.prototype, "overMomentId", undefined);
  __decorate([_property({
    displayName: "擦除完成时执行"
  })], _ctor.prototype, "overId", undefined);
  return __decorate([_ccclass("CleanedNodeClass")], _ctor);
}();
exports.CleanedNodeClass = exp_CleanedNodeClass;
var exp_Ex_UpdateMaskClean = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "子物体获得擦除功能";
    t.centerNode = null;
    t.cleanRadius = -1;
    t.findNodeList = [];
    t.curDondIndex = [];
    t.doneIndex = [];
    t.tempV2 = new cc.Vec2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initCom = function () {
    this.glassSon || (this.glassSon = this.node.children[0]);
    for (var e = 0; e < this.findNodeList.length; e++) {
      this.doneIndex.push(false);
    }
    this.moveUpdate();
    this.node.on(r_TYEventType.TYEventType.RoboticMoment.ROBOTIC_TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.touchEnd = function () {
    for (var e = 0; e < this.curDondIndex.length; e++) {
      var t = this.findNodeList[this.curDondIndex[e]];
      var o = t.fakeNode;
      r_BehaviorMgr.BehaviorMgr.trigger(t.overId);
      o.children.forEach(function (e) {
        var t = e.getComponent(cc.Mask);
        if (t) {
          if (t.inverted) {
            t.node.active = false;
          } else {
            t.enabled = false;
          }
        }
      });
      this.doneIndex[this.curDondIndex[e]] = true;
    }
    this.curDondIndex = [];
  };
  _ctor.prototype.moveUpdate = function () {
    var e = this;
    var t = this.glassSon.getComponent(cc.PolygonCollider);
    var o = function (o) {
      if (i.doneIndex[o]) {
        return "continue";
      }
      var n = i.findNodeList[o];
      var a = n.fakeNode;
      var c = (i.centerNode || i.glassSon).convertToWorldSpaceAR(cc.v2(0, 0));
      if (r_DataUtil.DataUtil.hitNode(c, a)) {
        if (n.needKey && !r_GameKeyMgr.GameKeyMgr.has(n.needKey)) {
          return "continue";
        }
        var l = undefined;
        if (!i.curDondIndex.includes(o)) {
          l = n.fakeNode.convertToWorldSpaceAR(cc.v2(0, 0));
          var h = 30;
          i.cleanRadius > 0 && (h = i.cleanRadius);
          if (c.sub(l).len() < h) {
            i.curDondIndex.push(o);
            r_BehaviorMgr.BehaviorMgr.trigger(n.overMomentId);
          }
        }
        a.children.forEach(function (o) {
          if (o.getComponent(cc.Mask)) {
            var i;
            var n = o.getComponent(cc.Mask);
            var a = n._graphics;
            a.lineWidth = 1;
            a.strokeColor = cc.color(255, 0, 0);
            a.fillColor = cc.color(0, 255, 0);
            i = o.convertToNodeSpaceAR(c);
            var s = null;
            if (e.cleanRadius > 0) {
              a.circle(i.x, i.y, e.cleanRadius);
              a.stroke();
              a.fill();
            } else {
              for (var r = 0; r < t.points.length; r++) {
                var l = t.points[r];
                var u = e.glassSon.convertToWorldSpaceAR(l);
                var h = n.node.convertToNodeSpaceAR(u);
                if (0 != r) {
                  a.lineTo(h.x, h.y);
                  if (!(r != t.points.length - 1)) {
                    a.close();
                    a.stroke();
                    a.fill();
                  }
                } else {
                  s = h;
                  a.moveTo(s.x, s.y);
                }
              }
            }
          }
        });
      }
    };
    var i = this;
    for (var n = 0; n < this.findNodeList.length; n++) {
      o(n);
    }
  };
  _ctor.prototype.onDestroy = function () {
    this.node.off(r_TYEventType.TYEventType.RoboticMoment.ROBOTIC_TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.resetAll = function () {
    for (var e = 0; e < this.findNodeList.length; e++) {
      this.doneIndex[e] = false;
      this.findNodeList[e].fakeNode.children.forEach(function (e) {
        var t = e.getComponent(cc.Mask);
        if (t) {
          t.node.active = true;
          t.enabled = true;
          t._graphics.clear();
        }
      });
    }
    this.curDondIndex = [];
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "瞄准点",
    type: cc.Node,
    tooltip: "该点会进入目标节点时，启动msk效果"
  })], _ctor.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "擦除半径"
  })], _ctor.prototype, "cleanRadius", undefined);
  __decorate([_property({
    displayName: "隐藏着节点",
    type: exp_CleanedNodeClass
  })], _ctor.prototype, "findNodeList", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/子物体/擦除")], _ctor);
}(r_ExAB_Update.ExAB_Update);
exports.Ex_UpdateMaskClean = exp_Ex_UpdateMaskClean;