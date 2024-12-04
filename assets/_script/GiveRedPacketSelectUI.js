var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiveRedPacketSelectUI = exports.redPacketCityInfo = undefined;
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_GiveRedPacketGame = require("GiveRedPacketGame");
exports.redPacketCityInfo = [{
  id: 1,
  name: "上海",
  icon: "上海",
  pr: .1,
  money: 1600
}, {
  id: 2,
  name: "广东",
  icon: "广东",
  pr: .3,
  money: 5
}, {
  id: 3,
  name: "北京",
  icon: "北京",
  pr: .1,
  money: 2900
}, {
  id: 4,
  name: "河南",
  icon: "河南",
  pr: .1,
  money: 400
}, {
  id: 5,
  name: "云南",
  icon: "云南",
  pr: .1,
  money: 400
}, {
  id: 6,
  name: "福建",
  icon: "福建",
  pr: .1,
  money: 3600
}, {
  id: 7,
  name: "湖南",
  icon: "湖南",
  pr: .1,
  money: 800
}, {
  id: 8,
  name: "黑龙江",
  icon: "黑龙江",
  pr: .1,
  money: 500
}];
var exp_GiveRedPacketSelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GiveRedPacket, r_UIDef.UIDef.Res.UI.GiveRedPacketSelectUI) || this;
    t.uiType = "fullScreen";
    t.time = 0;
    t.isStartMove = false;
    t.isStop = false;
    t.curPrizeDraw = 0;
    t.cityItemList = [];
    t.curMoveCount = 0;
    t.totalMoveCount = 0;
    t.cityId = 1;
    t.curIndex = 0;
    t.oneRedMoney = 1;
    t.tiggerCaidan1 = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GiveRedPacketSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GiveRedPacketSelectUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
    this.btnPlay.onClick(this.onClickPay, this);
    this.btnPrizeDraw.onClick(this.onClickPrizeDraw, this);
    this.btnStartGame.onClick(this.onClickStartGame, this);
    for (var i = 1; i <= 8; i++) {
      var n = this.contentPane.getChild("cityItem" + i).asCom;
      n.getChild("pic").asLoader.url = "ui://GiveRedPacket/" + exports.redPacketCityInfo[i - 1].icon;
      n.getChild("lbMoney").asTextField.text = r_UtilsSystem.UtilsSystem.numFormats(exports.redPacketCityInfo[i - 1].money);
      this.cityItemList[i - 1] = n;
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "giveRedPacket/longAnim", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.caidanAnim.node.removeAllChildren();
      var i = cc.instantiate(o);
      t.caidanAnim.node.addChild(i);
      t.caidanAnim.visible = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("game1", "giveRedPacket/gamePrefab", cc.Prefab, function () {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          return [2];
        });
      });
    });
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("giveRedPacket/BGM_01");
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_DebugSystem.DebugSystem.giveRedPacketType == r_DebugSystem.GMToolTypeGiveRedPacket.nine) {
      r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1 = 0;
      r_PlayerData.PlayerData.data.giveRedPacketMap.caidan2 = 0;
      r_DebugSystem.DebugSystem.giveRedPacketType = r_DebugSystem.GMToolTypeGiveRedPacket.normal;
    }
    _ref__ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "giveRedPacket/longNode", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.long.node.removeAllChildren();
      var i = cc.instantiate(o);
      t.long.node.addChild(i);
      t.registLongTouch();
    });
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnPrizeDraw.getController("c1").selectedIndex = 0;
    this.curPrizeDraw = 0;
    this.cityId = 1;
    this.totalMoveCount = 0;
    this.curIndex = 0;
    this.time = 0;
    this.isStartMove = false;
    this.long.visible = true;
    this.btnStartGame.visible = false;
    this.isStop = false;
    this.resetCityItem();
    r_TimeSystem.TimeSystem.registUpdate("GiveRedPacketUpdate", this.update.bind(this));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_TimeSystem.TimeSystem.unregistUpdate("GiveRedPacketUpdate");
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.onClickClose = function () {
    if (this.isStartMove || this.isStop) {
      r_UtilsSystem.UtilsSystem.showTip("抽取中");
    } else {
      this.caidanAnim.visible = false;
      this.tiggerCaidan1 = false;
      if (1 == this.contentPane.getController("c1").selectedIndex) {
        this.curPrizeDraw = 0;
        this.contentPane.getController("c1").selectedIndex = 0;
        this.btnPrizeDraw.getController("c1").selectedIndex = 0;
        this.btnStartGame.visible = false;
        this.resetCityItem();
        this.long.visible = true;
      } else {
        this.hide();
      }
    }
  };
  _ctor.prototype.onClickPay = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("派红包开一次", function () {
      e.contentPane.getController("c1").selectedIndex = 1;
      if (r_PlayerData.PlayerData.data.giveRedPacketMap.isGuide) {
        e.showGuideFiger(false);
      } else {
        e.showGuideFiger();
      }
    });
  };
  _ctor.prototype.onClickPrizeDraw = function () {
    var e = this;
    if (this.isStartMove || this.isStop) {
      r_UtilsSystem.UtilsSystem.showTip("抽取中");
    } else {
      this.btnStartGame.visible = false;
      this.curPrizeDraw += 1;
      if (1 == this.curPrizeDraw) {
        r_PlayerData.PlayerData.data.giveRedPacketMap.isGuide = 1;
        this.btnPrizeDraw.getController("c1").selectedIndex = 1;
        this.showMove();
      } else {
        r_PlatformSystem.PlatformSystem.showVideo("派红包重新抽取", function () {
          e.showMove();
        });
      }
    }
  };
  _ctor.prototype.onClickStartGame = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnPrizeDraw.getController("c1").selectedIndex = 0;
    this.btnStartGame.visible = false;
    this.long.visible = true;
    this.curPrizeDraw = 0;
    this.resetCityItem();
    r_GiveRedPacketGame.GiveRedPacketGame.showUI();
  };
  _ctor.prototype.showGuideFiger = function (e) {
    undefined === e && (e = true);
    var t = this.btnPrizeDraw.getChild("anim");
    if (e) {
      t.visible = true;
      t.loop = true;
      t.animationName = "step_4";
      t.playing = true;
    } else {
      t.visible = false;
    }
  };
  _ctor.prototype.registLongTouch = function () {
    var e = this;
    var t = this.long.node.getChildByName("anim");
    var o = null;
    var i = [];
    var n = [];
    for (var a = 1; a <= 6; a++) {
      i.push(t.getChildByName("area" + a));
    }
    t.off(cc.Node.EventType.TOUCH_START);
    t.on(cc.Node.EventType.TOUCH_START, function (e) {
      o = e.getLocation();
      n = [];
      for (var t = 0; t < i.length; t++) {
        r_UtilsSystem.UtilsSystem.touchInNode(i[t], o) && -1 == n.indexOf(t) && n.push(t);
      }
    }, this);
    t.off(cc.Node.EventType.TOUCH_MOVE);
    t.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      var t = e.getLocation();
      for (var o = 0; o < i.length; o++) {
        r_UtilsSystem.UtilsSystem.touchInNode(i[o], t) && -1 == n.indexOf(o) && n.push(o);
      }
    }, this);
    t.off(cc.Node.EventType.TOUCH_END);
    t.on(cc.Node.EventType.TOUCH_END, function (t) {
      var o = t.getLocation();
      for (var a = 0; a < i.length; a++) {
        r_UtilsSystem.UtilsSystem.touchInNode(i[a], o) && -1 == n.indexOf(a) && n.push(a);
      }
      n.length == i.length && e.listIsSame(n, [0, 1, 2, 3, 4, 5]) && 1 != r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1 && e.showCaidanAnim();
    }, this);
    if (r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1) {
      t.off(cc.Node.EventType.TOUCH_START);
      t.off(cc.Node.EventType.TOUCH_MOVE);
      t.off(cc.Node.EventType.TOUCH_END);
    }
  };
  _ctor.prototype.showCaidanAnim = function () {
    var e = this;
    if (this.caidanAnim.node.getChildByName("anim")) {
      r_SoundMgr.SoundMgr.playSound("giveRedPacket/龙宝拜年音效");
      this.caidanAnim.visible = true;
      this.tiggerCaidan1 = true;
      var t = this.caidanAnim.node.getChildByName("anim").getChildByName("anim").getComponent(sp.Skeleton);
      var o = t.setAnimation(0, "step_1", false);
      t.setTrackCompleteListener(o, function () {
        t.setAnimation(0, "step_2", true);
      });
      this.long.visible = false;
      r_TimeSystem.TimeSystem.scheduleOnce("caidan1", 5, function () {
        e.caidanAnim.visible = false;
      });
    }
  };
  _ctor.prototype.listIsSame = function (e, t) {
    if (e.length != t.length) {
      return false;
    }
    for (var o = 0; o < e.length; o++) {
      if (e[o] != t[o]) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.showMove = function () {
    this.curMoveCount = 0;
    this.time = 0;
    this.isStartMove = true;
    var e = this.cityId;
    this.randomCity();
    if (this.cityId > e) {
      this.totalMoveCount = this.cityId - e + 24;
    } else {
      this.totalMoveCount = 8 - (e - this.cityId) + 24;
    }
    this.setCityItemSelectByIndex(this.curIndex);
    e > 0 && console.log(" 之前城市:", exports.redPacketCityInfo[e - 1].name, " 现在城市:", exports.redPacketCityInfo[this.cityId - 1].name);
  };
  _ctor.prototype.getAllMoney = function () {
    var e = 0;
    for (var t = 0; t < exports.redPacketCityInfo.length; t++) {
      e += exports.redPacketCityInfo[t].money;
    }
    return e;
  };
  _ctor.prototype.resetCityItem = function () {
    for (var e = 0; e < this.cityItemList.length; e++) {
      this.cityItemList[e].asCom.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.showAllCityItem = function () {
    var e = this;
    var t = 0;
    var o = this.cityId;
    var i = function () {
      r_TimeSystem.TimeSystem.scheduleOnce("caidan1_1", .3, function () {
        (o += 1) > 8 && (o = 1);
        e.cityItemList[o - 1].asCom.getController("c1").selectedIndex = 1;
        if ((t += 1) < 8) {
          r_SoundMgr.SoundMgr.playSound("giveRedPacket/抽奖");
          i();
        } else {
          e.isStop = false;
          e.oneRedMoney = e.getAllMoney();
          e.btnStartGame.visible = true;
        }
      });
    };
    i();
  };
  _ctor.prototype.setCityItemSelectByIndex = function (e) {
    for (var t = 0; t < this.cityItemList.length; t++) {
      if (e == t) {
        r_SoundMgr.SoundMgr.playSound("giveRedPacket/抽奖");
        this.cityItemList[t].asCom.getController("c1").selectedIndex = 1;
      } else {
        this.cityItemList[t].asCom.getController("c1").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.randomCity = function () {
    var e = 0;
    var t = Math.random();
    for (var i = 0; i < exports.redPacketCityInfo.length; i++) {
      if (t <= (e += exports.redPacketCityInfo[i].pr)) {
        this.cityId = exports.redPacketCityInfo[i].id;
        this.oneRedMoney = exports.redPacketCityInfo[i].money;
        break;
      }
    }
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_DebugSystem.DebugSystem.giveRedPacketType >= r_DebugSystem.GMToolTypeGiveRedPacket.one && r_DebugSystem.DebugSystem.giveRedPacketType <= r_DebugSystem.GMToolTypeGiveRedPacket.eight) {
      this.cityId = r_DebugSystem.DebugSystem.giveRedPacketType;
      this.oneRedMoney = exports.redPacketCityInfo[this.cityId - 1].money;
    }
  };
  _ctor.prototype.update = function (e) {
    if (this.isStartMove) {
      this.time += e;
      if (this.curMoveCount < 3) {
        if (this.time > .5) {
          this.time = 0;
          this.curIndex += 1;
          this.curMoveCount += 1;
          this.curIndex >= 8 && (this.curIndex = 0);
          this.setCityItemSelectByIndex(this.curIndex);
        }
      } else if (this.totalMoveCount - this.curMoveCount <= 3) {
        if (this.time > .5) {
          this.time = 0;
          this.curIndex += 1;
          this.curMoveCount += 1;
          this.curIndex >= 8 && (this.curIndex = 0);
          this.setCityItemSelectByIndex(this.curIndex);
        }
        if (this.curMoveCount == this.totalMoveCount) {
          this.isStartMove = false;
          if (this.tiggerCaidan1) {
            this.isStop = true;
            this.showAllCityItem();
          } else {
            this.btnStartGame.visible = true;
          }
        }
      } else if (this.time > .1) {
        this.time = 0;
        this.curIndex += 1;
        this.curMoveCount += 1;
        this.curIndex >= 8 && (this.curIndex = 0);
        this.setCityItemSelectByIndex(this.curIndex);
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPlay")], _ctor.prototype, "btnPlay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPrizeDraw")], _ctor.prototype, "btnPrizeDraw", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStartGame")], _ctor.prototype, "btnStartGame", undefined);
  __decorate([r_DecorateFunction1.AutoFind("long")], _ctor.prototype, "long", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caidanAnim")], _ctor.prototype, "caidanAnim", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.GiveRedPacketSelectUI = exp_GiveRedPacketSelectUI;