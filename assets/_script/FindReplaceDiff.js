var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindNodeClass = undefined;
var r_GlassMaskFind = require("GlassMaskFind");
var r_CommonFunc = require("CommonFunc");
var r_DataUtil = require("DataUtil");
var r_LevelPreload = require("LevelPreload");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var g = function () {
  function e() {
    this.fakeNode = null;
    this.targetode = [];
    this.triggerId = "";
    this.isMulTime = false;
  }
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], e.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "目标",
    type: cc.Node
  })], e.prototype, "targetode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], e.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "可重复触发"
  })], e.prototype, "isMulTime", undefined);
  return __decorate([_ccclass("FindDragClass")], e);
}();
var exp_FindNodeClass = function () {
  function _ctor() {
    this.fakeNode = null;
    this.triggerId = "";
    this.isMulTime = false;
  }
  __decorate([_property({
    displayName: "目标节点",
    type: cc.Node
  })], _ctor.prototype, "fakeNode", undefined);
  __decorate([_property({
    displayName: "执行id",
    tooltip: "气泡字"
  })], _ctor.prototype, "triggerId", undefined);
  __decorate([_property({
    displayName: "可重复触发"
  })], _ctor.prototype, "isMulTime", undefined);
  return __decorate([_ccclass("FindNodeClass")], _ctor);
}();
exports.FindNodeClass = exp_FindNodeClass;
var def_FindReplaceDiff = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.touchNodeScale = new cc.Vec2(1, 2);
    t.discoveryNode = null;
    t.centerNode = null;
    t.range = new cc.Vec4(0, 0, 0, 0);
    t.findNodeList = [];
    t.clickNodeList = [];
    t.dragNodeList = [];
    t.maskListDyn = [];
    t.worldScale = new cc.Vec2(0, 0);
    t.isClickFind = false;
    t.dragingIndex = -1;
    t.startPos = new cc.Vec2(0, 0);
    t.oldBlIndex = -1;
    t.beginDistance = 0;
    t.beginScale = 0;
    t.bgNode = null;
    t.rectNode = null;
    t.clampfPos = new cc.Vec4(0, 0, 0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function () {
        return [2, Promise.resolve(1)];
      });
    });
  };
  _ctor.prototype.onLoad = function () {
    this.rectNode = this.touchNode.parent;
    this.bgNode = this.touchNode.getChildByName("bg");
  };
  _ctor.prototype.onEnable = function () {
    this.discoveryNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.discoveryNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
    this.glassSon = this.discoveryNode.children[0];
    this.initBg();
  };
  _ctor.prototype.initBg = function () {
    if (this.bgNode) {
      this.bgNode.on(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_MOVE, this.onBgTouchMove, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_END, this.onBgTouchEnd, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onBgTouchEnd, this);
    }
    this.findNodeList = this.findNodeList.sort(function (e, t) {
      return Number(t.fakeNode.getSiblingIndex()) - Number(e.fakeNode.getSiblingIndex());
    });
    this.discoveryNode.getWorldScale(this.worldScale);
    console.warn("测试平台注册滚轮事件");
    fgui.GRoot.inst.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
  };
  _ctor.prototype.start = function () {
    var e;
    var t = this;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    null === (e = this.findNodeList) || undefined === e || e.forEach(function (e) {
      var o = e.fakeNode;
      o.getComponent(r_GlassMaskFind.default) && o.getComponent(r_GlassMaskFind.default).SetMediator(t.node);
      o.children.forEach(function (e) {
        e.getComponent(cc.Mask) && t.maskListDyn.push(e.getComponent(cc.Mask));
      });
    });
  };
  _ctor.prototype.handleScore = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
  };
  _ctor.prototype.onBgTouchStart = function (e) {
    e.stopPropagation();
    this.discoveryNode.getWorldScale(this.worldScale);
    this.isClickFind = false;
    this.beginDistance = 0;
    this.beginScale = this.touchNode.scale;
    var t = e.getLocation();
    for (var o = this.dragNodeList.length - 1; o >= 0; o--) {
      var i = this.dragNodeList[o].fakeNode;
      if (r_CommonFunc.checkTouchNode2(t, i)) {
        this.startPos.x = i.x;
        this.startPos.y = i.y;
        this.dragingIndex = o;
        this.oldBlIndex = i.getSiblingIndex();
        return void i.setSiblingIndex(999);
      }
    }
    for (var n = this.clickNodeList.length - 1; n >= 0; n--) {
      i = this.clickNodeList[n].fakeNode;
      if (r_CommonFunc.checkTouchNode2(t, i)) {
        i.getComponent(r_GlassMaskFind.default) && i.getComponent(r_GlassMaskFind.default).forceShow();
        r_BehaviorMgr.BehaviorMgr.trigger(this.clickNodeList[n].triggerId);
        return void (this.clickNodeList[n].isMulTime || this.clickNodeList.splice(n, 1));
      }
    }
    for (var a = this.findNodeList.length - 1; a >= 0; a--) {
      var s = this.findNodeList[a];
      if (r_CommonFunc.checkTouchNode2(t, s.fakeNode) && r_CommonFunc.checkTouchNode2(t, this.glassSon) && !s.fakeNode.getComponent(r_GlassMaskFind.default).IsFinish()) {
        s.fakeNode.getComponent(r_GlassMaskFind.default).show();
        r_BehaviorMgr.BehaviorMgr.trigger(s.triggerId);
        this.findNodeList[a].isMulTime || this.findNodeList.splice(a, 1);
        return void (this.isClickFind = true);
      }
    }
  };
  _ctor.prototype.onBgTouchMove = function (e) {
    e.stopPropagation();
    if (!this.isClickFind) {
      if (this.dragingIndex >= 0) {
        this.dragNodeList[this.dragingIndex].fakeNode.x += e.getDeltaX() / this.worldScale.x;
        return void (this.dragNodeList[this.dragingIndex].fakeNode.y += e.getDeltaY() / this.worldScale.y);
      }
      var t = e.getTouches();
      if (1 == t.length) {
        this.checkMapPosition(e.getDeltaX(), e.getDeltaY());
      } else if (2 == t.length) {
        var o = t[0].getLocation();
        var i = t[1].getLocation();
        var n = o.sub(i).len();
        this.beginDistance <= 0 && (this.beginDistance = n);
        var a = n / this.beginDistance * this.beginScale;
        var s = cc.misc.clampf(a, this.touchNodeScale.x, this.touchNodeScale.y);
        this.checkFourLimit(s);
        this.checkMapPosition();
        this.touchNode.scale = s;
      }
    }
  };
  _ctor.prototype.onBgTouchEnd = function (e) {
    e.stopPropagation();
    var t = e.getLocation();
    if (!this.isClickFind) {
      if (this.dragingIndex >= 0) {
        var o = this.dragNodeList[this.dragingIndex];
        var i = false;
        for (var n = 0; n < o.targetode.length; n++) {
          if (r_CommonFunc.checkTouchNode2(t, o.targetode[n])) {
            i = true;
            break;
          }
        }
        if (i) {
          r_BehaviorMgr.BehaviorMgr.trigger(o.triggerId);
          if (o.isMulTime) {
            o.fakeNode.x = this.startPos.x;
            o.fakeNode.y = this.startPos.y;
            o.fakeNode.setSiblingIndex(this.oldBlIndex);
          } else {
            o.fakeNode.active = false;
            this.dragNodeList.splice(this.dragingIndex, 1);
            o = null;
          }
        } else {
          o.fakeNode.x = this.startPos.x;
          o.fakeNode.y = this.startPos.y;
          o.fakeNode.setSiblingIndex(this.oldBlIndex);
        }
        this.dragingIndex = -1;
      } else {
        this.checkFourLimit();
      }
    }
  };
  _ctor.prototype.onDisable = function () {
    this.discoveryNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.discoveryNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
    fgui.GRoot.inst.off(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    e.stopPropagation();
    this.oldBlIndex = this.discoveryNode.getSiblingIndex();
    this.discoveryNode.setSiblingIndex(999);
  };
  _ctor.prototype.onTouchMove = function (e) {
    e.stopPropagation();
    this.discoveryNode.x += e.getDeltaX() / this.worldScale.x;
    this.discoveryNode.y += e.getDeltaY() / this.worldScale.y;
    this.updateMask();
    this.checkDisNode();
  };
  _ctor.prototype.onTouchEnd = function (e) {
    e.stopPropagation();
    this.discoveryNode.setSiblingIndex(this.oldBlIndex);
  };
  _ctor.prototype.onTouchCancel = function (e) {
    e.stopPropagation();
  };
  _ctor.prototype.updateMask = function () {
    var e = this;
    var t = this.glassSon.getComponent(cc.PolygonCollider);
    this.maskListDyn.forEach(function (o) {
      if (o) {
        var i = o._graphics;
        i.lineWidth = 1;
        i.strokeColor = cc.color(255, 0, 0);
        i.fillColor = cc.color(0, 255, 0);
        i.clear();
        if (r_DataUtil.DataUtil.hitNode((e.centerNode || e.glassSon).convertToWorldSpaceAR(cc.v2(0, 0)), o.node.parent)) {
          o.node.parent.getComponent(r_GlassMaskFind.default).MakeCanClick();
          var n = null;
          for (var a = 0; a < t.points.length; a++) {
            var s = t.points[a];
            var r = e.glassSon.convertToWorldSpaceAR(s);
            var l = o.node.convertToNodeSpaceAR(r);
            if (0 != a) {
              i.lineTo(l.x, l.y);
              if (!(a != t.points.length - 1)) {
                i.close();
                i.stroke();
                i.fill();
              }
            } else {
              n = l;
              i.moveTo(n.x, n.y);
            }
          }
        } else {
          o.node.parent.getComponent(r_GlassMaskFind.default).MakeCanClick(false);
        }
      }
    });
  };
  _ctor.prototype.mouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.touchNode.scale += t;
    var i = cc.misc.clampf(o, this.touchNodeScale.x, this.touchNodeScale.y);
    this.checkFourLimit(i);
    this.checkMapPosition();
    this.touchNode.scale = i;
  };
  _ctor.prototype.checkMapPosition = function (e, t) {
    undefined === e && (e = 0);
    undefined === t && (t = 0);
    var o = this.touchNode;
    o.x = cc.misc.clampf(o.x + e, this.clampfPos.w, this.clampfPos.z);
    o.y = cc.misc.clampf(o.y + t, this.clampfPos.y, this.clampfPos.x);
  };
  _ctor.prototype.checkDisNode = function () {
    if (this.discoveryNode.x < this.range.x) {
      this.discoveryNode.x = this.range.x;
    } else {
      this.discoveryNode.x > this.range.y && (this.discoveryNode.x = this.range.y);
    }
    if (this.discoveryNode.y < this.range.z) {
      this.discoveryNode.y = this.range.z;
    } else {
      this.discoveryNode.y > this.range.w && (this.discoveryNode.y = this.range.w);
    }
  };
  _ctor.prototype.checkFourLimit = function (e) {
    e || (e = this.touchNode.scale);
    var t = this.rectNode.width;
    var o = this.rectNode.height;
    var i = this.bgNode.width * this.bgNode.scaleX * e;
    var n = this.bgNode.height * this.bgNode.scaleY * e;
    this.clampfPos.x = (n - o) / 2;
    this.clampfPos.y = -this.clampfPos.x;
    this.clampfPos.z = (i - t) / 2;
    this.clampfPos.w = -this.clampfPos.z;
  };
  _ctor.prototype.failLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.passLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  __decorate([_property({
    displayName: "背景图层",
    type: cc.Node
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "背景图层缩放范围"
  })], _ctor.prototype, "touchNodeScale", undefined);
  __decorate([_property({
    displayName: "放大镜节点",
    type: cc.Node
  })], _ctor.prototype, "discoveryNode", undefined);
  __decorate([_property({
    displayName: "瞄准点",
    type: cc.Node,
    tooltip: "该点会进入目标节点时，启动msk效果"
  })], _ctor.prototype, "centerNode", undefined);
  __decorate([_property({
    displayName: "移动范围",
    type: cc.Vec4
  })], _ctor.prototype, "range", undefined);
  __decorate([_property({
    displayName: "隐藏着节点",
    type: exp_FindNodeClass
  })], _ctor.prototype, "findNodeList", undefined);
  __decorate([_property({
    displayName: "直接点击的节点",
    type: exp_FindNodeClass
  })], _ctor.prototype, "clickNodeList", undefined);
  __decorate([_property({
    displayName: "拖动的节点",
    type: g
  })], _ctor.prototype, "dragNodeList", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_FindReplaceDiff;