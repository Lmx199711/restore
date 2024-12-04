var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RoleGirlCfg = require("RoleGirlCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_RoleGirlTranUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.RoleGirl, r_UIDef.UIDef.Res.UI.RoleGirlTranUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RoleGirlTranUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RoleGirlTranUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnUp);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    var e = r_RoleGirlCfg.RoleGirlTranCfg[r_PlayerData.PlayerData.data.roleGirlTranLevel];
    this.labCurrLevel.text = e.level + "";
    this.labCurrEarn.text = 100 * e.earn + "%";
    if (e.isMax) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
      var t = r_RoleGirlCfg.RoleGirlTranCfg[r_PlayerData.PlayerData.data.roleGirlTranLevel + 1];
      this.labNextLevel.text = t.level + "";
      this.labNextEarn.text = 100 * t.earn + "%";
    }
  };
  _ctor.prototype.onClickbtnUp = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("培训秘书", function () {
      r_PlayerData.PlayerData.data.roleGirlTranLevel++;
      r_PlayerData.PlayerData.data.roleGirlTranLevel > Object.values(r_RoleGirlCfg.RoleGirlTranCfg).length && (r_PlayerData.PlayerData.data.roleGirlTranLevel = Object.values(r_RoleGirlCfg.RoleGirlTranCfg).length);
      r_PlayerData.PlayerData.saveData();
      e.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("labCurrLevel")], _ctor.prototype, "labCurrLevel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNextLevel")], _ctor.prototype, "labNextLevel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labCurrEarn")], _ctor.prototype, "labCurrEarn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNextEarn")], _ctor.prototype, "labNextEarn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnUp")], _ctor.prototype, "btnUp", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RoleGirlTranUI;