var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_UtilsSystem = require("UtilsSystem");
var r_LevelPreload = require("LevelPreload");
var r_ViewTipsUI = require("ViewTipsUI");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var S = function () {
  function e() {
    this.node = null;
    this.tipNode = null;
    this.showSpriteFrame = null;
    this.name = "";
    this.keyList = [];
    this.selectAction = "";
    this.isFinish = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "node", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示"
  })], e.prototype, "tipNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选中后显示图片"
  })], e.prototype, "showSpriteFrame", undefined);
  __decorate([_property({
    displayName: "名字"
  })], e.prototype, "name", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以选中"
  })], e.prototype, "keyList", undefined);
  __decorate([_property({
    tooltip: "选对后的action"
  })], e.prototype, "selectAction", undefined);
  return __decorate([_ccclass("WordFindLineDiffInfo2")], e);
}();
var I = function () {
  function e() {
    this.itemLists = [];
    this.finishAction = "";
  }
  __decorate([_property({
    type: [S],
    tooltip: "物品信息列表"
  })], e.prototype, "itemLists", undefined);
  __decorate([_property({
    displayName: "结束action"
  })], e.prototype, "finishAction", undefined);
  return __decorate([_ccclass("WordFindLineDiffSceneInfo")], e);
}();
var def_WordFindLineDiff2 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemGrid = null;
    t.ItemPrefab = null;
    t.MIN_SCALE = 1;
    t.MAX_SCALE = 2;
    t.winAction = "";
    t.falseAction = "";
    t.sceneList = [];
    t.curIndex = 0;
    t.loopKey = false;
    t.downTime = 90;
    t.finishList = [];
    t.gridList = [];
    t.curScene = 0;
    t.isFinish = false;
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
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    cc.tween(this.node).delay(1).call(function () {}).start();
  };
  _ctor.prototype.failLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.init = function () {
    for (var e = 0; e < this.sceneList.length; e++) {
      var t = this.sceneList[e];
      for (var o = 0; o < t.itemLists.length; o++) {
        var i = t.itemLists[o];
        i.node.active = false;
        i.tipNode.active = false;
      }
      for (o = 0; o < t.itemLists.length; o++) {
        var n = cc.instantiate(this.ItemPrefab);
        n.active = true;
        n.parent = this.itemGrid;
        this.gridList.push(n);
      }
    }
    this.registTouch();
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.showAnwser.bind(this);
  };
  _ctor.prototype.showAnwser = function () {
    for (var e = 0; e < this.sceneList.length; e++) {
      var t = this.sceneList[e];
      for (var o = 0; o < t.itemLists.length; o++) {
        var i = t.itemLists[o];
        i.node.active = true;
        if (!i.isFinish) {
          i.tipNode.active = true;
          i.tipNode.color = cc.Color.GREEN;
        }
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
  _ctor.prototype.getNeedFindNum = function () {
    var e = 0;
    for (var t = 0; t <= this.curScene; t++) {
      e += this.sceneList[t].itemLists.length;
    }
    return e;
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
        if (!e.isFinish) {
          if (o.getTouches().length > 1) {
            r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
          } else {
            var i = function (o) {
              var i = e.sceneList[e.curScene].itemLists[o];
              i.index = o;
              if (i.isFinish) {
                return "continue";
              }
              if (i.keyList.length > 0 && !r_CheckHasKeys.checkHasKeys(i.keyList)) {
                return "continue";
              }
              if (r_UtilsSystem.UtilsSystem.touchInNode(i.node, t)) {
                r_SoundMgr.SoundMgr.playSound("正确提示");
                i.isFinish = true;
                i.node.active = true;
                i.tipNode.active = true;
                i.tipNode.color = cc.Color.RED;
                var n = i.tipNode.getComponent(cc.Sprite);
                n.type = cc.Sprite.Type.FILLED;
                n.fillType = cc.Sprite.FillType.RADIAL;
                n.fillCenter.x = .5;
                n.fillCenter.y = .5;
                n.fillRange = 0;
                cc.tween(n).to(.5, {
                  fillRange: 1
                }).call(function () {}).start();
                var a = new cc.Node();
                var s = a.addComponent(cc.Sprite);
                s.type = cc.Sprite.Type.SIMPLE;
                s.sizeMode = cc.Sprite.SizeMode.RAW;
                a.width = 114;
                a.height = 114;
                s.spriteFrame = i.showSpriteFrame;
                e.node.addChild(a);
                var r = i.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                var l = a.parent.convertToNodeSpaceAR(r);
                a.x = l.x;
                a.y = l.y;
                r = e.gridList[e.curIndex].convertToWorldSpaceAR(cc.Vec2.ZERO);
                l = a.parent.convertToNodeSpaceAR(r);
                var d = e.curIndex;
                cc.tween(a).to(.5, {
                  x: l.x,
                  y: l.y,
                  scale: 1
                }).call(function () {
                  a.destroy();
                  e.setItemIcon(d, i);
                }).start();
                e.finishList.push(i);
                r_TriggerActionMgr.TriggerActionMgr.trigger(i.selectAction);
                e.curIndex = e.curIndex + 1;
                if (e.curIndex >= e.getNeedFindNum()) {
                  if (e.curScene >= e.sceneList.length - 1) {
                    e.isFinish = true;
                    if ("" == e.winAction) {
                      e.passLevel();
                    } else {
                      r_TriggerActionMgr.TriggerActionMgr.trigger(e.winAction);
                    }
                  } else {
                    r_TriggerActionMgr.TriggerActionMgr.trigger(e.sceneList[e.curScene].finishAction);
                    e.curScene = e.curScene + 1;
                  }
                }
              }
            };
            for (var n = 0; n < e.sceneList[e.curScene].itemLists.length; n++) {
              i(n);
            }
          }
        }
      } else {
        t = null;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
      if (t && !e.isFinish) {
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
    tooltip: "全选对后的action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    tooltip: "选错后的action"
  })], _ctor.prototype, "falseAction", undefined);
  __decorate([_property({
    type: [I],
    tooltip: "场景信息"
  })], _ctor.prototype, "sceneList", undefined);
  return __decorate([_ccclass, _menu("文字游戏/线稿找茬(多场景)")], _ctor);
}(r_LevelPreload.default);
exports.default = def_WordFindLineDiff2;