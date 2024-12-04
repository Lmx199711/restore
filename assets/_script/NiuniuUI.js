var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_NiuniuSystem = require("NiuniuSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_NiuniuCfg = require("NiuniuCfg");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_EffectsCom = require("EffectsCom");
var def_NiuniuUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.NiuniuUI) || this;
    t.items = [];
    t.m_bankData = null;
    t.m_playerData = [];
    t.m_isWinData = [];
    t.m_isSucc = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NiuniuUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NiuniuUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.item = this.contentPane.getChild("item").asCom;
    for (var o = 0; o < 4; o++) {
      var i = this.contentPane.getChild("item" + o).asCom;
      this.items.push(i);
    }
    this.contentPane.visible = false;
    this.btnAgian = this.contentPane.getChild("btnAgian").asButton;
    this.btnAgian.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/niuniu", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.caipiaoniu = t.prefab.getChildByName("mask").getChildByName("caipiaoniu").getComponent(sp.Skeleton);
      t.caidanNode = t.prefab.getChildByName("caidanNode");
      t.restart();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.isWin(this.m_playerData[e]);
    this.items[e].getController("c1").setSelectedIndex(t);
    t && !this.m_isWinData.includes(this.m_playerData[e]) && this.m_isWinData.push(this.m_playerData[e]);
    this.m_isSucc = true;
  };
  _ctor.prototype.isWin = function (e) {
    var t = 0;
    if (this.m_bankData.result < e.result) {
      t = 1;
    } else {
      this.m_bankData.result == e.result && Math.max.apply(Math, this.m_bankData.cards) <= Math.max.apply(Math, e.cards) && (t = 1);
    }
    return t;
  };
  _ctor.prototype.cleanAllSuccess = function () {
    var e = r_jsbi.default.BigInt(0);
    this.m_isWinData.forEach(function (t) {
      e = r_jsbi.default.ADD(e, r_jsbi.default.BigInt(t.num));
    });
    this.btnAgian.visible = true;
    if (this.m_isWinData.length > 0) {
      r_PlayerData.PlayerData.addCoin("斗牛奖励", e, r_ReportSystem.SystemKey.彩票);
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("真可惜差一点就中大奖了");
    }
  };
  _ctor.prototype.restart = function () {
    var e = this;
    if (this.prefab) {
      this.caidanNode.on(cc.Node.EventType.TOUCH_START, this.onClickCaidan, this);
      this.caipiaoniu.setAnimation(0, "animation", false);
      this.caipiaoniu.timeScale = 0;
      this.caipiaoniu.node.parent = this.prefab.getChildByName("mask");
      this.caipiaoniu.node.active = true;
      this.m_isSucc = false;
      r_NiuniuSystem.NiuniuSystem.init();
      this.eraseCom.startClean();
      this.btnAgian.visible = false;
      this.m_isWinData = [];
      this.m_bankData = r_NiuniuSystem.NiuniuSystem.getRandomCards(true);
      this.setItem(this.item, this.m_bankData, true);
      this.m_playerData = [];
      this.items.forEach(function (t) {
        var o = r_NiuniuSystem.NiuniuSystem.getRandomCards(false);
        e.m_playerData.push(o);
        e.setItem(t, o, false);
      });
    }
  };
  _ctor.prototype.setItem = function (e, t, o) {
    var i = t.cards;
    e.getController("c1").setSelectedIndex(0);
    i.forEach(function (t, o) {
      e.getChild("item" + o).asCom.getChild("value").asLabel.text = r_NiuniuSystem.NiuniuSystem.getCardValue(t);
    });
    e.getChild("result").asCom.getChild("value").asLabel.text = r_NiuniuSystem.NiuniuSystem.CardResult[t.result];
    e.getChild("award").asCom.getChild("value").asLabel.text = "";
    if (!o) {
      var n = this.isWin(t) ? r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_NiuniuCfg.NiuniuAwardPrCfg).num : r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_NiuniuCfg.NiuniuAwardPrCfg1).num;
      e.getChild("award").asCom.getChild("value").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(n, 0);
      t.num = n;
    }
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("斗牛门票", function () {
      e.restart();
    });
  };
  _ctor.prototype.onClickCaidan = function () {
    var e = this;
    this.m_isSucc || r_PlayerData.PlayerData.data.isNiuniuCaidan && (r_PlayerData.PlayerData.data.isNiuniuCaidan = false, r_PlayerData.PlayerData.saveData(), this.eraseCom.startClean(), this.caipiaoniu.setAnimation(0, "animation", false), this.caipiaoniu.timeScale = 1, this.caipiaoniu.node.parent = this.prefab, r_SoundMgr.SoundMgr.playSound("niu"), this.caipiaoniu.setCompleteListener(function () {
      r_NiuniuSystem.NiuniuSystem.init();
      e.eraseCom.startClean();
      e.btnAgian.visible = false;
      e.m_isWinData = [];
      e.m_bankData = r_NiuniuCfg.NiuniuCaidanCfg.bankerData;
      e.setItem(e.item, e.m_bankData, true);
      e.m_playerData = [];
      e.items.forEach(function (t, o) {
        var i = r_NiuniuCfg.NiuniuCaidanCfg.playerData[o];
        e.m_playerData.push(i);
        e.caipiaoniu.node.active = false;
        e.setItem(t, i, true);
        var n = r_NiuniuCfg.NiuniuCaidanCfg.playerAward[o];
        t.getChild("award").asCom.getChild("value").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(n, 0);
        i.num = n;
      });
    }));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.caidanNode.off(cc.Node.EventType.TOUCH_START, this.onClickCaidan, this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_NiuniuUI;