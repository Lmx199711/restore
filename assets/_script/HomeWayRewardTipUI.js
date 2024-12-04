var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_PlatformSystem = require("PlatformSystem");
var r_NewHomeWayChatUI = require("NewHomeWayChatUI");
var r_HomeWayUI = require("HomeWayUI");
var def_HomeWayRewardTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.NewGuide, r_UIDef.UIDef.Res.UI.HomeWayRewardTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeWayRewardTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeWayRewardTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnRefuse = this.contentPane.getChild("btnRefuse").asButton;
    this.btnRefuse.onClick(this.onClickRefuse, this);
    this.btnReward = this.contentPane.getChild("btnReward").asButton;
    this.btnReward.onClick(this.onClickReward, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickRefuse = function () {
    this.hide();
    r_HomeWayUI.HomeWayUI.hide();
  };
  _ctor.prototype.onClickReward = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("回乡之路", function () {
      e.hide();
      r_NewHomeWayChatUI.default.showUI();
    });
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_HomeWayRewardTipUI;