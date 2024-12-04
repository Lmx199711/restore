var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordScaryItemType = undefined;
var c;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
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
    displayName: "选中后的action"
  })], e.prototype, "selectAction", undefined);
  __decorate([_property({
    displayName: "是否只触发一次"
  })], e.prototype, "triggerOneTime", undefined);
  return __decorate([_ccclass("WordTouchScaryItem")], e);
}();
(function (e) {
  e[e["照相机"] = 1] = "照相机";
  e[e["眼镜"] = 2] = "眼镜";
  e[e["遥控器"] = 3] = "遥控器";
})(c = exports.WordScaryItemType || (exports.WordScaryItemType = {}));
var I = function () {
  function e() {
    this.areaList = [];
    this.addType = c.照相机;
    this.name = "";
    this.showList = [];
    this.isFind = false;
  }
  __decorate([_property({
    type: [cc.Node],
    displayName: "点击区域列表"
  })], e.prototype, "areaList", undefined);
  __decorate([_property({
    type: cc.Enum(c),
    displayName: "道具类型"
  })], e.prototype, "addType", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "icon"
  })], e.prototype, "spriteFrame", undefined);
  __decorate([_property({
    displayName: "名字"
  })], e.prototype, "name", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "使用显示节点"
  })], e.prototype, "showList", undefined);
  return __decorate([_ccclass("WordScaryItemInfo")], e);
}();
var b = function () {
  function e() {
    this.areaList = [];
    this.content = "";
    this.isGlassFind = false;
    this.isFinish = false;
  }
  __decorate([_property({
    type: [cc.Node],
    displayName: "点击区域列表"
  })], e.prototype, "areaList", undefined);
  __decorate([_property({
    displayName: "文案"
  })], e.prototype, "content", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示"
  })], e.prototype, "tipNode", undefined);
  __decorate([_property({
    displayName: "只有眼镜看到才能点"
  })], e.prototype, "isGlassFind", undefined);
  return __decorate([_ccclass("WordScaryDiffInfo")], e);
}();
var x = function () {
  function e() {
    this.maskList = [];
    this.polyList = [];
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "显示节点"
  })], e.prototype, "showNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "隐藏节点"
  })], e.prototype, "hideNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "背景对齐节点"
  })], e.prototype, "bgPosNode", undefined);
  __decorate([_property({
    type: [cc.Mask],
    displayName: "遮罩列表"
  })], e.prototype, "maskList", undefined);
  __decorate([_property({
    type: [cc.PolygonCollider],
    displayName: "镜框碰撞"
  })], e.prototype, "polyList", undefined);
  return __decorate([_ccclass("WordGlassItemInfo")], e);
}();
var def_WordScaryDiff = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.glassInfo = new x();
    t.numLb = null;
    t.MIN_SCALE = 1;
    t.MAX_SCALE = 2;
    t.winAction = "";
    t.itemList = [];
    t.itemRoot = null;
    t.findList = [];
    t.touchItemList = [];
    t.curIndex = 0;
    t.loopKey = false;
    t.downTime = 90;
    t.itemBtnList = [];
    t.findItemList = [];
    t.curItemIndex = 0;
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
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    this.loopKey = false;
    cc.tween(this.node).delay(1).call(function () {}).start();
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.update = function (t) {
    e.prototype.update.call(this, t);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(t);
  };
  _ctor.prototype.init = function () {
    this.levelNode || (this.levelNode = this.node);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.levelNode);
    this.node.getChildByName("btnClose").active = false;
    this.curIndex = 0;
    for (var e = 0; e < this.findList.length; e++) {
      var t = this.findList[e];
      for (var o = 0; o < t.areaList.length; o++) {
        t.areaList[o].active = false;
      }
    }
    for (e = 0; e < this.itemList.length; e++) {
      var i = this.itemRoot.getChildByName("" + (e + 1));
      i.active = true;
      var n = i.getComponent(cc.Button);
      var a = new cc.Component.EventHandler();
      a.target = this.node;
      a.component = "WordScaryDiff";
      a.handler = "clickItem";
      a.customEventData = e + 1 + "";
      n.clickEvents.push(a);
      this.itemBtnList.push(i);
    }
    this.registTouch();
    this.refreshNum();
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.showAnwser.bind(this);
  };
  _ctor.prototype.showAnwser = function () {
    r_ViewTipsUI.ViewTipsUI.showUI();
    for (var e = 0; e < this.findList.length; e++) {
      var t = this.findList[e];
      if (!t.isFinish) {
        for (var o = 0; o < t.areaList.length; o++) {
          t.areaList[o].active = true;
          t.areaList[o].color = cc.Color.GREEN;
        }
      }
    }
  };
  _ctor.prototype.refreshNum = function () {
    this.numLb.string = this.curIndex + "/" + this.findList.length;
  };
  _ctor.prototype.onClickClose = function () {
    if (this.curItemIndex) {
      var e = this.itemBtnList[this.curItemIndex - 1];
      var t = this.findItemList[this.curItemIndex - 1];
      this.curItemIndex = 0;
      if (t) {
        this.node.getChildByName("btnClose").active = false;
        e.getChildByName("select").active = false;
        this.normalBg.active = true;
        for (var o = 0; o < t.showList.length; o++) {
          t.showList[o].active = false;
        }
      }
    }
  };
  _ctor.prototype.clickItem = function (e, t) {
    t = parseInt(t);
    this.curItemIndex && this.onClickClose();
    var o = this.findItemList[t - 1];
    if (o) {
      this.node.getChildByName("btnClose").active = true;
      this.itemBtnList[t - 1].getChildByName("select").active = true;
      this.curItemIndex = t;
      this.normalBg.active = false;
      for (var i = 0; i < o.showList.length; i++) {
        o.showList[i].active = true;
      }
      this.showGlassArea();
    }
  };
  _ctor.prototype.isGlassMode = function () {
    if (!this.curItemIndex) {
      return false;
    }
    var e = this.findItemList[this.curItemIndex - 1];
    return !(!e || e.addType != c.眼镜);
  };
  _ctor.prototype.refreshItemList = function () {
    for (var e = 0; e < this.itemBtnList.length; e++) {
      var t = this.itemBtnList[e];
      var o = this.findItemList[e];
      if (o) {
        t.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = o.spriteFrame;
        t.getChildByName("label").getComponent(cc.Label).string = o.name;
        t.getChildByName("unknow").active = false;
      }
    }
  };
  _ctor.prototype.touchInMask = function (e) {
    if (this.scaleRoot) {
      var t = this.mapContainer;
      var o = t.convertToNodeSpaceAR(e);
      return o.x > -t.width / 2 && o.x < t.width / 2 && o.y > -t.height / 2 && o.y < t.height / 2;
    }
    return true;
  };
  _ctor.prototype.showGlassArea = function () {
    if (this.isGlassMode()) {
      for (var e = 0; e < this.glassInfo.maskList.length; e++) {
        var t = this.glassInfo.maskList[e];
        var o = t._graphics;
        o.lineWidth = 1;
        o.strokeColor = cc.color(255, 0, 0);
        o.fillColor = cc.color(0, 255, 0);
        o.clear();
        for (var i = 0; i < this.glassInfo.polyList.length; i++) {
          var n = this.glassInfo.polyList[i];
          var a = n.points;
          for (var s = 0; s < a.length; s++) {
            var r = a[s];
            var c = n.node.convertToWorldSpaceAR(r);
            var l = t.node.convertToNodeSpaceAR(c);
            if (0 == s) {
              o.moveTo(l.x, l.y);
            } else if (s == a.length - 1) {
              o.lineTo(l.x, l.y);
              o.close();
              o.stroke();
              o.fill();
            } else {
              o.lineTo(l.x, l.y);
            }
          }
        }
      }
    }
  };
  _ctor.prototype.isInGlass = function (e) {
    e.getComponent(cc.PolygonCollider);
    for (var t = 0; t < this.glassInfo.polyList.length; t++) {
      return true;
    }
    return false;
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = this.node.getChildByName("touchNode");
    var t = null;
    var o = null;
    var i = null;
    var n = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (i) {
      t = null;
      n = null;
      o = i.getLocation();
      if (e.touchInMask(o)) {
        if (i.getTouches().length > 1) {
          r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
        } else {
          for (var a = 0; a < e.touchItemList.length; a++) {
            var s = e.touchItemList[a];
            var r = s.itemCollider.node.convertToNodeSpaceAR(o);
            if ((!s.isTrigger || !s.triggerOneTime) && cc.Intersection.pointInPolygon(r, s.itemCollider.points)) {
              t = s;
              r_TriggerActionMgr.TriggerActionMgr.trigger(t.selectAction);
              return void (t.isTrigger = true);
            }
          }
          var c = function (t) {
            var i = e.itemList[t];
            if (i.isFind) {
              return "continue";
            }
            var n = false;
            for (var a = 0; a < i.areaList.length; a++) {
              if (i.areaList[a].parent.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(i.areaList[a], o)) {
                n = true;
                break;
              }
            }
            if (n) {
              i.isFind = true;
              var s = new cc.Node();
              var r = s.addComponent(cc.Sprite);
              r.type = cc.Sprite.Type.SIMPLE;
              r.sizeMode = cc.Sprite.SizeMode.RAW;
              s.width = 114;
              s.height = 114;
              r.spriteFrame = i.spriteFrame;
              e.node.addChild(s);
              var c = i.areaList[0].convertToWorldSpaceAR(cc.Vec2.ZERO);
              var l = s.parent.convertToNodeSpaceAR(c);
              s.x = l.x;
              s.y = l.y;
              c = e.itemBtnList[e.findItemList.length].convertToWorldSpaceAR(cc.Vec2.ZERO);
              l = s.parent.convertToNodeSpaceAR(c);
              cc.tween(s).to(.2, {
                x: 0,
                y: 0,
                scale: 5
              }).delay(.5).to(.5, {
                x: l.x,
                y: l.y,
                scale: 1
              }).call(function () {
                s.destroy();
              }).start();
              e.findItemList.push(i);
              e.refreshItemList();
              return {
                value: undefined
              };
            }
          };
          for (a = 0; a < e.itemList.length; a++) {
            var d = c(a);
            if ("object" == typeof d) {
              return d.value;
            }
          }
          var y = function (t) {
            var i = e.findList[t];
            i.index = t;
            if (i.isFinish) {
              return "continue";
            }
            var n = null;
            for (var a = 0; a < i.areaList.length; a++) {
              if ((!i.isGlassFind || i.isGlassFind && e.isInGlass(i.areaList[a])) && i.areaList[a].parent.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(i.areaList[a], o)) {
                n = i.areaList[a];
                break;
              }
            }
            if (n) {
              e.curIndex = e.curIndex + 1;
              i.isFinish = true;
              r_SoundMgr.SoundMgr.playSound("lv0099/99click");
              for (a = 0; a < i.areaList.length; a++) {
                i.areaList[a].active = true;
                i.areaList[a].color = cc.Color.RED;
                var s = i.areaList[a].getComponent(cc.Sprite);
                s.type = cc.Sprite.Type.FILLED;
                s.fillType = cc.Sprite.FillType.RADIAL;
                s.fillCenter.x = .5;
                s.fillCenter.y = .5;
                s.fillRange = 0;
                cc.tween(s).to(.5, {
                  fillRange: 1
                }).call(function () {}).start();
              }
              e.refreshNum();
              if (i.tipNode) {
                i.tipNode.active = true;
                i.tipNode.opacity = 0;
                i.tipNode.zIndex = e.curIndex;
                cc.tween(i.tipNode).to(.5, {
                  opacity: 255
                }).delay(1).to(.5, {
                  opacity: 0
                }).call(function () {
                  i.tipNode.active = false;
                }).start();
              }
              if (e.curIndex >= e.findList.length) {
                if ("" == e.winAction) {
                  e.passLevel();
                } else {
                  r_TriggerActionMgr.TriggerActionMgr.trigger(e.winAction);
                }
              }
              return {
                value: undefined
              };
            }
          };
          for (a = 0; a < e.findList.length; a++) {
            var f = y(a);
            if ("object" == typeof f) {
              return f.value;
            }
          }
          if (e.glassInfo.showNode.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(e.glassInfo.showNode, o)) {
            (n = e.glassInfo.showNode).startX = n.x;
            n.startY = n.y;
          }
        }
      } else {
        o = null;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      if (o) {
        i = a.getLocation();
        if (n) {
          n.x = n.startX + i.x - o.x;
          n.y = n.startY + i.y - o.y;
          return void e.showGlassArea();
        }
        var s = a.getTouches();
        if (2 == s.length && e.scaleRoot) {
          t = null;
          r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
          r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          var r;
          var c = s[0];
          var l = s[1];
          var h = c.getDelta();
          var p = l.getDelta();
          var d = e.scaleRoot.convertToNodeSpaceAR(c.getLocation());
          var y = e.scaleRoot.convertToNodeSpaceAR(l.getLocation());
          var f = d.sub(y);
          var m = h.sub(cc.v2(p.x, p.y));
          r = Math.abs(f.x) > Math.abs(f.y) ? (f.x + m.x) / f.x * e.scaleRoot.scaleX : (f.y + m.y) / f.y * e.scaleRoot.scaleY;
          var g = y.add(cc.v2(f.x / 2, f.y / 2));
          var v = r - e.scaleRoot.scaleX;
          var C = g.scale(cc.v2(v, v));
          var S = e.scaleRoot.getPosition().sub(cc.v2(C.x, C.y));
          if (r < e.MAX_SCALE && r > e.MIN_SCALE) {
            e.scaleRoot.scale = r;
            e.dealScalePos(S, e.scaleRoot);
          }
        }
        if (1 == s.length) {
          if (Math.abs(i.x - o.x) + Math.abs(i.y - o.y) > 100) {
            t = null;
            r_TimeSystem.TimeSystem.scheduleClear("selectWordItem");
            r_TimeSystem.TimeSystem.scheduleClear("selectTouchItem");
          }
          var I = cc.v2(s[0].getDelta());
          e.dealMove(I, e.scaleRoot, e.mapContainer);
        }
        e.showGlassArea();
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
    type: x,
    displayName: "眼镜信息"
  })], _ctor.prototype, "glassInfo", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "正常背景"
  })], _ctor.prototype, "normalBg", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "数字节点"
  })], _ctor.prototype, "numLb", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "缩放根节点"
  })], _ctor.prototype, "scaleRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "内容节点"
  })], _ctor.prototype, "mapContainer", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最小缩放"
  })], _ctor.prototype, "MIN_SCALE", undefined);
  __decorate([_property({
    type: Number,
    displayName: "最大缩放"
  })], _ctor.prototype, "MAX_SCALE", undefined);
  __decorate([_property({
    displayName: "结尾action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    type: [I],
    displayName: "道具列表"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具根节点"
  })], _ctor.prototype, "itemRoot", undefined);
  __decorate([_property({
    type: [b],
    tooltip: "找茬列表",
    displayName: "找茬列表"
  })], _ctor.prototype, "findList", undefined);
  __decorate([_property({
    type: [S],
    tooltip: "点击列表",
    displayName: "点击列表"
  })], _ctor.prototype, "touchItemList", undefined);
  return __decorate([_ccclass, _menu("文字游戏/恐怖找茬")], _ctor);
}(r_LevelPreload.default);
exports.default = def_WordScaryDiff;