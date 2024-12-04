var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaceUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_RaceAnimal = require("RaceAnimal");
var r_TimeSystem = require("TimeSystem");
var r_RaceResultUI = require("RaceResultUI");
var r_SoundMgr = require("SoundMgr");
var r_DebugSystem = require("DebugSystem");
var r_RaceTipUI = require("RaceTipUI");
var r_PlatformSystem = require("PlatformSystem");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp_RaceUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Res.UI.RaceUI) || this;
    t.nameList = ["老虎", "马", "猫", "熊猫", "兔子", "乌龟", "大象"];
    t.uiType = "fullScreen";
    t.btnSelectList = [];
    t.selectIndex = 0;
    t.doubleNum = r_jsbi.default.BigInt(1);
    t.animalList = [];
    t.runway = null;
    t.runwayLeftNode = null;
    t.runwayEndNode = null;
    t.runwaySpeed = 0;
    t.isStopRunway = false;
    t.isStartGame = false;
    t.blockTouchTip = false;
    t.passTime = 0;
    t.lastChangeStateTime = 0;
    t.randomAnimList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RaceUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RaceUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnStart.onClick(this.onClickStart, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    this.btnTip.onClick(this.onClickTip, this);
    this.btnComeOn = this.contentPane.getChild("btnComeOn").asButton;
    this.btnComeOn.onClick(this.onClickComeOn, this);
    for (var i = 1; i <= 4; i++) {
      var n = this.contentPane.getChild("btnSelect" + i);
      n.getChild("num").text = _ctor.coin.toString();
      this.registSelectBtn(n, i);
      this.btnSelectList.push(n);
    }
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/race/race", cc.Prefab, function (e, t) {
      o.prefab = cc.instantiate(t);
      o.prefab.active = true;
      o.contentPane.getChild("center").node.addChild(o.prefab);
      o.runway = o.prefab.getChildByName("runway");
      o.runway.startX = o.runway.x;
      o.runwayLeftNode = o.runway.getChildByName("left");
      o.runwayEndNode = o.runway.getChildByName("end");
      for (var i = 1; i <= 4; i++) {
        var n = o.prefab.getChildByName("anim" + i);
        n.startX = n.x;
        n.getComponent(r_RaceAnimal.default).raceUI = o;
        o.animalList.push(n.getComponent(r_RaceAnimal.default));
      }
      var a = o.prefab.getChildByName("randomList");
      for (i = 1; i <= 7; i++) {
        var s = a.getChildByName("" + i);
        s.animalName = o.nameList[i - 1];
        o.randomAnimList.push(s);
      }
      o.startRace();
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/race/fire", cc.Prefab, function (e, t) {
      var i = cc.instantiate(t);
      i.active = true;
      o.contentPane.getChild("btnComeOn").node.addChild(i);
      i.x = -60;
      i.y = -15;
    });
  };
  _ctor.prototype.onClickTip = function () {
    this.isStartGame || this.blockTouchTip || r_RaceTipUI.RaceTipUI.showUI();
  };
  _ctor.restartRace = function () {
    _ctor.Inst && _ctor.Inst.startRace();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.startRace();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistUpdate(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    if (this.isStartGame) {
      r_RaceTipUI.RaceTipUI.popTipNum = 0;
      r_RaceTipUI.RaceTipUI.winIndex = 0;
    }
  };
  _ctor.prototype.registSelectBtn = function (e, o) {
    var i = this;
    e.getChild("btn").onClick(function () {
      if (i.selectIndex) {
        var e = r_jsbi.default.multiply(r_jsbi.default.multiply(_ctor.coin, i.doubleNum), r_BigNumSystem.BigNumSystem.two);
        if (!r_PlayerData.PlayerData.isCoinEnough(e)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
        i.doubleNum = r_jsbi.default.multiply(r_BigNumSystem.BigNumSystem.two, i.doubleNum);
        i.useCoin = r_jsbi.default.ADD(i.useCoin, r_jsbi.default.multiply(_ctor.coin, i.doubleNum));
        r_PlayerData.PlayerData.deleteCoin("赛马", r_jsbi.default.multiply(_ctor.coin, i.doubleNum), r_ReportSystem.SystemKey.赛马);
      } else {
        if (!r_PlayerData.PlayerData.isCoinEnough(_ctor.coin)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
        r_PlayerData.PlayerData.deleteCoin("赛马", _ctor.coin, r_ReportSystem.SystemKey.赛马);
        i.useCoin = r_jsbi.default.ADD(i.useCoin, _ctor.coin);
        i.selectIndex = o;
        for (var n = 1; n <= 4; n++) {
          if (o == n) {
            i.btnSelectList[n - 1].visible = true;
            i.btnSelectList[n - 1].getController("mode").selectedIndex = 1;
            i.btnSelectList[n - 1].getChild("btn2").visible = true;
          } else {
            i.btnSelectList[n - 1].visible = false;
          }
        }
        i.btnStart.visible = true;
      }
    }.bind(this), this);
    var n = function (e) {
      i.doubleNum = r_jsbi.default.multiply(i.doubleNum, r_jsbi.default.BigInt(e));
      i.useCoin = r_jsbi.default.ADD(i.useCoin, r_jsbi.default.multiply(_ctor.coin, i.doubleNum));
      r_PlayerData.PlayerData.deleteCoin("赛马", r_jsbi.default.multiply(_ctor.coin, i.doubleNum), r_ReportSystem.SystemKey.赛马);
    };
    e.getChild("btn1").onClick(function () {
      var o = r_jsbi.default.multiply(r_jsbi.default.multiply(_ctor.coin, i.doubleNum), r_jsbi.default.BigInt(100));
      if (r_PlayerData.PlayerData.isCoinEnough(o)) {
        n(100);
        e.getController("mode").selectedIndex = 2;
        e.getChild("btn3").grayed = true;
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }.bind(this), this);
    e.getChild("btn2").onClick(function () {
      var o = r_jsbi.default.multiply(r_jsbi.default.multiply(_ctor.coin, i.doubleNum), r_jsbi.default.BigInt(10));
      if (r_PlayerData.PlayerData.isCoinEnough(o)) {
        n(10);
        e.getChild("btn2").visible = false;
        e.getChild("btn3").grayed = false;
        e.getController("mode").selectedIndex = 3;
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }.bind(this), this);
    e.getChild("btn3").onClick(function () {
      e.getChild("btn3").grayed || r_PlatformSystem.PlatformSystem.showVideo("赛马10倍", function () {
        i.doubleNum = r_jsbi.default.multiply(i.doubleNum, r_jsbi.default.BigInt(10));
        i.useCoin = r_jsbi.default.ADD(i.useCoin, r_jsbi.default.multiply(_ctor.coin, i.doubleNum));
        r_UtilsSystem.UtilsSystem.showTip("下注" + r_UtilsSystem.UtilsSystem.getShowCoin(r_jsbi.default.multiply(_ctor.coin, i.doubleNum)));
        r_jsbi.default.GE(i.doubleNum, 1e5) && (e.visible = false);
      });
    }.bind(this), this);
  };
  _ctor.prototype.startRace = function () {
    if (this.prefab && !r_RaceTipUI.RaceTipUI.popTipNum) {
      this.prefab.getChildByName("sudu").active = false;
      this.prefab.getChildByName("guanzhong").getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
      this.isStartGame = false;
      this.btnTip.visible = true;
      this.selectIndex = 0;
      this.useCoin = r_jsbi.default.BigInt(0);
      this.doubleNum = r_jsbi.default.BigInt(1);
      for (var e = 0; e < 4; e++) {
        this.btnSelectList[e].visible = true;
        this.btnSelectList[e].getController("mode").selectedIndex = 0;
      }
      r_UtilsSystem.UtilsSystem.shuffle(this.randomAnimList);
      for (e = 0; e < 4; e++) {
        var t = this.animalList[e];
        t.animalName = this.randomAnimList[e].animalName;
        t.node.x = t.node.startX;
        t.node.getChildByName("huo").active = false;
        t.node.getChildByName("sleep").active = false;
        t.getComponent(sp.Skeleton).skeletonData = this.randomAnimList[e].getComponent(sp.Skeleton).skeletonData;
        t.node.getChildByName("huo").x = this.randomAnimList[e].getChildByName("huo").x;
        t.node.getChildByName("huo").y = this.randomAnimList[e].getChildByName("huo").y;
        t.node.getChildByName("huo").scale = this.randomAnimList[e].getChildByName("huo").scale;
        t.getComponent(sp.Skeleton).skeletonData = this.randomAnimList[e].getComponent(sp.Skeleton).skeletonData;
        t.node.getChildByName("sleep").x = this.randomAnimList[e].getChildByName("sleep").x;
        t.node.getChildByName("sleep").y = this.randomAnimList[e].getChildByName("sleep").y;
        t.node.getChildByName("sleep").scale = this.randomAnimList[e].getChildByName("sleep").scale;
        t.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
      }
      this.btnStart.visible = false;
      this.btnComeOn.visible = false;
      this.runway.x = this.runway.startX;
      this.isStopRunway = false;
      this.passTime = 0;
      this.lastChangeStateTime = 0;
    }
  };
  _ctor.prototype.getRandomSpeedList = function () {
    var e = [];
    for (var o = 2; o < _ctor.speedList.length; o++) {
      e.push(_ctor.speedList[o]);
    }
    r_UtilsSystem.UtilsSystem.shuffle(e);
    return e;
  };
  _ctor.prototype.onClickStart = function () {
    this.btnSelectList[this.selectIndex - 1].visible = false;
    this.btnStart.visible = false;
    var e = this.getRandomSpeedList();
    for (var o = 0; o < 4; o++) {
      var i = this.animalList[o];
      i.setSpeed(r_UtilsSystem.UtilsSystem.getRandomFromArr(e));
      o == this.getMuseWinIndex() - 1 && i.setSpeed(_ctor.debugSpeed);
      i.run();
    }
    this.isStartGame = true;
    this.btnTip.visible = false;
    r_TimeSystem.TimeSystem.registUpdate(this, this.update.bind(this));
    this.btnComeOn.visible = true;
    this.prefab.getChildByName("guanzhong").getComponent(sp.Skeleton).setAnimation(0, "step_2", true);
    r_SoundMgr.SoundMgr.playMusic("saipao");
  };
  _ctor.getNameByIndex = function (e) {
    if (_ctor.Inst) {
      return _ctor.Inst.animalList[e - 1].animalName;
    }
  };
  _ctor.prototype.onClickComeOn = function () {
    this.prefab.getChildByName("sudu").active = true;
    this.animalList[this.selectIndex - 1].comeOn();
    this.btnComeOn.visible = false;
  };
  _ctor.prototype.getMuseWinIndex = function () {
    if (r_RaceTipUI.RaceTipUI.popTipNum && r_RaceTipUI.RaceTipUI.winIndex) {
      return r_RaceTipUI.RaceTipUI.winIndex;
    } else {
      return r_DebugSystem.DebugSystem.raceType;
    }
  };
  _ctor.prototype.update = function (e) {
    var o = this;
    if (this.isStartGame) {
      e < 1 && (e = .016);
      this.passTime = this.passTime + e;
      if (this.passTime >= 5 && this.lastChangeStateTime < 5) {
        this.lastChangeStateTime = 5;
        var i = this.getRandomSpeedList();
        for (var n = 0; n < 4; n++) {
          n != this.getMuseWinIndex() - 1 && this.animalList[n].changeSpeed(r_UtilsSystem.UtilsSystem.getRandomFromArr(i));
        }
      } else if (this.passTime >= 10 && this.lastChangeStateTime < 10) {
        this.lastChangeStateTime = 10;
        for (n = 0; n < 4; n++) {
          n != this.getMuseWinIndex() - 1 && this.animalList[n].changeState();
        }
      } else {
        for (n = 0; n < 4; n++) {
          this.animalList[n].runUpdate(e);
        }
      }
      if (this.passTime >= 15 && this.lastChangeStateTime < 15) {
        this.lastChangeStateTime = 15;
        i = this.getRandomSpeedList();
        for (n = 0; n < 4; n++) {
          n != this.getMuseWinIndex() - 1 && this.animalList[n].changeSpeed(r_UtilsSystem.UtilsSystem.getRandomFromArr(i));
        }
      }
      var a = 0;
      var s = this.animalList[this.selectIndex - 1];
      if (!this.isStopRunway) {
        if (s.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x > cc.winSize.width / 2) {
          ;
        } else {
          a = s.curSpeed;
          this.runway.x = this.runway.x + a * e * _ctor.speedRate;
          var r = this.runwayLeftNode.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
          if (r > 0) {
            this.runway.x = this.runway.x - r;
            this.isStopRunway = true;
          }
        }
      }
      var l = this.runwayEndNode.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
      for (n = 0; n < 4; n++) {
        var d = this.animalList[n];
        var f = a - d.curSpeed;
        d.node.x = d.node.x + f * e * _ctor.speedRate;
        if (d.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x <= l) {
          this.isStartGame = false;
          this.blockTouchTip = true;
          r_RaceTipUI.RaceTipUI.popTipNum = 0;
          r_RaceTipUI.RaceTipUI.winIndex = 0;
          r_SoundMgr.SoundMgr.playMusic("bgm");
          this.prefab.getChildByName("sudu").active = false;
          this.prefab.getChildByName("guanzhong").getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
          if (n == this.selectIndex - 1) {
            r_RaceResultUI.RaceResultUI.showUI({
              result: true,
              coin: this.useCoin
            });
          } else {
            r_RaceResultUI.RaceResultUI.showUI({
              result: false,
              coin: this.useCoin
            });
          }
          r_TimeSystem.TimeSystem.scheduleOnce("blockTouchTip", 1, function () {
            o.blockTouchTip = false;
          });
        }
      }
    }
  };
  _ctor.coin = r_jsbi.default.BigInt(500);
  _ctor.speedList = [1, 2, 3, 4, 5];
  _ctor.fastSpeed = 7;
  _ctor.debugSpeed = 6;
  _ctor.speedRate = 30;
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.RaceUI = exp_RaceUI;