var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WLANodeInfo = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_SoundMgr = require("SoundMgr");
var r_Index = require("Index");
var r_TYEventType = require("TYEventType");
var r_LevelConfig = require("LevelConfig");
var r_LoadMgr = require("LoadMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RelaxSystem = require("RelaxSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_WLANodeInfo = function () {
  function _ctor() {
    this.node = null;
    this.icon = null;
    this.name = "";
    this.needKey = "";
    this.finishKey = "";
    this.num = 0;
    this.sceneIndex = 1;
    this.optional = false;
    this.isFinish = false;
  }
  __decorate([_property({
    displayName: "提示点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "道具icon",
    type: cc.SpriteFrame
  })], _ctor.prototype, "icon", undefined);
  __decorate([_property()], _ctor.prototype, "name", undefined);
  __decorate([_property()], _ctor.prototype, "needKey", undefined);
  __decorate([_property()], _ctor.prototype, "finishKey", undefined);
  __decorate([_property()], _ctor.prototype, "num", undefined);
  __decorate([_property({
    step: 1
  })], _ctor.prototype, "sceneIndex", undefined);
  __decorate([_property({
    displayName: "是否可选项"
  })], _ctor.prototype, "optional", undefined);
  return __decorate([_ccclass("WLANodeInfo")], _ctor);
}();
exports.WLANodeInfo = exp_WLANodeInfo;
var def_WhatLookingAtLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.touchNodeScale = new cc.Vec2(1, 2);
    t.canScale = true;
    t.itemList = null;
    t.ItemPrefab = null;
    t.isShowTipNode = true;
    t.isShowIconNode = true;
    t.finishActionId = "";
    t.blackNode = null;
    t.totalNumLabel = null;
    t.totalNumPreStr = "";
    t.totalNum = 0;
    t.itemNodeList = [];
    t.num = 0;
    t.beginDistance = 0;
    t.beginScale = 0;
    t.bgNode = null;
    t.rectNode = null;
    t.clampfPos = new cc.Vec4(0, 0, 0, 0);
    t.curIndex = 0;
    t.curSceneIndex = 0;
    t.dx = 0;
    t.dy = 0;
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
    this.init();
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.init = function () {
    this.rectNode = this.touchNode.parent;
    this.bgNode = this.touchNode;
    if (this.bgNode) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.bgNode);
      this.bgNode.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onBgTouchStart, this);
      this.bgNode.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onBgTouchMove, this);
      this.bgNode.on(r_TYEventType.TYEventType.TOUCH_END, this.onBgTouchEnd, this);
      this.bgNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onBgTouchEnd, this);
    }
    r_Index.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
    this.triggerChangeScene(null, null, 1);
    this.blackNode && (this.blackNode.opacity = 255);
  };
  _ctor.prototype.start = function () {
    this.checkFourLimit();
  };
  _ctor.prototype.update = function () {};
  _ctor.prototype.onDestroy = function () {
    r_Index.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onBgTouchStart = function (e) {
    this.beginDistance = 0;
    this.beginScale = this.touchNode.scale;
    this.dx = 0;
    this.dy = 0;
    e.getLocation();
    this.checkFourLimit();
  };
  _ctor.prototype.onBgTouchMove = function (e) {
    var t = e.getTouches();
    this.dx += e.getDeltaX();
    this.dy += e.getDeltaY();
    if (1 == t.length) {
      this.checkMapPosition(e.getDeltaX(), e.getDeltaY());
    } else if (2 == t.length) {
      var o = t[0].getLocation();
      var i = t[1].getLocation();
      var n = o.sub(i).len();
      this.beginDistance <= 0 && (this.beginDistance = n);
      var a = n / this.beginDistance * this.beginScale;
      var s = cc.misc.clampf(a, this.touchNodeScale.x, this.touchNodeScale.y);
      this.scaleUI(s);
    }
  };
  _ctor.prototype.onBgTouchEnd = function (e) {
    if (!(this.dx * this.dx + this.dy * this.dy >= 16)) {
      e.getLocation();
      this.checkFourLimit();
    }
  };
  _ctor.prototype.mouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.touchNode.scale += t;
    var i = cc.misc.clampf(o, this.touchNodeScale.x, this.touchNodeScale.y);
    this.scaleUI(i);
  };
  _ctor.prototype.scaleUI = function (e) {
    if (this.canScale) {
      this.checkFourLimit(e);
      this.checkMapPosition();
      this.touchNode.scale = e;
    }
  };
  _ctor.prototype.onCheck = function (e) {
    var t = e.data;
    var o = t.add;
    var i = t.key;
    if (o) {
      for (var n = this.itemNodeList.length - 1; n >= 0; n--) {
        var a = this.itemNodeList[n];
        if (i == a.finishKey) {
          if (this.isShowIconNode) {
            this.findItem(a);
          } else {
            this.findItem2(a);
          }
          break;
        }
      }
    }
  };
  _ctor.prototype.triggerFindItem = function (e, t, o) {
    for (var i = this.itemNodeList.length - 1; i >= 0; i--) {
      var n = this.itemNodeList[i];
      if (n.name == o) {
        if (this.isShowIconNode) {
          this.findItem(n);
        } else {
          this.findItem2(n);
        }
        break;
      }
    }
  };
  _ctor.prototype.triggerChangeScene = function (e, t, o) {
    if (this.itemList) {
      this.curSceneIndex = parseInt(o);
      this.curIndex = 0;
      this.itemList.removeAllChildren();
      this.totalNum = 0;
      this.num = 0;
      for (var i = this.itemNodeList.length - 1; i >= 0; i--) {
        var n = this.itemNodeList[i];
        if (n.sceneIndex == this.curSceneIndex && !n.optional && n.node && r_BehaviorMgr.BehaviorMgr.hasKeys(n.needKey)) {
          var a = cc.instantiate(this.ItemPrefab);
          a.active = true;
          a.parent = this.itemList;
          this.totalNum += n.num;
        }
      }
      this.addTotalNum(0);
    }
  };
  _ctor.prototype.findItem = function (e) {
    var t = this;
    if (e.node && (r_SoundMgr.SoundMgr.playSound("回答正确"), this.showTipNode(e.node), !(this.curIndex >= this.itemList.childrenCount))) {
      var o = this.itemList.children[this.curIndex];
      var i = o.getChildByName("icon");
      if (e.icon) {
        i.spriteCom.spriteFrame = e.icon;
        var n = i.spriteCom.spriteFrame.getOriginalSize();
        if (n.width > n.height) {
          i.height = i.width * n.height / n.width;
        } else {
          i.width = i.height * n.width / n.height;
        }
      }
      this.scrollToNext(o);
      var a = cc.instantiate(i);
      a.parent = this.node.parent;
      a.worldPosition = e.node.worldPosition.clone();
      this.curIndex++;
      i.active = false;
      cc.tween(a).to(.2, {
        worldPosition: this.touchNode.parent.worldPosition,
        scale: 2
      }).delay(.3).to(.2, {
        worldPosition: i.worldPosition,
        scale: 1
      }).call(function () {
        a.destroy();
        i.active = true;
        o.getChildByName("label").labelCom.string = e.name;
        if (e.num > 0) {
          o.getChildByName("num").labelCom.string = e.num.toString();
          t.addTotalNum(e.num);
        }
        if (t.curIndex < t.itemList.childrenCount) {
          var n = t.itemList.children[t.curIndex];
          t.scrollToNext(n, .2);
        }
        t.checkFinish();
      }).start();
    }
  };
  _ctor.prototype.findItem2 = function (e) {
    if (e.node) {
      r_SoundMgr.SoundMgr.playSound("回答正确");
      this.showTipNode(e.node);
      this.addTotalNum(e.num);
      e.optional || this.curIndex++;
      this.checkFinish();
    }
  };
  _ctor.prototype.checkFinish = function () {
    this.itemList.childrenCount == this.curIndex && "" != this.finishActionId && r_BehaviorMgr.BehaviorMgr.trigger(this.finishActionId);
  };
  _ctor.prototype.showTipNode = function (e) {
    if (this.isShowTipNode) {
      e.active = true;
      e.color = cc.Color.RED;
      var t = e.getComponent(cc.Sprite);
      t.type = cc.Sprite.Type.FILLED;
      t.fillType = cc.Sprite.FillType.RADIAL;
      t.fillCenter.x = .5;
      t.fillCenter.y = .5;
      t.fillRange = 0;
      cc.tween(t).to(.5, {
        fillRange: 1
      }).call(function () {}).start();
    }
  };
  _ctor.prototype.addTotalNum = function (e) {
    this.num += e;
    this.totalNumLabel && (this.totalNumLabel.string = this.totalNumPreStr + this.num + "/" + this.totalNum);
  };
  _ctor.prototype.scrollToNext = function (e, t) {
    var o;
    undefined === t && (t = 0);
    if (this.propScrollview || (this.propScrollview = null === (o = cc.find("道具栏", this.node)) || undefined === o ? undefined : o.getComponent(cc.ScrollView), this.propScrollview)) {
      var i = this.propScrollview.content.parent;
      var n = i.convertToNodeSpaceAR(e.worldPosition);
      if (this.propScrollview.vertical) {
        var a = (i.height - e.height) / 2;
        if (n.y < -a || n.y > a) {
          var s = 1 - (Math.abs(e.y - e.height / 2) - i.height) / this.propScrollview.getMaxScrollOffset().y;
          this.propScrollview.scrollToPercentVertical(s, t);
        }
      } else if (this.propScrollview.horizontal) {
        var r = (i.width - e.width) / 2;
        if (n.x < -r || n.x > r) {
          s = (Math.abs(e.x + e.width / 2) - i.width) / this.propScrollview.getMaxScrollOffset().x;
          this.propScrollview.scrollToPercentHorizontal(s, t);
        }
      }
    }
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.checkMapPosition = function (e, t) {
    undefined === e && (e = 0);
    undefined === t && (t = 0);
    var o = this.touchNode;
    o.x = cc.misc.clampf(o.x + e, this.clampfPos.w, this.clampfPos.z);
    o.y = cc.misc.clampf(o.y + t, this.clampfPos.y, this.clampfPos.x);
  };
  _ctor.prototype.checkFourLimit = function (e) {
    e || (e = this.touchNode.scale);
    if (this.bgNode == this.touchNode) {
      this.touchNode.scale = e;
      e = 1;
    }
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
    r_RelaxSystem.RelaxSystem.lose();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.passLevel = function () {
    r_RelaxSystem.RelaxSystem.win();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.stopMusic = function () {
    console.log("停止bgm");
    cc.audioEngine.stopMusic();
  };
  _ctor.prototype.playMusic = function () {
    console.log("播放bgm");
    var e = r_LevelConfig.default.levelInfo[r_LoadMgr.default.currLv];
    e.newBgm && "" != e.newBgm && r_SoundMgr.SoundMgr.playMusic(e.newBgm);
  };
  __decorate([_property({
    displayName: "缩放节点",
    type: cc.Node
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "缩放范围"
  })], _ctor.prototype, "touchNodeScale", undefined);
  __decorate([_property({
    displayName: "是否可缩放界面"
  })], _ctor.prototype, "canScale", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具列表"
  })], _ctor.prototype, "itemList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "道具预设"
  })], _ctor.prototype, "ItemPrefab", undefined);
  __decorate([_property({
    displayName: "是否显示提示图"
  })], _ctor.prototype, "isShowTipNode", undefined);
  __decorate([_property({
    displayName: "是否显示收集图"
  })], _ctor.prototype, "isShowIconNode", undefined);
  __decorate([_property({
    displayName: "找完道具后触发"
  })], _ctor.prototype, "finishActionId", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "遮罩（一开始黑屏）"
  })], _ctor.prototype, "blackNode", undefined);
  __decorate([_property({
    type: cc.Label
  })], _ctor.prototype, "totalNumLabel", undefined);
  __decorate([_property({
    displayName: "totalNumLabel前缀字符"
  })], _ctor.prototype, "totalNumPreStr", undefined);
  __decorate([_property({
    displayName: "提示列表",
    type: exp_WLANodeInfo
  })], _ctor.prototype, "itemNodeList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_WhatLookingAtLogic;