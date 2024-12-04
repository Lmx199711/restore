var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlassItemInfo1 = undefined;
var r_LevelPreload = require("LevelPreload");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_GameTipUI = require("GameTipUI");
var r_ViewTipsUI = require("ViewTipsUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var I = function () {
  function e() {
    this.node = null;
    this.showSpriteFrame = null;
    this.name = "";
    this.action = "";
    this.tipNode = null;
    this.needInGlass = true;
    this.sound = "";
    this.soundTime = 3;
    this.moveTarget = null;
    this.tipContent = "提示文字";
    this.keyList = [];
    this.isFinish = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "node", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "选中后显示图片"
  })], e.prototype, "showSpriteFrame", undefined);
  __decorate([_property({
    displayName: "名字"
  })], e.prototype, "name", undefined);
  __decorate([_property({
    tooltip: "选对后的action"
  })], e.prototype, "action", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示节点"
  })], e.prototype, "tipNode", undefined);
  __decorate([_property({
    displayName: "需要在放大镜内"
  })], e.prototype, "needInGlass", undefined);
  __decorate([_property({
    displayName: "提示音效"
  })], e.prototype, "sound", undefined);
  __decorate([_property({
    displayName: "提示音效时间"
  })], e.prototype, "soundTime", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "目标移动节点"
  })], e.prototype, "moveTarget", undefined);
  __decorate([_property({
    tooltip: "提示文字"
  })], e.prototype, "tipContent", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以完成"
  })], e.prototype, "keyList", undefined);
  return __decorate([_ccclass("GlassFindBigInfo")], e);
}();
var exp_GlassItemInfo1 = function () {
  function _ctor() {
    this.maskList = [];
    this.polyArea = null;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "放大镜节点"
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    type: [cc.Mask],
    displayName: "遮罩列表"
  })], _ctor.prototype, "maskList", undefined);
  __decorate([_property({
    type: [cc.PolygonCollider],
    displayName: "镜框碰撞"
  })], _ctor.prototype, "polyArea", undefined);
  return __decorate([_ccclass("GlassItemInfo1")], _ctor);
}();
exports.GlassItemInfo1 = exp_GlassItemInfo1;
var def_GlassFindLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moveBg = null;
    t.itemGrid = null;
    t.ItemPrefab = null;
    t.tipAnimNode = null;
    t.glassInfo = new exp_GlassItemInfo1();
    t.winAction = "";
    t.touchNode = null;
    t.itemLists = [];
    t.gridList = [];
    t.findItemList = [];
    t.curIndex = 0;
    t.widthDis = 0;
    t.heightDis = 0;
    t.maxScale = 2;
    t.isShowAnswer = false;
    t.mirrorOriginPos = null;
    t.bgOriginPos = null;
    t.lastSound = null;
    t.lastInfo = null;
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
    this.isPlayAnim = true;
    this.isPause = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.failLevel = function () {
    r_TimeSystem.TimeSystem.scheduleClear("perAnim");
    this.isPlayAnim = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.init = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    for (var e = 0; e < this.itemLists.length; e++) {
      var t = this.itemLists[e];
      t.node && t.node.getChildByName("tip") && (t.node.getChildByName("tip").active = false);
      t.tipNode && (t.tipNode.active = false);
    }
    if (this.ItemPrefab) {
      for (e = 0; e < this.itemLists.length; e++) {
        var o = cc.instantiate(this.ItemPrefab);
        o.active = true;
        o.parent = this.itemGrid;
        this.gridList.push(o);
      }
    }
    this.registTouch();
    this.isPause = false;
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.checkShowAnwser.bind(this);
    this.widthDis = (this.moveBg.width - this.moveBg.parent.width) / 2;
    this.widthDis = Math.max(this.widthDis, 0);
    this.heightDis = (this.moveBg.height - this.moveBg.parent.height) / 2;
    this.heightDis = Math.max(this.heightDis, 0);
  };
  _ctor.prototype.onShowGameTip = function () {
    r_GameTipUI.GameTipUI.setTipBtnVideoVisible(true);
  };
  _ctor.prototype.checkShowAnwser = function (e) {
    var t = this;
    e || function () {
      var e = null;
      for (var o = t.itemLists.length - 1; o >= 0; o--) {
        var i = t.itemLists[o];
        if (!i.isFinish) {
          e = i;
          break;
        }
      }
      if (e) {
        if (e.moveTarget) {
          r_ViewTipsUI.ViewTipsUI.showAnserTip(e.tipContent);
        } else {
          t.moveBg.scale = t.maxScale;
          var n = t.moveBg.x;
          var a = t.moveBg.y;
          var s = e.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var r = t.moveBg.parent.convertToWorldSpaceAR(cc.Vec2.ZERO);
          t.moveBg.x = t.moveBg.x + (r.x - s.x);
          t.moveBg.y = t.moveBg.y + (r.y - s.y);
          var c = (t.moveBg.width * t.maxScale - t.moveBg.parent.width) / 2;
          var l = (t.moveBg.height * t.maxScale - t.moveBg.parent.height) / 2;
          c = Math.max(c, 0);
          l = Math.max(l, 0);
          t.moveBg.x < -c && (t.moveBg.x = -c);
          t.moveBg.x > c && (t.moveBg.x = c);
          t.moveBg.y < -l && (t.moveBg.y = -l);
          t.moveBg.y > l && (t.moveBg.y = l);
          t.isShowAnswer = true;
          s = e.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var u = t.tipAnimNode.parent.convertToNodeSpaceAR(s);
          t.tipAnimNode.setPosition(u);
          if (t.glassInfo.node) {
            u = t.glassInfo.polyArea.node.convertToNodeSpaceAR(s);
            t.glassInfo.node.x = t.glassInfo.node.x + (u.x - t.glassInfo.polyArea.node.x);
            t.glassInfo.node.y = t.glassInfo.node.y + (u.y - t.glassInfo.polyArea.node.y);
            t.showGlassArea();
          }
          var h = t.moveBg.x;
          var p = t.moveBg.y;
          t.moveBg.x = n;
          t.moveBg.y = a;
          t.moveBg.scale = 1;
          cc.Tween.stopAllByTarget(t.moveBg);
          cc.tween(t.moveBg).to(.2, {
            x: h,
            y: p,
            scale: t.maxScale
          }).call(function () {
            t.tipAnimNode.active = true;
            t.playRotationAnim();
          }).start();
          r_GameTipUI.GameTipUI.setTipBtnVisible(false);
        }
      }
    }();
  };
  _ctor.prototype.playRotationAnim = function () {
    var e = this.tipAnimNode.getChildByName("anim");
    var t = e.getComponent(cc.Animation);
    e.getChildByName("liz").getComponent(cc.ParticleSystem).resetSystem();
    t.play();
  };
  _ctor.prototype.setItemIcon = function (e, t) {
    if (this.ItemPrefab) {
      var o = this.gridList[e];
      o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = t.showSpriteFrame;
      o.getChildByName("label").getComponent(cc.Label).string = t.name;
    }
  };
  _ctor.prototype.showGlassArea = function () {
    if (this.glassInfo.node) {
      for (var e = 0; e < this.glassInfo.maskList.length; e++) {
        var t = this.glassInfo.maskList[e];
        var o = t._graphics;
        o.lineWidth = 1;
        o.strokeColor = cc.color(255, 0, 0);
        o.fillColor = cc.color(0, 255, 0);
        o.clear();
        var i = this.glassInfo.polyArea;
        var n = i.points;
        for (var a = 0; a < n.length; a++) {
          var s = n[a];
          var r = i.node.convertToWorldSpaceAR(s);
          var c = t.node.convertToNodeSpaceAR(r);
          if (0 == a) {
            o.moveTo(c.x, c.y);
          } else if (a == n.length - 1) {
            o.lineTo(c.x, c.y);
            o.close();
            o.stroke();
            o.fill();
          } else {
            o.lineTo(c.x, c.y);
          }
        }
      }
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
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (i) {
      e.mirrorOriginPos = null;
      e.bgOriginPos = null;
      t = i.getLocation();
      o = null;
      for (var n = 0; n < e.itemLists.length; n++) {
        var a = e.itemLists[n];
        a.index = n;
        if (!a.isFinish && a.node.parent.activeInHierarchy && (!e.glassInfo.node || !a.needInGlass || r_UtilsSystem.UtilsSystem.touchInNode(e.glassInfo.polyArea.node, t)) && r_UtilsSystem.UtilsSystem.touchInNode(a.node, t)) {
          if (a.moveTarget) {
            if (e.isShowAnswer) {
              continue;
            }
            return void ((o = a).mirrorOriginPos = a.node.getPosition());
          }
          if (e.isShowAnswer) {
            e.isShowAnswer = false;
            cc.Tween.stopAllByTarget(e.moveBg);
            e.moveBg.scale = 1;
            e.moveBg.x = 0;
            e.moveBg.y = 0;
            e.tipAnimNode.active = false;
            r_GameTipUI.GameTipUI.setTipBtnVisible(true);
          }
          e.finishItem(a);
          return void e.triggerNext(a);
        }
      }
      if (!e.isShowAnswer) {
        if (e.glassInfo.node && r_UtilsSystem.UtilsSystem.touchInNode(e.glassInfo.node, t)) {
          e.mirrorOriginPos = e.glassInfo.node.getPosition();
        } else {
          r_UtilsSystem.UtilsSystem.touchInNode(e.moveBg.parent, t) && (e.bgOriginPos = e.moveBg.getPosition());
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (i) {
      if (!e.isShowAnswer) {
        if (o) {
          var n = i.getLocation();
          var a = o.mirrorOriginPos.add(n.subtract(t));
          o.node.setPosition(a);
        } else {
          if (e.glassInfo.node && e.mirrorOriginPos) {
            n = i.getLocation();
            a = e.mirrorOriginPos.add(n.subtract(t));
            e.glassInfo.node.setPosition(a);
            e.showGlassArea();
          }
          if (e.bgOriginPos) {
            n = i.getLocation();
            (a = e.bgOriginPos.add(n.subtract(t))).x < -e.widthDis && (a.x = -e.widthDis);
            a.x > e.widthDis && (a.x = e.widthDis);
            a.y < -e.heightDis && (a.y = -e.heightDis);
            a.y > e.heightDis && (a.y = e.heightDis);
            e.moveBg.setPosition(a);
            e.showGlassArea();
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {
      if (!e.isShowAnswer && o) {
        var t = o.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        if (o.keyList.length > 0 && !r_CheckHasKeys.checkHasKeys(o.keyList)) {
          o.node.setPosition(o.mirrorOriginPos);
          return void (o = null);
        } else {
          return void (r_UtilsSystem.UtilsSystem.touchInNode(o.moveTarget, t) ? (e.finishItem(o), e.triggerNext(o), o = null) : (o.node.setPosition(o.mirrorOriginPos), o = null));
        }
      }
    });
  };
  _ctor.prototype.finishItem = function (e) {
    var t = this;
    this.lastInfo && this.lastInfo.tipNode && (this.lastInfo.tipNode.active = false);
    e.isFinish = true;
    e.node.active = true;
    r_SoundMgr.SoundMgr.stopSound("lv0527/开始");
    this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
    this.lastSound = e.sound;
    this.lastInfo = e;
    r_SoundMgr.SoundMgr.playSound(e.sound);
    e.needInGlass && r_UtilsSystem.UtilsSystem.changeParent(e.node, e.node.parent.parent);
    var o = e.node.getChildByName("tip");
    if (e.moveTarget) {
      e.moveTarget.active = true;
      o = e.moveTarget.getChildByName("tip");
    }
    o.active = true;
    o.color = cc.Color.RED;
    var i = o.getComponent(cc.Sprite);
    i.type = cc.Sprite.Type.FILLED;
    i.fillType = cc.Sprite.FillType.RADIAL;
    i.fillCenter.x = .5;
    i.fillCenter.y = .5;
    i.fillRange = 0;
    cc.tween(i).to(.5, {
      fillRange: 1
    }).call(function () {}).start();
    var n = new cc.Node();
    var a = n.addComponent(cc.Sprite);
    a.type = cc.Sprite.Type.SIMPLE;
    a.sizeMode = cc.Sprite.SizeMode.RAW;
    n.width = 114;
    n.height = 114;
    a.spriteFrame = e.showSpriteFrame;
    var s = this.curIndex;
    this.node.addChild(n);
    var r = e.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var c = n.parent.convertToNodeSpaceAR(r);
    n.x = c.x;
    n.y = c.y;
    r = this.gridList[this.findItemList.length].convertToWorldSpaceAR(cc.Vec2.ZERO);
    c = n.parent.convertToNodeSpaceAR(r);
    cc.tween(n).to(.2, {
      x: 0,
      y: 0,
      scale: 2
    }).delay(.5).to(.5, {
      x: c.x,
      y: c.y,
      scale: 1
    }).call(function () {
      n.destroy();
      t.setItemIcon(s, e);
    }).start();
    this.findItemList.push(e);
    if (e.tipNode) {
      e.tipNode.active = true;
      r_TimeSystem.TimeSystem.scheduleOnce("perAnim" + s, e.soundTime, function () {
        e.tipNode.active = false;
      });
    }
  };
  _ctor.prototype.triggerNext = function (e) {
    var t = this;
    this.curIndex = this.curIndex + 1;
    if (this.curIndex >= this.itemLists.length) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.action);
      if ("" == this.winAction) {
        r_TimeSystem.TimeSystem.scheduleOnce("perAnim", 1, function () {
          t.passLevel();
        });
      } else {
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.winAction);
      }
    } else {
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.action);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_TimeSystem.TimeSystem.scheduleClearAll();
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "移动背景"
  })], _ctor.prototype, "moveBg", undefined);
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
    displayName: "提示动画"
  })], _ctor.prototype, "tipAnimNode", undefined);
  __decorate([_property({
    type: exp_GlassItemInfo1,
    displayName: "放大镜相关"
  })], _ctor.prototype, "glassInfo", undefined);
  __decorate([_property({
    displayName: "胜利action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: [I],
    tooltip: "不同列表"
  })], _ctor.prototype, "itemLists", undefined);
  return __decorate([_ccclass, _menu("放大镜/找茬")], _ctor);
}(r_LevelPreload.default);
exports.default = def_GlassFindLogic;