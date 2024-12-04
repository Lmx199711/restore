var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_YugongSystem = require("YugongSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var def_YugongUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.YugongUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.YugongUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.YugongUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_YugongSystem.YugongSystem.init();
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/yugong", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    this.items = [];
    for (var o = 0; o < 8; o++) {
      this.items.push(this.contentPane.getChild("item" + o));
    }
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.labHead = this.contentPane.getChild("labHead");
    this.btnAgain = this.contentPane.getChild("btnAgain");
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyYugongCoin);
    this.btnAgain.visible = false;
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    this.imgYugong = this.contentPane.getChild("imgYugong");
    this.imgheadTip = this.contentPane.getChild("imgheadTip");
    r_CaidanSystem.CaidanSystem.bindBtn("yugongyishan", this.btnTip, "yugongCaidanVideo");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.restart = function () {
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.yugongCaidanNum], r_PlayerData.PlayerData.data.yugongCaidanVideo);
    this.btnAgain.visible = false;
    this.imgheadTip.visible = false;
    this.caidanTigger = true;
    if (this.prefab) {
      this.headAward = 0;
      this.setAward(false);
    }
  };
  _ctor.prototype.setAward = function (e) {
    this.eraseCom.startClean();
    if (e) {
      for (var t = 0; t < this.items.length; t++) {
        (n = this.items[t]).getController("c1").selectedIndex = 0;
        n.getChild("labRound").text = "第" + (t + 1) + "局";
        n.getChild("labNum0").text = "6";
        n.getChild("labNum1").text = "6";
        var o = r_LotteryTicketCfg.LotteryTicketCfg.YugongCfg.numAwardCaidan;
        n.getChild("labAward").text = r_UtilsSystem.UtilsSystem.numFormats(o);
        n.iswin = true;
        n.coin = o;
      }
      var i = r_LotteryTicketCfg.LotteryTicketCfg.YugongCfg.headAwardCaidan;
      this.headAward = i;
      return void (this.labHead.text = r_UtilsSystem.UtilsSystem.numFormats(i));
    }
    for (t = 0; t < this.items.length; t++) {
      var n;
      (n = this.items[t]).getController("c1").selectedIndex = 0;
      n.getChild("labRound").text = "第" + (t + 1) + "局";
      var a = r_YugongSystem.YugongSystem.getLottery();
      var s = r_YugongSystem.YugongSystem.getRandNum(a);
      n.getChild("labNum0").text = s[0] + "";
      n.getChild("labNum1").text = s[1] + "";
      var r = r_YugongSystem.YugongSystem.getNumAward(a);
      n.getChild("labAward").text = r_UtilsSystem.UtilsSystem.numFormats(r);
      n.iswin = a;
      n.coin = r;
    }
    var c = r_YugongSystem.YugongSystem.getHeadAward();
    this.headAward = c;
    this.labHead.text = 0 == c ? "谢谢惠顾" : r_UtilsSystem.UtilsSystem.numFormats(c);
  };
  _ctor.prototype.cleanSuccess = function (e) {
    if (0 != e) {
      var t = this.items[e - 1];
      cc.log(e, t.getChild("labNum0").text, t.getChild("labNum1").text, t.iswin);
      if (t.iswin) {
        t.getController("c1").selectedIndex = 1;
        r_PlayerData.PlayerData.addCoin("愚公移山中奖", t.coin, r_ReportSystem.SystemKey.彩票);
        r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
      }
    } else if (this.headAward > 0) {
      this.imgheadTip.visible = true;
      r_PlayerData.PlayerData.addCoin("愚公移山中奖", this.headAward, r_ReportSystem.SystemKey.彩票);
      r_AnimSystem.AnimSystem.playCoinAnim(this.imgheadTip.node);
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
  };
  _ctor.prototype.onClickAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyYugongCoin)) {
      r_PlayerData.PlayerData.deleteCoin("愚公移山", r_LotteryTicketCfg.BuyYugongCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.instace = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_YugongUI;