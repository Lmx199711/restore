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
var def_AutoTouchUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Earn, r_UIDef.UIDef.Res.UI.AutoTouchUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AutoTouchUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AutoTouchUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnUp);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = r_RoleSystem.RoleSystem.getAutoExpNum();
    this.labDesc.text = e;
    this.labLevel.text = "自动点击等级：Lv." + r_PlayerData.PlayerData.data.mainHome.autoLevel;
    var t = r_RoleSystem.RoleSystem.getAutoInfoByLevel(r_PlayerData.PlayerData.data.mainHome.autoLevel);
    if (t.isMax) {
      this.groupLab.visible = false;
      this.btnUp.visible = false;
    } else {
      this.groupLab.visible = true;
      this.btnUp.visible = true;
      var o = r_RoleSystem.RoleSystem.getAutoInfoByLevel(r_PlayerData.PlayerData.data.mainHome.autoLevel + 1).expNum - t.expNum;
      this.labNum.text = "+" + o + "点击";
    }
  };
  _ctor.prototype.onClickbtnUp = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("自动点击", function () {
      r_RoleSystem.RoleSystem.upAutoTouch();
      e.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("labDesc")], _ctor.prototype, "labDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnUp")], _ctor.prototype, "btnUp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNext")], _ctor.prototype, "labNext", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labLevel")], _ctor.prototype, "labLevel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("groupLab")], _ctor.prototype, "groupLab", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_AutoTouchUI;