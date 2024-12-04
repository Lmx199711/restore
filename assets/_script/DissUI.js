var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_LotteryCountSystem = require("LotteryCountSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseLottery = require("BaseLottery");
var def_DissUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.DissUI) || this;
    t.items = [];
    t.isClearCaidan = false;
    t.isTouch = true;
    t.time = 10;
    t.moneyList = [];
    t.maxTime = 10;
    t.addSpeedTime = 5;
    t.winId = 6012;
    t.isOnceClick = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DissUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DissUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.dissMoney, "ui://Lottery2/money", 1, this.contentPane);
    for (var o = 0; o < 9; o++) {
      var i = this.contentPane.getChild("item" + o).asCom;
      this.items.push(i);
    }
    r_ResSystem.ResSystem.loadBundleRes("game6", "diss/DissWorld", cc.Prefab, function (e, o) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("worldPoint").node.addChild(i);
        t.eraseCom1 = i.getComponent(r_EraseCom.default);
        t.eraseCom1.cleanSuccessCallBack = t.cleanSuccess1.bind(t);
      }
    });
    this.btnDess.onClick(this.onClickDiss, this);
    this.btnSell.onClick(this.onClickSell, this);
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnDess.sortingOrder = 1e3;
    this.btnSell.title = r_UtilsSystem.UtilsSystem.getShowCoin(r_LotteryTicketCfg.LotteryTicketCfg.DissCfg.caidanCoin, 1);
  };
  _ctor.prototype.restart = function () {
    e.prototype.restart.call(this);
    this.isClearCaidan = false;
    this.isOnceClick = true;
    this.isTouch = true;
    this.moneyList = [];
    this.contentPane.getController("c1").selectedIndex = 0;
    this.contentPane.getTransition("init").play();
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, "step_1", true);
    this.time = this.maxTime;
    if (this.eraseCom1) {
      this.eraseCom1.startClean();
      this.eraseCom1.touchArea.active = true;
    }
    this.setResult(false);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.moneyList.forEach(function (e) {
      cc.Tween.stopAllByTarget(e);
      r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.dissMoney, e);
    });
    this.moneyList = [];
    r_TimeSystem.TimeSystem.scheduleClear("tiggerCaidan");
  };
  _ctor.prototype.setResult = function (e) {
    this.getCfg();
    if (e) {
      this.items.forEach(function (e) {
        e.isWin = true;
        e.getController("win").selectedIndex = 1;
        e.getChild("tip").visible = false;
        e.getChild("labNum").text = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
        var t = r_LotteryTicketCfg.LotteryTicketCfg.DissCfg.rewardCoin;
        e.coin = t;
        e.getChild("labCoin").text = r_UtilsSystem.UtilsSystem.getShowCoin(t, 1);
      });
    } else {
      this.items.forEach(function (e) {
        var t = r_LotteryCountSystem.LotteryCountSystem.getIsWin("DissCfg");
        e.isWin = t;
        e.getController("win").selectedIndex = t ? 1 : 0;
        e.getChild("tip").visible = false;
        e.getChild("labNum").text = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
        var o = r_LotteryCountSystem.LotteryCountSystem.getNumAward("DissCfg", t);
        e.coin = o;
        e.getChild("labCoin").text = r_UtilsSystem.UtilsSystem.getShowCoin(o, 1);
      });
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.contentPane.getChild("item" + e);
    console.log("t_item.isWin: ", t.isWin);
    if (t.isWin) {
      t.getChild("tip").visible = true;
      r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
      r_PlayerData.PlayerData.addCoin("彩票中奖", t.coin, r_ReportSystem.SystemKey.彩票);
    } else {
      t.getChild("tip").visible = false;
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    e.prototype.cleanAllSuccess.call(this);
    this.eraseCom1.touchArea.active = false;
  };
  _ctor.prototype.cleanSuccess1 = function () {
    (r_Index.Platform.isDarenPlatform() || 0 == r_CaidanSystem.CaidanSystem.getCaidanNum(this.winId, 0)) && (this.isClearCaidan = true);
  };
  _ctor.prototype.onClickOpen = function () {
    if (this.isTouch && (r_Index.Platform.isDarenPlatform() || 0 == r_CaidanSystem.CaidanSystem.getCaidanNum(this.winId, 0)) && this.isClearCaidan) {
      this.isTouch = false;
      this.tiggerCaidan();
      r_SoundMgr.SoundMgr.playSound("diss/光效出现音效");
    }
  };
  _ctor.prototype.tiggerCaidan = function () {
    var e = this;
    r_CaidanSystem.CaidanSystem.setCaidanNum(this.winId, 0, 1);
    this.contentPane.getTransition("t0").play(function () {
      e.contentPane.getController("c1").selectedIndex = 1;
      r_UtilsSystem.UtilsSystem.playAnim(e.animRole, "step_1", true);
      e.setLabTime();
    });
  };
  _ctor.prototype.setLabTime = function () {
    this.labTime.text = "倒计时：[color=#ff0000]" + this.time + "[/color] 秒";
  };
  _ctor.prototype.onClickDiss = function () {
    var e = this;
    if (this.isOnceClick) {
      this.isOnceClick = false;
      r_UtilsSystem.UtilsSystem.playAnim(this.animRole, "step_2", true);
      r_SoundMgr.SoundMgr.playSound("diss/跷跷板bgm");
      r_TimeSystem.TimeSystem.schedule("tiggerCaidan", 1, function () {
        e.time <= e.addSpeedTime && "step_2" == e.animRole.animationName && r_UtilsSystem.UtilsSystem.playAnim(e.animRole, "step_3", true);
        if (e.time <= 0) {
          r_TimeSystem.TimeSystem.scheduleClear("tiggerCaidan");
          e.contentPane.getController("c1").selectedIndex = 2;
          r_SoundMgr.SoundMgr.playSound("diss/链子界面");
          e.moneyList.forEach(function (e) {
            cc.Tween.stopAllByTarget(e);
            r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.dissMoney, e);
          });
          return void (e.moneyList = []);
        }
        e.time--;
        e.setLabTime();
      });
    }
    var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.dissMoney);
    t.x = this.startPoint.x;
    t.y = this.startPoint.y;
    var o = this.dorpPoint.x + r_UtilsSystem.UtilsSystem.getRandomNum(-this.dorpPoint.width / 2, this.dorpPoint.width / 2);
    var i = this.dorpPoint.y + r_UtilsSystem.UtilsSystem.getRandomNum(-this.dorpPoint.height / 2, this.dorpPoint.height / 2);
    this.contentPane.addChild(t);
    this.moneyList.push(t);
    r_PlayerData.PlayerData.addCoin("彩票彩蛋", r_LotteryTicketCfg.LotteryTicketCfg.DissCfg.caidanMoney, r_ReportSystem.SystemKey.彩票, true, true, false);
    cc.tween(t).to(.5, {
      x: o,
      y: i
    }).call(function () {
      e.moneyList.sort(function (e, t) {
        return e.y - t.y;
      });
      e.moneyList.forEach(function (e, t) {
        e.sortingOrder = t;
      });
    }).start();
  };
  _ctor.prototype.onClickSell = function () {
    r_PlayerData.PlayerData.addCoin("彩票彩蛋", r_LotteryTicketCfg.LotteryTicketCfg.DissCfg.caidanCoin, r_ReportSystem.SystemKey.彩票);
    this.restart();
    this.setResult(true);
  };
  __decorate([r_DecorateFunction1.AutoFind("animRole")], _ctor.prototype, "animRole", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDess")], _ctor.prototype, "btnDess", undefined);
  __decorate([r_DecorateFunction1.AutoFind("startPoint")], _ctor.prototype, "startPoint", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dorpPoint")], _ctor.prototype, "dorpPoint", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLottery.default);
exports.default = def_DissUI;