var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_FishBoatCfg = require("FishBoatCfg");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_CatchUI = require("CatchUI");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_Index = require("Index");
var r_BehaviorMgr = require("BehaviorMgr");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DebugSystem = require("DebugSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_CatchFish = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.fishingInterface = null;
    t.controlNode = null;
    t.moveNode = null;
    t.aimStartPos = null;
    t.aimPoint = null;
    t.pathPoint = null;
    t.netAnim = null;
    t.normalNet = null;
    t.bestNet = null;
    t.normalNetUse = null;
    t.bestNetUse = null;
    t.normalNetNum = null;
    t.bestNetNum = null;
    t.net = "";
    t.gameStart = false;
    t.width = 0;
    t.height = 0;
    t.points = [];
    t.pointNum = 14;
    t.netPos = cc.v2(0, 0);
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    this.bg = this.fishingInterface.getChildByName("背景条");
    this.fish = this.bg.getChildByName("鱼");
    this.needle = this.fishingInterface.getChildByName("指针");
    this.controlNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.controlNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.controlNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.width = this.moveNode.width;
    this.height = this.moveNode.height;
    this.netPos = this.netAnim.getPosition();
    this.reFreshNetNum();
    for (var e in r_FishBoatCfg.FishNet) for (var t = 0; t < r_FishBoatCfg.FishNet[e].length; t++) {
      r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/fish/" + r_FishBoatCfg.FishNet[e].name, cc.Prefab);
    }
  };
  _ctor.prototype.start = function () {};
  _ctor.initGame = function () {
    r_BehaviorMgr.BehaviorMgr.trigger("游戏开始");
  };
  _ctor.prototype.buyNet = function (e, t) {
    var o = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if ("normalNet" == t) {
      if (r_PlayerData.PlayerData.data.catchFishMap.normalNet > 0) {
        return;
      }
      if (!r_PlayerData.PlayerData.isCoinEnough(1e6)) {
        return void r_UtilsSystem.UtilsSystem.showTip("金币不够");
      }
      r_PlayerData.PlayerData.deleteCoin("购买普通渔网", 1e6, r_ReportSystem.SystemKey.渔船);
      r_PlayerData.PlayerData.data.catchFishMap.normalNet += 3;
      this.reFreshNetNum();
    } else {
      if (r_PlayerData.PlayerData.data.catchFishMap.bestNet > 0) {
        return;
      }
      r_PlatformSystem.PlatformSystem.showVideo("捕鱼达人尼龙网", function () {
        r_PlayerData.PlayerData.data.catchFishMap.bestNet += 2;
        o.reFreshNetNum();
      });
    }
  };
  _ctor.prototype.select = function (e, t) {
    r_SoundMgr.SoundMgr.playSound("click");
    if ("bestNet" == t) {
      this.scaleX = .8;
      r_PlayerData.PlayerData.data.catchFishMap.bestNet--;
      r_BehaviorMgr.BehaviorMgr.trigger("显示撒网界面");
      this.net = t;
      this.gameStart = true;
      this.standbyAnimation();
    } else {
      r_PlayerData.PlayerData.data.catchFishMap.normalNet--;
      r_BehaviorMgr.BehaviorMgr.trigger("显示撒网界面");
      this.scaleX = 1;
      this.net = t;
      this.gameStart = true;
      this.standbyAnimation();
    }
    this.reFreshNetNum();
  };
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    if (this.gameStart) {
      this.fish.x >= this.bg.width / 2 - 5 && (this.fish.scaleX = Math.abs(this.scaleX));
      this.fish.x <= this.bg.width / -2 + 5 && (this.fish.scaleX = -Math.abs(this.scaleX));
    }
  };
  _ctor.prototype.standbyAnimation = function () {
    this.needle.getChildByName(this.net.toString()).active = true;
    this.needle.x = 1 == Math.floor(2 * Math.random()) ? Math.random() * this.bg.width / 2 : Math.random() * this.bg.width / -2;
    this.fish.x = this.bg.width / -2;
    this.fish.scaleX = 1;
    this.fish.stopAllActions();
    this.fish.runAction(cc.repeatForever(cc.sequence(cc.moveBy(this.scaleX, cc.v2(this.bg.width, this.fish.y)), cc.moveBy(this.scaleX, cc.v2(-1 * this.bg.width, this.fish.y)))));
  };
  _ctor.prototype.theNet = function () {
    r_BehaviorMgr.BehaviorMgr.trigger("收网");
    this.getFish = this.needle.x <= this.fish.x + this.fish.width / 2 && this.needle.x >= this.fish.x - this.fish.width / 2;
  };
  _ctor.prototype.resetNet = function () {
    this.netAnim.setPosition(this.netPos);
    this.netAnim.angle = 0;
  };
  _ctor.prototype.showTheGets = function () {
    var e = r_FishBoatCfg.FishNet[this.net];
    var t = 0;
    var i = Math.random();
    var n = e[0];
    for (var a = 0; a < e.length - 1; a++) {
      if (i < (t += e[a].probability)) {
        n = e[a];
        break;
      }
    }
    Math.random() < e[e.length - 1].probability && (n = e[e.length - 1]);
    this.getFish || (n = e[0]);
    if (r_Index.Platform.isDarenPlatform()) {
      if (r_DebugSystem.DebugSystem.fishType == r_DebugSystem.GMToolTypeFish.jian) {
        "bestNet" == this.net && (n = e[6]);
      } else if (r_DebugSystem.DebugSystem.fishType == r_DebugSystem.GMToolTypeFish.caidan1) {
        "bestNet" != this.net && (n = e[8]);
      } else if (r_DebugSystem.DebugSystem.fishType == r_DebugSystem.GMToolTypeFish.caidan2) {
        "bestNet" == this.net && (n = e[8]);
      } else {
        r_DebugSystem.DebugSystem.fishType == r_DebugSystem.GMToolTypeFish.caidan3 && (n = "bestNet" == this.net ? e[9] : e[10]);
      }
    }
    console.log(n);
    if (!this.getFish || null == n.name) {
      r_UtilsSystem.UtilsSystem.showTip("什么都没打捞到...");
      return _ref__ctor.initGame();
    }
    r_CatchUI.CatchUI.showUI(n);
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.leaveLevel = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    this.itemStartPos = this.moveNode.getPosition();
    this.controlStartPos = this.controlNode.getPosition();
    for (var t = 0; t < this.pointNum; t++) {
      var o = new cc.Node();
      o.addComponent(cc.Sprite).spriteFrame = this.pathPoint;
      o.parent = this.aimStartPos.parent;
      o.setSiblingIndex(0);
      o.scale = 1 - .05 * t;
      o.active = false;
      this.points.push(o);
    }
    this.moveNode.addComponent(cc.Sprite).spriteFrame = this.aimPoint;
    this.moveNode.width = this.width;
    this.moveNode.height = this.height;
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    var o = t.subtract(this.touchStartPos);
    var i = (t = this.controlStartPos.add(o)).subtract(this.controlStartPos);
    i.mag() > 126.5 && (t = this.controlStartPos.add(i.normalize().mul(126.5)));
    this.controlNode.setPosition(t);
    var n = t.subtract(this.controlStartPos);
    var a = n.normalize().mul(2 * n.mag());
    t = this.itemStartPos.add(a);
    this.moveNode.setPosition(t);
    this.drawLine();
  };
  _ctor.prototype.onTouchEnd = function () {
    r_BehaviorMgr.BehaviorMgr.trigger("撒网");
    r_BehaviorMgr.BehaviorMgr.trigger("隐藏撒网界面");
    var e = this.moveNode.getPosition();
    e.y > 200 && (e.y = 200);
    e.y < 50 && (e.y = -50);
    var t = Math.atan2(e.y - this.netPos.y, e.x - this.netPos.x);
    t = 180 * t / Math.PI - 90;
    this.netAnim.angle = t;
    this.netAnim.setPosition(this.netPos);
    cc.tween(this.netAnim).to(.5, {
      x: e.x,
      y: e.y
    }).start();
    this.moveNode.setPosition(this.itemStartPos);
    this.controlNode.setPosition(this.controlStartPos);
    for (var o = 0; o < this.points.length; o++) {
      this.points[o].destroy();
    }
    this.points = [];
    this.moveNode.getComponent(cc.Sprite) && this.moveNode.removeComponent(cc.Sprite);
  };
  _ctor.prototype.drawLine = function () {
    var e = this;
    var t = this.aimStartPos.getPosition();
    var o = this.moveNode.getPosition();
    var i = this.getBezier(t, o);
    this.getBezierPoints(i, this.pointNum).forEach(function (t, o) {
      e.points[o].active = true;
      e.points[o].setPosition(t);
    });
  };
  _ctor.prototype.getBezier = function (e, t) {
    var o = t.sub(e);
    var i = e.add(o.mul(.2));
    i.x *= -1;
    return [e, i, t];
  };
  _ctor.prototype.getBezierPoints = function (e, t) {
    var o = [];
    for (var i = 0; i < t; i++) {
      var n = this.getBezierPoint(e, i / t);
      o.push(n);
    }
    return o;
  };
  _ctor.prototype.getBezierPoint = function (e, t) {
    var o = 1 - t;
    var i = e[0].x * o * o + e[1].x * t * o + e[2].x * t * t;
    var n = e[0].y * o * o + e[1].y * t * o + e[2].y * t * t;
    return cc.v2(i, n);
  };
  _ctor.prototype.reFreshNetNum = function () {
    this.normalNetNum.string = "x" + r_PlayerData.PlayerData.data.catchFishMap.normalNet;
    this.bestNetNum.string = "x" + r_PlayerData.PlayerData.data.catchFishMap.bestNet;
    this.normalNet.active = r_PlayerData.PlayerData.data.catchFishMap.normalNet <= 0;
    this.normalNetUse.active = !this.normalNet.active;
    this.bestNet.active = r_PlayerData.PlayerData.data.catchFishMap.bestNet <= 0;
    this.bestNetUse.active = !this.bestNet.active;
  };
  __decorate([_property({
    displayName: "打捞界面",
    type: cc.Node
  })], _ctor.prototype, "fishingInterface", undefined);
  __decorate([_property({
    displayName: "控制摇杆",
    type: cc.Node
  })], _ctor.prototype, "controlNode", undefined);
  __decorate([_property({
    displayName: "移动节点",
    type: cc.Node
  })], _ctor.prototype, "moveNode", undefined);
  __decorate([_property({
    displayName: "瞄准点起点位置",
    type: cc.Node
  })], _ctor.prototype, "aimStartPos", undefined);
  __decorate([_property({
    displayName: "瞄准点图片",
    type: cc.SpriteFrame
  })], _ctor.prototype, "aimPoint", undefined);
  __decorate([_property({
    displayName: "路径点图片",
    type: cc.SpriteFrame
  })], _ctor.prototype, "pathPoint", undefined);
  __decorate([_property({
    displayName: "网动画",
    type: cc.Node
  })], _ctor.prototype, "netAnim", undefined);
  __decorate([_property({
    displayName: "普通渔网购买按钮",
    type: cc.Node
  })], _ctor.prototype, "normalNet", undefined);
  __decorate([_property({
    displayName: "尼龙渔网购买按钮",
    type: cc.Node
  })], _ctor.prototype, "bestNet", undefined);
  __decorate([_property({
    displayName: "普通渔网使用按钮",
    type: cc.Node
  })], _ctor.prototype, "normalNetUse", undefined);
  __decorate([_property({
    displayName: "尼龙渔网使用按钮",
    type: cc.Node
  })], _ctor.prototype, "bestNetUse", undefined);
  __decorate([_property({
    displayName: "普通渔网数量",
    type: cc.Label
  })], _ctor.prototype, "normalNetNum", undefined);
  __decorate([_property({
    displayName: "尼龙渔网数量",
    type: cc.Label
  })], _ctor.prototype, "bestNetNum", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CatchFish;