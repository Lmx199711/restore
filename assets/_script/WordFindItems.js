var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = function () {
  function e() {
    this.itemCollider = null;
    this.selectAction = "";
    this.triggerOneTime = true;
    this.isTrigger = false;
  }
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "物品"
  })], e.prototype, "itemCollider", undefined);
  __decorate([_property({
    tooltip: "选中后的action"
  })], e.prototype, "selectAction", undefined);
  __decorate([_property({
    tooltip: "是否只触发一次"
  })], e.prototype, "triggerOneTime", undefined);
  return __decorate([_ccclass("WordTouchItem")], e);
}();
var f = function () {
  function e() {
    this.itemCollider = null;
    this.showNode = null;
    this.showSpriteFrame = null;
    this.selectAction = "";
    this.isFinish = false;
    this.keyList = [];
    this.truePosNode = null;
  }
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "物品"
  })], e.prototype, "itemCollider", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选中后显示节点"
  })], e.prototype, "showNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选中后显示图片"
  })], e.prototype, "showSpriteFrame", undefined);
  __decorate([_property({
    tooltip: "选对后的action"
  })], e.prototype, "selectAction", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以选中"
  })], e.prototype, "keyList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选中后选对图片位置节点"
  })], e.prototype, "truePosNode", undefined);
  return __decorate([_ccclass("WordFindInfo")], e);
}();
var def_WordFindItems = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemLists = [];
    t.selectTime = .5;
    t.winAction = "";
    t.keepTrue = false;
    t.falseAction = "";
    t.MIN_SCALE = 1;
    t.MAX_SCALE = 2;
    t.touchItemList = [];
    t.touchTime = .6;
    t.picMaskNode = null;
    t.minPosX = null;
    t.curIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.imgTrue.active = false;
    this.imgFalse.active = false;
    this.picMaskNode = this.picMask.node;
    this.minPosX = this.picMaskNode.width - this.picBg.width;
    this.picBg.x = 0;
    for (var e = 0; e < this.itemLists.length; e++) {
      this.itemLists[e].showNode.active = false;
    }
    this.registTouch();
  };
  _ctor.prototype.touchInMask = function (e) {
    var t;
    var o;
    if (this.scaleRoot) {
      return (o = (t = this.mapContainer).convertToNodeSpaceAR(e)).x > -t.width / 2 && o.x < t.width / 2 && o.y > -t.height / 2 && o.y < t.height / 2;
    } else {
      return (o = (t = this.picMaskNode).convertToNodeSpaceAR(e)).x > 0 && o.x < t.width && o.y > 0 && o.y < t.height;
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    var t = null;
    var o = null;
    var i = null;
    var n = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (i) {
      t = null;
      o = i.getLocation();
      if (i.getTouches().length > 1) {
        r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
      } else if (e.touchInMask(o)) {
        n = e.picBg.x;
        for (var a = 0; a < e.touchItemList.length; a++) {
          var u = e.touchItemList[a];
          var h = u.itemCollider.node.convertToNodeSpaceAR(o);
          if ((!u.isTrigger || !u.triggerOneTime) && cc.Intersection.pointInPolygon(h, u.itemCollider.points)) {
            t = u;
            return void r_TimeSystem.TimeSystem.scheduleOnce("selectTouchItem", e.touchTime, function () {
              t.isTrigger = true;
              r_TriggerActionMgr.TriggerActionMgr.trigger(t.selectAction);
              t = null;
            });
          }
        }
        var p = function (t) {
          var i = e.itemLists[t];
          if (i.isFinish) {
            return "continue";
          }
          if (i.keyList.length > 0 && !r_CheckHasKeys.checkHasKeys(i.keyList)) {
            return "continue";
          }
          var n = i.itemCollider.node.convertToNodeSpaceAR(o);
          if (cc.Intersection.pointInPolygon(n, i.itemCollider.points)) {
            r_TimeSystem.TimeSystem.scheduleOnce("selectWordItem", e.selectTime, function () {
              r_SoundMgr.SoundMgr.playSound("zhengquea");
              i.isFinish = true;
              e.imgTrue.active = true;
              e.imgFalse.active = false;
              if (i.truePosNode) {
                var t = i.truePosNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var n = e.imgTrue.parent.convertToNodeSpaceAR(t);
                e.imgTrue.x = n.x;
                e.imgTrue.y = n.y;
              } else {
                n = e.imgTrue.parent.convertToNodeSpaceAR(o);
                e.imgTrue.x = n.x;
                e.imgTrue.y = n.y;
              }
              if (e.keepTrue) {
                var a = cc.instantiate(e.imgTrue);
                e.imgTrue.parent.addChild(a);
                a.active = true;
              }
              e.itemLists[e.curIndex].showNode.active = true;
              e.itemLists[e.curIndex].showNode.getComponent(cc.Sprite).spriteFrame = i.showSpriteFrame;
              r_TriggerActionMgr.TriggerActionMgr.trigger(i.selectAction);
              e.curIndex = e.curIndex + 1;
              e.curIndex >= e.itemLists.length && ("" == e.winAction || r_TriggerActionMgr.TriggerActionMgr.trigger(e.winAction));
            });
            return {
              value: undefined
            };
          } else {
            return undefined;
          }
        };
        for (a = 0; a < e.itemLists.length; a++) {
          var d = p(a);
          if ("object" == typeof d) {
            return d.value;
          }
        }
        r_TimeSystem.TimeSystem.scheduleOnce("selectWordItem", e.selectTime, function () {
          r_TriggerActionMgr.TriggerActionMgr.trigger(e.falseAction);
          if (e.errorParticle) {
            e.errorParticle.node.active = true;
            var t = e.errorParticle.node.parent.convertToNodeSpaceAR(o);
            e.errorParticle.node.x = t.x;
            e.errorParticle.node.y = t.y;
            e.errorParticle.resetSystem();
          } else {
            r_SoundMgr.SoundMgr.playSound("error");
            e.imgTrue.active = false;
            e.imgFalse.active = true;
            t = e.imgFalse.parent.convertToNodeSpaceAR(o);
            e.imgFalse.x = t.x;
            e.imgFalse.y = t.y;
          }
          r_TimeSystem.TimeSystem.scheduleOnce("hideImgFalse", 1, function () {
            e.imgFalse.active = false;
            e.errorParticle && (e.errorParticle.node.active = false);
          });
        });
      } else {
        o = null;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      if (o) {
        var s = a.getTouches();
        if (2 == s.length && e.scaleRoot) {
          t = null;
          r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
          r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          var c;
          var l = s[0];
          var u = s[1];
          var h = l.getDelta();
          var p = u.getDelta();
          var d = e.scaleRoot.convertToNodeSpaceAR(l.getLocation());
          var y = e.scaleRoot.convertToNodeSpaceAR(u.getLocation());
          var f = d.sub(y);
          var m = h.sub(cc.v2(p.x, p.y));
          c = Math.abs(f.x) > Math.abs(f.y) ? (f.x + m.x) / f.x * e.scaleRoot.scaleX : (f.y + m.y) / f.y * e.scaleRoot.scaleY;
          var g = y.add(cc.v2(f.x / 2, f.y / 2));
          var v = c - e.scaleRoot.scaleX;
          var C = g.scale(cc.v2(v, v));
          var S = e.scaleRoot.getPosition().sub(cc.v2(C.x, C.y));
          if (c < e.MAX_SCALE && c > e.MIN_SCALE) {
            e.scaleRoot.scale = c;
            e.dealScalePos(S, e.scaleRoot);
          }
        }
        if (1 == s.length) {
          i = a.getLocation();
          if (Math.abs(i.x - o.x) + Math.abs(i.y - o.y) > 100) {
            t = null;
            r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
            r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          }
          if (e.scaleRoot) {
            var I = cc.v2(s[0].getDelta());
            e.dealMove(I, e.scaleRoot, e.mapContainer);
          } else {
            var b = n + i.x - o.x;
            b = Math.max(b, e.minPosX);
            b = Math.min(b, 0);
            e.picBg.x = b;
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {
      r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
      r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
    });
  };
  _ctor.prototype.dealScaleRange = function (e) {
    if (e > this.MAX_SCALE) {
      return this.MAX_SCALE;
    } else if (e < this.MIN_SCALE) {
      return this.MIN_SCALE;
    } else {
      return e;
    }
  };
  _ctor.prototype.dealScalePos = function (e, t) {
    if (1 === t.scale) {
      e = cc.Vec2.ZERO;
    } else {
      var o = this.mapContainer.convertToWorldSpaceAR(e);
      var i = this.mapContainer.convertToNodeSpaceAR(o);
      var n = this.calculateEdge(t, this.mapContainer, i);
      n.left > 0 && (e.x -= n.left);
      n.right > 0 && (e.x += n.right);
      n.top > 0 && (e.y += n.top);
      n.bottom > 0 && (e.y -= n.bottom);
    }
    t.x = e.x;
    t.y = e.y;
  };
  _ctor.prototype.calculateEdge = function (e, t, o) {
    var i = (t.width - e.width * e.scaleX) / 2;
    var n = (t.height - e.height * e.scaleY) / 2;
    return {
      left: i + o.x,
      right: i - o.x,
      top: n - o.y,
      bottom: n + o.y
    };
  };
  _ctor.prototype.dealMove = function (e, t, o) {
    var i = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var n = o.convertToNodeSpaceAR(i);
    n.x += e.x;
    n.y += e.y;
    var a = this.calculateEdge(t, o, n);
    a.left <= 0 && a.right <= 0 && (t.x += e.x);
    a.top <= 0 && a.bottom <= 0 && (t.y += e.y);
  };
  __decorate([_property({
    type: cc.Mask,
    tooltip: "卷轴Mask(锚点要在(0,0))"
  })], _ctor.prototype, "picMask", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "卷轴(锚点要在(0,0))"
  })], _ctor.prototype, "picBg", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "对"
  })], _ctor.prototype, "imgTrue", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "错"
  })], _ctor.prototype, "imgFalse", undefined);
  __decorate([_property({
    type: [f],
    tooltip: "物品信息列表"
  })], _ctor.prototype, "itemLists", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "选择时间"
  })], _ctor.prototype, "selectTime", undefined);
  __decorate([_property({
    tooltip: "全选对后的action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    tooltip: "是否保留对"
  })], _ctor.prototype, "keepTrue", undefined);
  __decorate([_property({
    tooltip: "选错后的action"
  })], _ctor.prototype, "falseAction", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "点击监听层"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "缩放根节点"
  })], _ctor.prototype, "scaleRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "mapContainer"
  })], _ctor.prototype, "mapContainer", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "最小缩放"
  })], _ctor.prototype, "MIN_SCALE", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "最大缩放"
  })], _ctor.prototype, "MAX_SCALE", undefined);
  __decorate([_property({
    type: [y],
    tooltip: "点击列表"
  })], _ctor.prototype, "touchItemList", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "点击时间"
  })], _ctor.prototype, "touchTime", undefined);
  __decorate([_property({
    type: cc.ParticleSystem,
    tooltip: "错误提示粒子"
  })], _ctor.prototype, "errorParticle", undefined);
  return __decorate([_ccclass, _menu("文字游戏/找到物品")], _ctor);
}(cc.Component);
exports.default = def_WordFindItems;