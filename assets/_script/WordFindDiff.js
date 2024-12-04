var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_UtilsSystem = require("UtilsSystem");
var r_LevelPreload = require("LevelPreload");
var r_ViewTipsUI = require("ViewTipsUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
(function () {
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
  e = __decorate([_ccclass("WordTouchDiffItem")], e);
})();
var v = function () {
  function e() {
    this.leftNode = null;
    this.rightNode = null;
    this.showSpriteFrame = null;
    this.name = "";
    this.isFinish = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "左侧节点"
  })], e.prototype, "leftNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "右侧节点"
  })], e.prototype, "rightNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选中后显示图片"
  })], e.prototype, "showSpriteFrame", undefined);
  __decorate([_property({
    displayName: "名字"
  })], e.prototype, "name", undefined);
  return __decorate([_ccclass("WordFindDiffInfo")], e);
}();
var def_WordFindDiff = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemGrid = null;
    t.ItemPrefab = null;
    t.MIN_SCALE = 1;
    t.MAX_SCALE = 2;
    t.itemLists = [];
    t.winAction = "";
    t.falseAction = "";
    t.curIndex = 0;
    t.loopKey = false;
    t.downTime = 90;
    t.finishList = [];
    t.gridList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.init()];
          case 1:
            e.sent();
            return [2, null];
        }
      });
    });
  };
  _ctor.prototype.passLevel = function () {
    this.loopKey = false;
    cc.tween(this.node).delay(1).call(function () {}).start();
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.init = function () {
    for (var e = 0; e < this.itemLists.length; e++) {
      var t = this.itemLists[e];
      t.leftNode.active = false;
      t.rightNode.active = false;
    }
    for (e = 0; e < this.itemLists.length; e++) {
      var o = cc.instantiate(this.ItemPrefab);
      o.active = true;
      o.parent = this.itemGrid;
      this.gridList.push(o);
    }
    this.registTouch();
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.showAnwser.bind(this);
  };
  _ctor.prototype.showAnwser = function () {
    for (var e = 0; e < this.itemLists.length; e++) {
      var t = this.itemLists[e];
      t.leftNode.active = true;
      t.rightNode.active = true;
      if (!t.isFinish) {
        t.leftNode.color = cc.Color.RED;
        t.leftNode.color = cc.Color.RED;
      }
    }
  };
  _ctor.prototype.refreshFinishList = function () {
    for (var e = 0; e < this.gridList.length; e++) {
      var t = this.gridList[e];
      var o = this.finishList[e];
      o && (t.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = o.showSpriteFrame);
    }
  };
  _ctor.prototype.setItemIcon = function (e, t) {
    var o = this.gridList[e];
    o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = t.showSpriteFrame;
    o.getChildByName("label").getComponent(cc.Label).string = t.name;
  };
  _ctor.prototype.touchInMask = function (e) {
    if (this.scaleRoot) {
      var t = this.mapContainer;
      var o = t.convertToNodeSpaceAR(e);
      return o.x > -t.width / 2 && o.x < t.width / 2 && o.y > -t.height / 2 && o.y < t.height / 2;
    }
    return true;
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
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      t = o.getLocation();
      if (e.touchInMask(t)) {
        if (o.getTouches().length > 1) {
          r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
        } else {
          var i = null;
          for (var n = 0; n < e.itemLists.length; n++) {
            var a = e.itemLists[n];
            a.index = n;
            if (!a.isFinish) {
              var s = r_UtilsSystem.UtilsSystem.touchInNode(a.leftNode, t);
              var r = r_UtilsSystem.UtilsSystem.touchInNode(a.rightNode, t);
              if (s || r) {
                if (i) {
                  0 < i.distance && ((i = a).distance = 0);
                } else {
                  (i = a).distance = 0;
                }
              }
            }
          }
          if (i) {
            r_SoundMgr.SoundMgr.playSound("正确提示");
            i.isFinish = true;
            i.leftNode.active = true;
            i.leftNode.color = cc.Color.GREEN;
            i.rightNode.active = true;
            i.rightNode.color = cc.Color.GREEN;
            e.finishList.push(i);
            e.setItemIcon(e.curIndex, i);
            e.curIndex = e.curIndex + 1;
            if (e.curIndex >= e.itemLists.length) {
              if ("" == e.winAction) {
                e.passLevel();
              } else {
                r_TriggerActionMgr.TriggerActionMgr.trigger(e.winAction);
              }
            }
          }
        }
      } else {
        t = null;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
      if (t) {
        var n = i.getTouches();
        if (2 == n.length && e.scaleRoot) {
          r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
          r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          var a;
          var s = n[0];
          var r = n[1];
          var c = s.getDelta();
          var u = r.getDelta();
          var h = e.scaleRoot.convertToNodeSpaceAR(s.getLocation());
          var p = e.scaleRoot.convertToNodeSpaceAR(r.getLocation());
          var d = h.sub(p);
          var y = c.sub(cc.v2(u.x, u.y));
          a = Math.abs(d.x) > Math.abs(d.y) ? (d.x + y.x) / d.x * e.scaleRoot.scaleX : (d.y + y.y) / d.y * e.scaleRoot.scaleY;
          var f = p.add(cc.v2(d.x / 2, d.y / 2));
          var m = a - e.scaleRoot.scaleX;
          var g = f.scale(cc.v2(m, m));
          var v = e.scaleRoot.getPosition().sub(cc.v2(g.x, g.y));
          if (a < e.MAX_SCALE && a > e.MIN_SCALE) {
            e.scaleRoot.scale = a;
            e.dealScalePos(v, e.scaleRoot);
          }
        }
        if (1 == n.length) {
          o = i.getLocation();
          if (Math.abs(o.x - t.x) + Math.abs(o.y - t.y) > 100) {
            r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
            r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          }
          var C = cc.v2(n[0].getDelta());
          e.dealMove(C, e.scaleRoot, e.mapContainer);
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {});
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
    type: cc.Node,
    displayName: "正确列表"
  })], _ctor.prototype, "itemGrid", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具栏"
  })], _ctor.prototype, "ItemPrefab", undefined);
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
    type: [v],
    tooltip: "物品信息列表"
  })], _ctor.prototype, "itemLists", undefined);
  __decorate([_property({
    tooltip: "全选对后的action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    tooltip: "选错后的action"
  })], _ctor.prototype, "falseAction", undefined);
  return __decorate([_ccclass, _menu("文字游戏/找不同")], _ctor);
}(r_LevelPreload.default);
exports.default = def_WordFindDiff;