var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_LevelPreload = require("LevelPreload");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ViewTipsUI = require("ViewTipsUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var C = function () {
  function e() {
    this.node = null;
    this.showSpriteFrame = null;
    this.name = "";
    this.action = "";
    this.score = 1e3;
    this.tipNode = null;
    this.content = "提示内容";
    this.sound = "";
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
    type: Number,
    displayName: "积分"
  })], e.prototype, "score", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示节点"
  })], e.prototype, "tipNode", undefined);
  __decorate([_property({
    displayName: "提示内容"
  })], e.prototype, "content", undefined);
  __decorate([_property({
    displayName: "提示音效"
  })], e.prototype, "sound", undefined);
  return __decorate([_ccclass("WordFindBigInfo2")], e);
}();
var S = function () {
  function e() {
    this.itemLists = [];
    this.finishAction = "";
  }
  __decorate([_property({
    type: [C],
    tooltip: "不同列表"
  })], e.prototype, "itemLists", undefined);
  __decorate([_property({
    displayName: "结束action"
  })], e.prototype, "finishAction", undefined);
  return __decorate([_ccclass("WordFindSceneInfo")], e);
}();
var def_PerspectiveSceneLogic2 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.totalScore = 5e3;
    t.itemGrid = null;
    t.ItemPrefab = null;
    t.madArea = null;
    t.sceneList = [];
    t.winAction = "";
    t.anim = null;
    t.bubbleNode = null;
    t.winContent = "胜利文字";
    t.failContent = "失败文字";
    t.startContent = "开场内容";
    t.startSound = "";
    t.winSound = "";
    t.loseSound = "";
    t.huangzAnim = "jinzhang";
    t.gridList = [];
    t.innerCamera = null;
    t.innerShowSprite = null;
    t.mirrorNode = null;
    t.curIndex = 0;
    t.curScene = 0;
    t.mirrorOriginPos = null;
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
    r_SoundMgr.SoundMgr.playSound(this.loseSound);
    if (this.anim) {
      if (this.bubbleNode) {
        this.bubbleNode.active = true;
        this.bubbleNode.getChildByName("content").getComponent(cc.Label).string = this.failContent;
      }
      cc.Tween.stopAllByTarget(this.node);
      cc.tween(this.node).delay(5).call(function () {
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
      }).start();
    } else {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("perAnim");
  };
  _ctor.prototype.refreshScore = function () {
    this.node.getChildByName("totalLb").getComponent(cc.Label).string = this.totalScore + "";
  };
  _ctor.prototype.init = function () {
    var e = this;
    this.innerCamera = this.node.getChildByName("innerCamera").getComponent(cc.Camera);
    this.mirrorNode = this.node.getChildByName("mirrorNode");
    this.innerShowSprite = this.mirrorNode.children[0].children[0].getComponent(cc.Sprite);
    var t = new cc.RenderTexture();
    var o = this.innerShowSprite.node.width;
    var i = this.innerShowSprite.node.height;
    t.initWithSize(o, i);
    var n = new cc.SpriteFrame();
    n.setTexture(t);
    this.innerCamera.targetTexture = t;
    this.innerShowSprite.spriteFrame = n;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    for (var a = 0; a < this.sceneList.length; a++) {
      var s = this.sceneList[a];
      for (var r = 0; r < s.itemLists.length; r++) {
        var c = s.itemLists[r];
        c.node && (c.node.active = false);
        c.tipNode && (c.tipNode.active = false);
      }
      for (r = 0; r < s.itemLists.length; r++) {
        var l = cc.instantiate(this.ItemPrefab);
        l.active = true;
        l.parent = this.itemGrid;
        this.gridList.push(l);
      }
    }
    this.registTouch();
    this.isPause = false;
    this.refreshScore();
    r_ViewTipsUI.ViewTipsUI.clickAnswerCallBack = this.showAnwser.bind(this);
    r_SoundMgr.SoundMgr.playSound(this.startSound);
    if (this.bubbleNode) {
      this.bubbleNode.active = true;
      this.bubbleNode.getChildByName("content").getComponent(cc.Label).string = this.startContent;
      r_TimeSystem.TimeSystem.scheduleOnce("perAnim", 2, function () {
        e.bubbleNode.active = false;
      });
    }
    this.anim && this.anim.setAnimation(0, "daiji", true);
  };
  _ctor.prototype.showAnwser = function () {
    for (var e = 0; e < this.sceneList.length; e++) {
      var t = this.sceneList[e];
      for (var o = 0; o < t.itemLists.length; o++) {
        var i = t.itemLists[o];
        if (!i.isFinish) {
          i.tipNode.active = true;
          i.tipNode.color = cc.Color.GREEN;
        }
      }
    }
  };
  _ctor.prototype.setItemIcon = function (e, t) {
    var o = this.gridList[e];
    o.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = t.showSpriteFrame;
    o.getChildByName("label").getComponent(cc.Label).string = t.name;
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
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (o) {
      e.mirrorOriginPos = null;
      t = o.getLocation();
      var i = function (o) {
        var i = e.sceneList[e.curScene].itemLists[o];
        i.index = o;
        if (i.isFinish) {
          return "continue";
        }
        if (!r_UtilsSystem.UtilsSystem.touchInNode(e.madArea.node, t)) {
          return "continue";
        }
        if (r_UtilsSystem.UtilsSystem.touchInNode(i.node, t)) {
          if (e.bubbleNode) {
            e.bubbleNode.active = true;
            e.bubbleNode.getChildByName("content").getComponent(cc.Label).string = i.content;
          }
          if (e.anim) {
            e.anim.setAnimation(0, e.huangzAnim, true);
            r_TimeSystem.TimeSystem.scheduleOnce("perAnim", 2, function () {
              e.bubbleNode && (e.bubbleNode.active = false);
            });
          }
          i.isFinish = true;
          i.node.active = true;
          r_SoundMgr.SoundMgr.playSound("lv0099/99click");
          r_SoundMgr.SoundMgr.playSound(i.sound);
          e.setItemIcon(e.curIndex, i);
          e.curIndex = e.curIndex + 1;
          e.totalScore = e.totalScore - i.score;
          e.refreshScore();
          var n = e.node.getChildByName("animLb");
          n.active = true;
          n.getComponent(cc.Label).string = "-" + i.score;
          cc.Tween.stopAllByTarget(n);
          n.y = e.node.getChildByName("totalLb").y;
          cc.tween(n).by(1, {
            y: 200
          }).call(function () {
            n.active = false;
          }).start();
          i.tipNode.active = true;
          i.tipNode.color = cc.Color.RED;
          var a = i.tipNode.getComponent(cc.Sprite);
          a.type = cc.Sprite.Type.FILLED;
          a.fillType = cc.Sprite.FillType.RADIAL;
          a.fillCenter.x = .5;
          a.fillCenter.y = .5;
          a.fillRange = 0;
          cc.tween(a).to(.5, {
            fillRange: 1
          }).call(function () {
            i.tipNode.active = false;
          }).start();
          if (e.curIndex >= e.getNeedFindNum()) {
            r_TriggerActionMgr.TriggerActionMgr.trigger(i.action);
            if (e.curScene >= e.sceneList.length - 1) {
              r_TimeSystem.TimeSystem.scheduleOnce("perAnim", 2.5, function () {
                if (e.bubbleNode) {
                  e.bubbleNode.active = true;
                  e.bubbleNode.getChildByName("content").getComponent(cc.Label).string = e.winContent;
                }
                r_SoundMgr.SoundMgr.playSound(e.winSound);
                r_TimeSystem.TimeSystem.scheduleOnce("perAnim", 2.5, function () {
                  e.bubbleNode && (e.bubbleNode.active = false);
                  if ("" == e.winAction) {
                    e.passLevel();
                  } else {
                    r_TriggerActionMgr.TriggerActionMgr.trigger(e.winAction);
                  }
                });
              });
            } else {
              r_TriggerActionMgr.TriggerActionMgr.trigger(e.sceneList[e.curScene].finishAction);
              e.curScene = e.curScene + 1;
            }
          } else {
            r_TriggerActionMgr.TriggerActionMgr.trigger(i.action);
          }
          return {
            value: undefined
          };
        }
      };
      for (var n = 0; n < e.sceneList[e.curScene].itemLists.length; n++) {
        var a = i(n);
        if ("object" == typeof a) {
          return a.value;
        }
      }
      r_UtilsSystem.UtilsSystem.touchInNode(e.mirrorNode, t) && (e.mirrorOriginPos = e.mirrorNode.getPosition());
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (o) {
      if (e.mirrorOriginPos) {
        var i = o.getLocation();
        var n = e.mirrorOriginPos.add(i.subtract(t));
        e.innerCamera.node.setPosition(n);
        e.mirrorNode.setPosition(n);
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (o) {
      if (e.mirrorOriginPos) {
        var i = o.getLocation();
        var n = e.mirrorOriginPos.add(i.subtract(t));
        e.innerCamera.node.setPosition(n);
        e.mirrorNode.setPosition(n);
      }
    });
  };
  __decorate([_property({
    type: Number,
    displayName: "总积分"
  })], _ctor.prototype, "totalScore", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "正确列表"
  })], _ctor.prototype, "itemGrid", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具栏"
  })], _ctor.prototype, "ItemPrefab", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "放大镜区域"
  })], _ctor.prototype, "madArea", undefined);
  __decorate([_property({
    type: [S],
    tooltip: "场景信息"
  })], _ctor.prototype, "sceneList", undefined);
  __decorate([_property({
    displayName: "胜利action"
  })], _ctor.prototype, "winAction", undefined);
  __decorate([_property({
    type: sp.Skeleton,
    displayName: "动画"
  })], _ctor.prototype, "anim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "气泡节点"
  })], _ctor.prototype, "bubbleNode", undefined);
  __decorate([_property({
    displayName: "胜利文字"
  })], _ctor.prototype, "winContent", undefined);
  __decorate([_property({
    displayName: "失败文字"
  })], _ctor.prototype, "failContent", undefined);
  __decorate([_property({
    displayName: "开场内容"
  })], _ctor.prototype, "startContent", undefined);
  __decorate([_property({
    displayName: "开始动画"
  })], _ctor.prototype, "startSound", undefined);
  __decorate([_property({
    displayName: "胜利动画"
  })], _ctor.prototype, "winSound", undefined);
  __decorate([_property({
    displayName: "结束动画"
  })], _ctor.prototype, "loseSound", undefined);
  __decorate([_property({
    displayName: "慌张动画"
  })], _ctor.prototype, "huangzAnim", undefined);
  return __decorate([_ccclass, _menu("文字游戏/放大镜(多场景)")], _ctor);
}(r_LevelPreload.default);
exports.default = def_PerspectiveSceneLogic2;