var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetEndUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_BanquetCfg = require("BanquetCfg");
var r_EatBanquetUI = require("EatBanquetUI");
var r_SoundMgr = require("SoundMgr");
var exp_BanquetEndUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.BanquetEndUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.BanquetEndUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BanquetEndUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnSure = this.contentPane.getChild("btnSure").asButton;
    this.btnSure.onClick(this.onClickSure, this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
    this.rankCtrl = this.contentPane.getController("rank");
    this.controller = this.contentPane.getController("c1");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_EatBanquetUI.EatBanquetUI.hide();
  };
  _ctor.prototype.onShown = function () {
    this.priceList = this.data.priceList;
    this.type = this.data.levelType;
    if ("high" == this.type) {
      this.controller.selectedIndex = 1;
    } else {
      this.controller.selectedIndex = 0;
    }
    this.changeRank();
  };
  _ctor.prototype.onClickSure = function () {
    r_PlayerData.PlayerData.addCoin("吃席", this.data.priceList.anim_me.price);
    this.hide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍领取", function () {
      r_PlayerData.PlayerData.addCoin("吃席", 2 * e.data.priceList.anim_me.price);
      e.hide();
    });
  };
  _ctor.prototype.changeRank = function () {
    var e = this;
    "high" != this.type && (this.priceList.anim_3.price = -1);
    var t = Object.keys(this.priceList).sort(function (t, o) {
      return e.priceList[o].price - e.priceList[t].price;
    });
    console.log(t);
    var o = 1;
    for (var i = 0; i < t.length; i++) {
      var n = this.contentPane.getChild("icon_" + (i + 1)).asLoader;
      if ("anim_me" == t[i]) {
        r_ResSystem.ResSystem.loadHeadImg(n, r_PlayerData.PlayerData.data.curHead);
        this.rankCtrl.selectedIndex = i;
      } else {
        r_ResSystem.ResSystem.loadFguiImg(n, "ui/banquet/" + this.type + "-" + o);
        o++;
      }
      this.contentPane.getChild("num_" + (i + 1)).asTextField.text = this.priceList[t[i]].count;
      this.contentPane.getChild("score_" + (i + 1)).asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.priceList[t[i]].price);
    }
    var a;
    var s = r_BanquetCfg.BanquetBaseCfg[this.type];
    this.contentPane.getChild("enterMoney").asTextField.text = "我的入场费：" + r_UtilsSystem.UtilsSystem.getShowCoin(s.price);
    if (s.price > this.priceList.anim_me.price) {
      a = "亏";
      r_SoundMgr.SoundMgr.playSound("banquet/fail");
    } else {
      a = "赚";
      r_SoundMgr.SoundMgr.playSound("banquet/win");
    }
    this.contentPane.getChild("icon").asLoader.url = "ui://MainHome/" + a;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BanquetEndUI = exp_BanquetEndUI;