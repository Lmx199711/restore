var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_EarnUpUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Earn, r_UIDef.UIDef.Res.UI.EarnUpUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EarnUpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EarnUpUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnGet);
    this.btnGet.getChild("title").visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.labNum.text = "当前" + r_PlayerData.PlayerData.data.mainHome.earnNum + "次";
  };
  _ctor.prototype.onClickbtnGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("收益翻倍", function () {
      r_RoleSystem.RoleSystem.addEarnNum();
      e.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EarnUpUI;