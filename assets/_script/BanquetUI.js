var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_EatBanquetUI = require("EatBanquetUI");
var r_BanquetCfg = require("BanquetCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_BanquetEnterUI = require("BanquetEnterUI");
var r_SoundMgr = require("SoundMgr");
var r_BanquetEgg = require("BanquetEgg");
var exp_BanquetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.BanquetUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BanquetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BanquetUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnStart.onClick(this.onClickStart, this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.controller = this.contentPane.getController("c1");
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnRight.onClick(this.onClickRight, this);
    this.baseCfg = r_BanquetCfg.BanquetBaseCfg;
    this.contentPane.getChild("n1").asButton.onClick(function () {
      r_BanquetEnterUI.BanquetEnterUI.showUI();
    });
    this.contentPane.getChild("egg").onClick(function () {
      t.contentPane.getChild("group2").visible = true;
      var e = t.contentPane.getChild("n16").asTextField;
      e.text = "";
      var o = r_BanquetCfg.BanquetOtherCfg.eggShowText1;
      var i = function (i) {
        setTimeout(function () {
          e.text += o[i];
          i == o.length - 1 && setTimeout(function () {
            t.contentPane.getChild("group2").visible = false;
            r_BanquetEgg.BanquetEgg.showUI();
          }, 1e3);
        }, 50 * i);
      };
      for (var n = 0; n < o.length; n++) {
        i(n);
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    r_SoundMgr.SoundMgr.playMusic("banquet/主界面bgm");
    this.contentPane.getChild("group1").visible = false;
    this.contentPane.getChild("group2").visible = false;
    this.changeType();
  };
  _ctor.prototype.onClickStart = function () {
    var e = this;
    if (!r_PlayerData.PlayerData.isCoinEnough(this.baseCfg[this.type].price)) {
      return r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
    console.log("点击开始");
    r_PlayerData.PlayerData.deleteCoin("吃席", this.baseCfg[this.type].price);
    this.contentPane.getChild("group1").visible = true;
    this.btnStart.getTransition("t0").play(function () {
      r_EatBanquetUI.EatBanquetUI.showUI(e.type);
      e.contentPane.getChild("group1").visible = false;
      e.btnStart.getTransition("t1").play();
    });
  };
  _ctor.prototype.onClickLeft = function () {
    this.controller.selectedIndex > 0 && (this.controller.selectedIndex -= 1);
    this.changeType();
  };
  _ctor.prototype.onClickRight = function () {
    this.controller.selectedIndex < 2 && (this.controller.selectedIndex += 1);
    this.changeType();
  };
  _ctor.prototype.changeType = function () {
    this.type = this.controller.selectedIndex > 1 ? "high" : this.controller.selectedIndex > 0 ? "medium" : "normal";
    var e = this.baseCfg[this.type];
    var t = this.contentPane.getChild("n8");
    this.btnStart.getChild("n4").text = r_UtilsSystem.UtilsSystem.getShowCoin(e.price);
    this.PlayAnim(t, e.anim_yb, true, true);
  };
  _ctor.prototype.PlayAnim = function (e, t, o, i) {
    e.loop = o;
    e.animationName = t;
    e.playing = i;
  };
  _ctor.prototype.onClickBack = function () {
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BanquetUI = exp_BanquetUI;