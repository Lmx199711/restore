var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_RussiaGameUI = require("RussiaGameUI");
var def_RussiaUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Res.UI.RussiaUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.price = 2e10;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RussiaUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RussiaUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnStart, this.btnVideo);
    this.btnStart.title = r_UtilsSystem.UtilsSystem.numFormats(this.price);
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
    r_SoundMgr.SoundMgr.playSound("russia/帅哥来一发");
  };
  _ctor.prototype.onClickbtnStart = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(this.price)) {
      r_PlayerData.PlayerData.deleteCoin("俄罗斯轮盘门票", this.price, r_ReportSystem.SystemKey.俄罗斯轮盘);
      r_RussiaGameUI.default.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够");
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    r_PlatformSystem.PlatformSystem.showVideo("俄罗斯轮盘门票", function () {
      r_RussiaGameUI.default.showUI();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RussiaUI;