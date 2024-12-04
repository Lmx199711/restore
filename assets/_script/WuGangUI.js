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
var r_WuGangSystem = require("WuGangSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_WuGangCom = require("WuGangCom");
var r_SoundMgr = require("SoundMgr");
var def_WuGangUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.WuGangUI) || this;
    t.winMoonCake = "";
    t.loseMoonCakeArr = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WuGangUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WuGangUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.hide, this);
    this.center = this.contentPane.getChild("center");
    this.bgCenter = this.contentPane.getChild("bgCenter");
    this.item_0 = this.contentPane.getChild("item_0");
    this.btnAgain = this.contentPane.getChild("btnAgain");
    this.btnAgain.onClick(this.onClickBtnAgain, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    r_CaidanSystem.CaidanSystem.bindBtn("wugang", this.btnTip, "WuGangCaiDanVideo");
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyWuGangCoin, 0);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/wuGangBg", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.bgCenter.node.addChild(i);
      t.treeSpine = i.getChildByName("mask").children[0].getComponent(sp.Skeleton);
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/wugang", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.center.node.addChild(i);
      t.eraseCom = i.getComponent(r_EraseCom.default);
      t.eraseCom.startClean();
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccessCallBack.bind(t);
      t.wuGangCom = i.getComponent(r_WuGangCom.default);
      -1 == r_PlayerData.PlayerData.data.isWuGangCaiDan && t.wuGangCom.startTouch();
    });
    this.items = [];
    for (var o = 1; o <= 15; o++) {
      var i = "item_" + o;
      var n = this.contentPane.getChild(i);
      this.items.push(n);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initWinInfo();
    _ctor.instance = this;
    this.btnAgain.visible = false;
    if (this.eraseCom) {
      this.eraseCom.startClean();
      this.eraseCom.cleanAllSuccessCallBack = this.cleanAllSuccess.bind(this);
      this.eraseCom.cleanSuccessCallBack = this.cleanSuccessCallBack.bind(this);
    }
    this.wuGangCom && -1 == r_PlayerData.PlayerData.data.isWuGangCaiDan && this.wuGangCom.startTouch();
    this.resetAward();
  };
  _ctor.prototype.initWinInfo = function () {
    var e = Math.floor(3 * Math.random());
    this.winMoonCake = r_LotteryTicketCfg.LotteryTicketCfg.MoonCake[e];
    this.loseMoonCakeArr = [].concat(r_LotteryTicketCfg.LotteryTicketCfg.MoonCake);
    this.loseMoonCakeArr.splice(e, 1);
  };
  _ctor.prototype.resetAward = function () {
    var e = this;
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [-1 == r_PlayerData.PlayerData.data.isWuGangCaiDan ? 0 : 1], r_PlayerData.PlayerData.data.WuGangCaiDanVideo);
    var t = "ui/lottery/moonCake/" + this.winMoonCake;
    r_ResSystem.ResSystem.loadBundleRes("resources1", t, cc.SpriteFrame, function (t, o) {
      e.item_0.texture = o;
    });
    var o = function (e) {
      var t = r_WuGangSystem.WuGangSystem.getItemAwardInfo();
      var o = i.items[e];
      o.getChild("tip").visible = false;
      o.getChild("coinNum").text = r_UtilsSystem.UtilsSystem.getShowCoin(t.award);
      var n = r_WuGangSystem.WuGangSystem.getIsWin(t.winPr);
      if (n) {
        var a = "ui/lottery/moonCake/" + i.winMoonCake;
        r_ResSystem.ResSystem.loadBundleRes("resources1", a, cc.SpriteFrame, function (e, t) {
          o.getChild("icon").texture = t;
        });
      } else {
        var s = Math.floor(Math.random() * i.loseMoonCakeArr.length);
        var r = "ui/lottery/moonCake/" + i.loseMoonCakeArr[s];
        r_ResSystem.ResSystem.loadBundleRes("resources1", r, cc.SpriteFrame, function (e, t) {
          o.getChild("icon").texture = t;
        });
      }
      o.iswin = n;
      o.coin = t.award;
    };
    var i = this;
    for (var n = 0; n < this.items.length; n++) {
      o(n);
    }
  };
  _ctor.playTreeDx = function () {
    if (_ctor.instance.treeSpine) {
      r_SoundMgr.SoundMgr.playSound("wugang/树倒_01");
      _ctor.instance.treeSpine.setAnimation(0, "daoxia", false);
    }
  };
  _ctor.refreshAward = function () {
    console.log(".......更新中奖", _ctor.instance.eraseCom.cleanPro);
    if (_ctor.instance.eraseCom.cleanPro <= 0) {
      var e = function (e) {
        var o = r_WuGangSystem.WuGangSystem.getItemAwardInfo();
        var i = _ctor.instance.items[e];
        var n = "ui/lottery/moonCake/" + _ctor.instance.winMoonCake;
        r_ResSystem.ResSystem.loadBundleRes("resources1", n, cc.SpriteFrame, function (e, t) {
          i.getChild("icon").texture = t;
        });
        i.iswin = true;
        i.coin = o.award;
      };
      for (var o = 0; o < _ctor.instance.items.length; o++) {
        e(o);
      }
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
  };
  _ctor.prototype.onClickBtnAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyWuGangCoin)) {
      r_PlayerData.PlayerData.deleteCoin("吴刚伐桂再来一张", r_LotteryTicketCfg.BuyWuGangCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restartGame();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.restartGame = function () {
    if (this.wuGangCom) {
      this.wuGangCom.resetGame();
      this.treeSpine.setAnimation(0, "daiji", false);
      -1 == r_PlayerData.PlayerData.data.isWuGangCaiDan && this.wuGangCom.startTouch();
    }
    this.eraseCom.startClean();
    this.resetAward();
  };
  _ctor.prototype.cleanSuccessCallBack = function (e) {
    if (this.items && this.items.length > 0) {
      var t = this.items[e];
      if (t.iswin) {
        t.getChild("tip").visible = true;
        r_PlayerData.PlayerData.addCoin("吴刚伐桂中奖", t.coin, r_ReportSystem.SystemKey.彩票);
        r_AnimSystem.AnimSystem.playCoinAnim(t.node);
      }
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_WuGangUI;