var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_HomeCfg = require("HomeCfg");
var r_jsbi = require("jsbi");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_FlirtingGirlUI = require("FlirtingGirlUI");
var r_PlatformSystem = require("PlatformSystem");
var r_EntryChooseUI = require("EntryChooseUI");
var r_FguiResSystem = require("FguiResSystem");
var def_EntryUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Res.UI.EntryUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EntryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EntryUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.hide, this);
    this.btnEnter = this.contentPane.getChild("btnEnter").asButton;
    this.btnEnter.onClick(this.onClickEnter, this);
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
    this.labBubble = this.contentPane.getChild("labBubble").asLabel;
    this.imgRole = this.contentPane.getChild("imgRole").asLoader;
    this.ganta = this.contentPane.getChild("ganta");
    this.ganta.onClick(this.onClickGanta, this);
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.btnVideo.onClick(this.onClickVideo, this);
    this.tiaoxi = this.contentPane.getChild("tiaoxi");
    this.tiaoxi.onClick(this.onClickTiaoXi, this);
    this.labPrice = this.contentPane.getChild("labPrice").asTextField;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.btnVideo.visible = false;
    this.btnEnter.visible = true;
    this.onClickRole();
    var o = r_HomeCfg.HomeDoorRuleCfg[this.data];
    this.labDesc.text = o.desc;
    this.labPrice.text = r_UtilsSystem.UtilsSystem.numFormats(o.price);
    if (r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, o.price + "")) {
      if (0 == o.id) {
        this.btnVideo.visible = true;
        this.btnEnter.visible = false;
      }
      this.ShowBad();
    } else {
      this.ShowGood();
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.loadVenture = function () {
    var e = this;
    var t = [];
    for (var o = 0; o < 20; o++) {
      t.push("bit/bitMap" + o);
    }
    t.push("bit/bitMap");
    t.push("salvage/salvageBg");
    for (var i = 0; i < t.length; i++) {
      r_ResSystem.ResSystem.loadBundleRes("game1", t[i], cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
      });
    }
  };
  _ctor.prototype.ShowGood = function () {
    var e = r_HomeCfg.HomeDoorRuleCfg[this.data];
    this.labBubble.text = e.goodTxt;
    this.imgRole.url = "ui://Entry/role" + e.id + "_0";
    this.labPrice.color = cc.color(155, 255, 81);
    this.btnEnter.enabled = true;
  };
  _ctor.prototype.ShowBad = function () {
    var e = r_HomeCfg.HomeDoorRuleCfg[this.data];
    this.labBubble.text = e.badTxt;
    this.imgRole.url = "ui://Entry/role" + e.id + "_1";
    this.labPrice.color = cc.color(255, 0, 0);
    this.btnEnter.enabled = false;
  };
  _ctor.prototype.onClickEnter = function () {
    r_HomeCfg.HomeDoorRuleCfg[this.data].T.showUI();
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("视频进入洗脚城", function () {
      r_HomeCfg.HomeDoorRuleCfg[e.data].T.showUI();
      e.hide();
    });
  };
  _ctor.prototype.onClickRole = function () {
    this.ganta.visible = false;
    this.tiaoxi.visible = false;
    if (1 == this.data) {
      this.ganta.visible = true;
      this.ganta.getChild("ganta").loop = true;
      this.ganta.getChild("ganta").animationName = "animation";
      this.ganta.getChild("ganta").playing = true;
    }
    "1" == r_PlatformSystem.PlatformSystem.tiaoxi && 0 == this.data && (this.tiaoxi.visible = true);
  };
  _ctor.prototype.onClickGanta = function () {
    1 == this.data && r_EntryChooseUI.default.showUI();
  };
  _ctor.prototype.onClickTiaoXi = function () {
    0 == this.data && r_FlirtingGirlUI.default.showUI();
  };
  _ctor.instace = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_EntryUI;