var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_FlirtingGirlUI = require("FlirtingGirlUI");
var r_EntryUI = require("EntryUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var def_FlirtingGirlCaidanUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FlirtingGirl, r_UIDef.UIDef.Res.UI.FlirtingGirlCaidanUI) || this;
    t.m_chufa = 3e7;
    t.m_jiangli = 1e7;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FlirtingGirlCaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FlirtingGirlCaidanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose").asButton;
    this.btnClose.onClick(this.onClickClose, this);
    this.btnChipin = this.contentPane.getChild("btnChipin").asButton;
    this.btnChipin.onClick(this.onClickChipin, this);
    this.btnMianChu = this.contentPane.getChild("btnMianChu").asButton;
    this.btnMianChu.onClick(this.onClickMianChu, this);
    this.btnPut = this.contentPane.getChild("btnPut").asButton;
    this.btnPut.onClick(this.onClickPut, this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data;
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_FlirtingGirlUI.default.hide();
    r_EntryUI.default.hide();
  };
  _ctor.prototype.onClickChipin = function () {
    if (!r_PlayerData.PlayerData.isCoinEnough(this.m_chufa)) {
      r_PlayerData.PlayerData.deleteCoin("调戏小姐姐处罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.打保安);
      return void this.onClickClose();
    }
    r_PlayerData.PlayerData.deleteCoin("调戏小姐姐处罚", this.m_chufa, r_ReportSystem.SystemKey.打保安);
    this.onClickClose();
  };
  _ctor.prototype.onClickMianChu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("调戏小姐姐坐牢免除惩罚", function () {
      e.onClickClose();
    });
  };
  _ctor.prototype.onClickPut = function () {
    this.onClickClose();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("调戏小姐姐结婚", function () {
      r_PlayerData.PlayerData.addCoin("调戏小姐姐结婚", 10 * e.m_jiangli, r_ReportSystem.SystemKey.打保安);
      e.onClickClose();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_FlirtingGirlCaidanUI;