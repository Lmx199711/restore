var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_NiuniuCfg = require("NiuniuCfg");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_EffectsCom = require("EffectsCom");
var def_BigSmallUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.BigSmallUI) || this;
    t.labTargets = [];
    t.labAwards = [];
    t.labSelfs = [];
    t.tips = [];
    t.coins = [];
    t.awards = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BigSmallUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BigSmallUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.block = this.contentPane.getChild("block");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/bigSmall", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    for (var o = 0; o < 4; o++) {
      var i = this.contentPane.getChild("labTarget" + o).asLabel;
      this.labTargets.push(i);
      var n = this.contentPane.getChild("labAward" + o).asLabel;
      this.labAwards.push(n);
      var a = this.contentPane.getChild("labSelf" + o).asLabel;
      this.labSelfs.push(a);
      var r = this.contentPane.getChild("tip" + o).asImage;
      this.tips.push(r);
    }
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnAgian = this.contentPane.getChild("btnAgian").asButton;
    this.btnAgian.onClick(this.onClickAgin, this);
    r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    this.btnAgian.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyBigSmallCoin, 0);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.block.node.off(cc.Node.EventType.TOUCH_START);
    this.block.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.prefab) {
      this.eraseCom.startClean();
      this.btnAgian.visible = false;
      this.awards = [0, 0, 0, 0];
      this.coins = [0, 0, 0, 0];
      this.tips.forEach(function (e) {
        return e.visible = false;
      });
      this.labTargets.forEach(function (t, o) {
        var i = r_UtilsSystem.UtilsSystem.getRandomNum(10, 90);
        t.text = i.toString();
        var n = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
        var a = 0;
        var r = 0;
        if (Math.random() <= n.BigSmallPrCfg) {
          r = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_NiuniuCfg.BigSmallAwardCfg).num;
          a = r_UtilsSystem.UtilsSystem.getRandomNum(i + 1, 100);
        } else {
          r = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_NiuniuCfg.BigSmallAwardCfg1).num;
          a = r_UtilsSystem.UtilsSystem.getRandomNum(i - 9, i - 1);
        }
        e.labSelfs[o].text = a.toString();
        e.coins[o] = r;
        e.labAwards[o].text = r_UtilsSystem.UtilsSystem.numFormats(r, 0);
      });
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = parseInt(this.labTargets[e].text) < parseInt(this.labSelfs[e].text);
    this.tips[e].visible = t;
    if (t) {
      var o = this.coins[e];
      this.awards[e] = o;
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    var e = 0;
    this.awards.forEach(function (t) {
      e += t;
    });
    cc.log("this.awards: ", this.awards);
    if (e > 0) {
      r_PlayerData.PlayerData.addCoin("比大小中奖", e, r_ReportSystem.SystemKey.彩票);
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("没有中奖彩票");
    }
    this.enabled;
    this.btnAgian.visible = true;
  };
  _ctor.prototype.onClickAgin = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyBigSmallCoin)) {
      r_PlayerData.PlayerData.deleteCoin("比大小门票", r_LotteryTicketCfg.BuyBigSmallCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgian.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BigSmallUI;