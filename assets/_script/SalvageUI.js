var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalvageUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SalvageCfg = require("SalvageCfg");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_SalvageTipUI = require("SalvageTipUI");
var exp_SalvageUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Salvage, r_UIDef.UIDef.Res.UI.SalvageUI) || this;
    t.uiType = "fullScreen";
    t.daLaoPrice = 5e3;
    t.props = [];
    t.isClick = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SalvageUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SalvageUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onVideo, this);
    this.contentPane.getChild("btnNone").asButton.onClick(this.onNone, this);
    this.contentPane.getChild("btnNone").asButton.getChild("labPrice").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_SalvageCfg.SalvagePrice);
    this.isClick = false;
    this.loadCom();
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    if (!r_SalvageTipUI.SalvageTipUI.isShow && this.props.length > 0) {
      r_SalvageTipUI.SalvageTipUI.showUI(this.props.shift());
      r_SalvageTipUI.SalvageTipUI.isShow = true;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.loadCom = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "salvage/salvageBg", cc.Prefab, function (t, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
      var i = cc.instantiate(o);
      i.active = true;
      e.contentPane.getChild("center").node.addChild(i);
      e.diaoche = i.getChildByName("diaoche").getComponent(sp.Skeleton);
      e.diaoche.setAnimation(0, "daiji", true);
      e.isClick = true;
    });
  };
  _ctor.prototype.onVideo = function () {
    var e = this;
    this.isClick && r_PlatformSystem.PlatformSystem.showVideo("视频打捞", function () {
      r_SoundMgr.SoundMgr.playSound("salvage/dalao");
      e.diaoche.setAnimation(0, "dalao2.1", false);
      e.diaoche.setCompleteListener(e.startSalvage1.bind(e));
      e.isClick = false;
    });
  };
  _ctor.prototype.startSalvage1 = function () {
    this.diaoche.setAnimation(0, "daiji", true);
    this.diaoche.setCompleteListener(null);
    var e = Object.values(r_SalvageCfg.SalvagePropConfig);
    var t = e.filter(function (e) {
      return 0 != e.isSell;
    });
    var o = e.filter(function (e) {
      return 0 == e.isSell;
    });
    this.props = [];
    this.props = this.props.concat([t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)], t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)], o[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.length - 1)]]);
    cc.log("props: ", this.props);
    this.isClick = true;
  };
  _ctor.prototype.onNone = function () {
    if (this.isClick && r_PlayerData.PlayerData.useCoin("普通打捞", r_SalvageCfg.SalvagePrice)) {
      r_SoundMgr.SoundMgr.playSound("salvage/dalao");
      this.isClick = false;
      this.diaoche.setAnimation(0, "dalao1.1", false);
      this.diaoche.setCompleteListener(this.startSalvage0.bind(this));
    }
  };
  _ctor.prototype.startSalvage0 = function () {
    this.diaoche.setAnimation(0, "daiji", true);
    this.diaoche.setCompleteListener(null);
    var e = Object.values(r_SalvageCfg.SalvagePropConfig);
    var t = e.filter(function (e) {
      return 0 != e.isSell;
    });
    var o = e.filter(function (e) {
      return 0 == e.isSell;
    });
    this.props = [];
    if ("" == cc.sys.localStorage.getItem("daLaoOnce") || null == cc.sys.localStorage.getItem("daLaoOnce")) {
      this.props.push(r_SalvageCfg.SalvagePropConfig[119]);
      cc.sys.localStorage.setItem("daLaoOnce", "1");
      return void (this.isClick = true);
    }
    if (r_UtilsSystem.UtilsSystem.getRandomNum(0, 5)) {
      this.props.push(t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)]);
    } else {
      this.props.push(o[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.length - 1)]);
    }
    this.isClick = true;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SalvageUI = exp_SalvageUI;