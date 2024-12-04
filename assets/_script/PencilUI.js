var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PencilUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_EraseCom = require("EraseCom");
var r_DebugSystem = require("DebugSystem");
var r_AnimSystem = require("AnimSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_PencilSystem = require("PencilSystem");
var r_FguiGestureSys = require("FguiGestureSys");
var r_TimeSystem = require("TimeSystem");
var r_ReportSystem = require("ReportSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_ResSystem = require("ResSystem");
var exp_PencilUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.PencilUI) || this;
    t.showTipList = [];
    t.successCoin = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PencilUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PencilUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAgain = this.contentPane.getChild("btnAgain").asButton;
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    r_CaidanSystem.CaidanSystem.bindBtn("huaxianzi", this.btnTip, "penciCaidanVideo");
    this.btnAgain.getChild("num").text = r_LotteryTicketCfg.BuyPencilCoin + "";
    this.skRole = this.contentPane.getChild("skRole");
    this.imgPencil = this.contentPane.getChild("imgPencil");
    this.imgFlower = this.contentPane.getChild("imgFlower");
    this.skLight = this.contentPane.getChild("skLight");
    this.imgFace = this.contentPane.getChild("imgFace");
    this.lightTouch = this.contentPane.getChild("lightTouch");
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("pencilCaidan", this.imgPencil, this.imgPencil, this.imgFace, this.hitSucc.bind(this));
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("pencilFlower", this.imgFlower, this.imgFlower, this.lightTouch, this.hitPencil.bind(this));
    this.imgFlower.on(fgui.Event.TOUCH_BEGIN, function () {
      t.imgFlower.alpha = 1;
    });
    this.imgFlower.on(fgui.Event.TOUCH_END, function () {
      t.imgFlower.alpha = 0;
      r_FguiGestureSys.FguiGestureSys.restart("pencilFlower");
    });
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/pencil", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyPencilCoin)) {
      r_PlayerData.PlayerData.deleteCoin("妙笔生花门票", r_LotteryTicketCfg.BuyPencilCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.contentPane.getChild("item" + e);
    if (t.isWin) {
      t.getChild("tip").visible = true;
      r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
      r_PlayerData.PlayerData.addCoin("妙笔生花中奖", t.coin, r_ReportSystem.SystemKey.彩票);
    } else {
      t.getChild("tip").visible = false;
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilCaidan", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilFlower", false);
  };
  _ctor.prototype.restart = function () {
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.penciCaidanNum], r_PlayerData.PlayerData.data.penciCaidanVideo);
    if (this.prefab) {
      this.btnAgain.visible = false;
      this.setResult(0);
      this.caidanRestart();
    }
  };
  _ctor.prototype.caidanRestart = function () {
    this.skRole.animationName = "step_0";
    this.imgPencil.url = "ui://Lottery/pencil0";
    this.imgFlower.alpha = 0;
    this.skLight.visible = false;
    this.imgFlower.enabled = false;
    this.imgPencil.visible = false;
    r_FguiGestureSys.FguiGestureSys.restart("pencilFlower");
    r_FguiGestureSys.FguiGestureSys.restart("pencilCaidan");
    if (r_TYIndex.Platform.isDarenPlatform() || 0 == r_PlayerData.PlayerData.data.penciCaidanNum) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilFlower", true);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilCaidan", true);
      this.imgPencil.visible = true;
      this.imgFlower.enabled = true;
    }
  };
  _ctor.prototype.hitSucc = function () {
    var e = this;
    this.imgPencil.visible = false;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilCaidan", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilFlower", false);
    this.imgFlower.enabled = false;
    if ("ui://Lottery/pencil0" == this.imgPencil.url) {
      this.setResult(2);
      this.skRole.animationName = "step_1_1";
      this.skRole.loop = true;
      this.skRole.skinName = "1";
      this.skRole.playing = true;
      r_TimeSystem.TimeSystem.scheduleOnce("step_1_1", 3, function () {
        e.skRole.animationName = "step_1_2";
        e.skRole.loop = true;
        e.skRole.playing = true;
      });
    } else if ("ui://Lottery/pencil1" == this.imgPencil.url) {
      this.setResult(1);
      r_PlayerData.PlayerData.data.penciCaidanNum++;
      r_PlayerData.PlayerData.saveData();
      this.skRole.animationName = "step_2_1";
      this.skRole.loop = true;
      this.skRole.skinName = "2";
      this.skRole.playing = true;
      r_TimeSystem.TimeSystem.scheduleOnce("step_2_1", 3, function () {
        e.skRole.animationName = "step_2_2";
        e.skRole.loop = true;
        e.skRole.playing = true;
      });
    }
  };
  _ctor.prototype.setResult = function (e) {
    this.eraseCom.startClean();
    for (var t = 0; t < 12; t++) {
      var o = this.contentPane.getChild("item" + t);
      var i = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
      o.getChild("tip").visible = false;
      var n = Math.random() < i.PencilCfg.numPr;
      1 == e && (n = true);
      2 == e && (n = false);
      var a = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
      if (n) {
        a = 79;
      } else {
        79 == a && (a = 78);
      }
      a < 10 && (a = "0" + a);
      o.getChild("num").text = a + "";
      var s = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.PencilCfg.caidanCoin : r_PencilSystem.PencilSystem.getNumAward(n);
      o.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(s);
      o.getChild("tip").visible = false;
      o.isWin = n;
      o.coin = s;
    }
  };
  _ctor.prototype.hitPencil = function () {
    var e = this;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("pencilFlower", false);
    this.imgPencil.url = "ui://Lottery/pencil1";
    this.skLight.visible = true;
    this.skLight.animationName = "animation";
    this.skLight.loop = true;
    this.skLight.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("skLight", 1, function () {
      e.skLight.visible = false;
    });
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PencilUI = exp_PencilUI;